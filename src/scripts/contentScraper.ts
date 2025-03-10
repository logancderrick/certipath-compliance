import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import matter from 'gray-matter';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source: string;
  originalUrl: string;
  published: boolean;
}

interface Source {
  name: string;
  baseUrl: string;
  articleSelector: string;
  titleSelector: string;
  contentSelector: string;
  dateSelector: string;
  linkSelector: string;
  category: string;
  needsClick: boolean;
}

const sources: Source[] = [
  {
    name: 'In Compliance Magazine',
    baseUrl: 'https://incompliancemag.com/category/news/',
    articleSelector: 'article.post',
    titleSelector: 'h3.entry-title.td-module-title',
    contentSelector: '.td-post-content',
    dateSelector: 'time.entry-date',
    linkSelector: 'h3.entry-title.td-module-title a',
    category: 'Industry News',
    needsClick: false
  },
  {
    name: 'UL Solutions',
    baseUrl: 'https://www.ul.com/news',
    articleSelector: '.c-teaser',
    titleSelector: '.c-teaser__title a',
    contentSelector: '.c-teaser__description',
    dateSelector: '.c-teaser__date',
    linkSelector: '.c-teaser__title a',
    category: 'Regulatory Updates',
    needsClick: true
  }
];

async function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function scrapeSource(source: Source) {
  console.log(`Starting to scrape ${source.name}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Increase timeouts
    await page.setDefaultNavigationTimeout(120000); // 2 minutes
    await page.setDefaultTimeout(15000); // 15 seconds
    
    console.log(`Navigating to ${source.baseUrl}...`);
    await page.goto(source.baseUrl, { waitUntil: 'networkidle0' });
    
    // Ensure directories exist
    const screenshotsDir = path.join(process.cwd(), 'public', 'images', 'screenshots');
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const draftsDir = path.join(process.cwd(), 'data', 'drafts');
    await ensureDirectoryExists(screenshotsDir);
    await ensureDirectoryExists(dataDir);
    await ensureDirectoryExists(draftsDir);
    
    // Take screenshot before scraping
    const screenshotPath = path.join(screenshotsDir, `${source.name.replace(/\s+/g, '-')}-before-scrape.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Save HTML content for debugging
    const htmlPath = path.join(dataDir, `${source.name.replace(/\s+/g, '-')}-page.html`);
    const html = await page.content();
    fs.writeFileSync(htmlPath, html);
    
    console.log('Looking for articles...');
    let articles: Article[] = [];
    
    if (source.needsClick) {
      // For sources that need clicking to access content
      const links = await page.$$eval(source.linkSelector, (elements) => 
        elements.map((el) => (el as HTMLAnchorElement).href).filter(Boolean)
      );
      
      console.log(`Found ${links.length} article links`);
      
      // Process first 5 articles to avoid too many requests
      for (let i = 0; i < Math.min(links.length, 5); i++) {
        const link = links[i];
        console.log(`Processing article ${i + 1}/${Math.min(links.length, 5)}: ${link}`);
        
        const articlePage = await browser.newPage();
        try {
          await articlePage.goto(link, { waitUntil: 'networkidle0' });
          
          // Take screenshot of article page
          const articleScreenshotPath = path.join(screenshotsDir, `${source.name.replace(/\s+/g, '-')}-article-${i+1}.png`);
          await articlePage.screenshot({ path: articleScreenshotPath, fullPage: true });
          
          const articleData = await articlePage.evaluate(
            ({ titleSelector, contentSelector, dateSelector }) => {
              const title = document.querySelector(titleSelector)?.textContent?.trim() || '';
              const content = document.querySelector(contentSelector)?.textContent?.trim() || '';
              const date = document.querySelector(dateSelector)?.textContent?.trim() || '';
              return { title, content, date };
            },
            source
          );
          
          if (articleData.title && articleData.content) {
            const article: Article = {
              id: uuidv4(),
              title: articleData.title,
              slug: articleData.title.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, ''),
              excerpt: articleData.content.substring(0, 200) + '...',
              content: articleData.content,
              date: articleData.date || new Date().toISOString().split('T')[0],
              category: source.category,
              source: source.name,
              originalUrl: link,
              published: false
            };
            
            articles.push(article);
            console.log(`Added article: ${article.title}`);
            
            // Create draft markdown file
            const draftContent = matter.stringify(article.content, {
              title: article.title,
              date: article.date,
              category: article.category,
              source: article.source,
              originalUrl: article.originalUrl,
              draft: true
            });
            
            const draftPath = path.join(draftsDir, `${article.slug}.md`);
            fs.writeFileSync(draftPath, draftContent);
            console.log(`Created draft: ${draftPath}`);
          }
        } catch (error) {
          console.error(`Error processing article ${link}:`, error);
        } finally {
          await articlePage.close();
        }
      }
    } else {
      // For sources that can be scraped directly
      const articleElements = await page.$$(source.articleSelector);
      console.log(`Found ${articleElements.length} articles`);
      
      for (const articleElement of articleElements) {
        try {
          const data = await articleElement.evaluate(
            (el, { titleSelector, contentSelector, dateSelector, linkSelector }) => {
              const title = el.querySelector(titleSelector)?.textContent?.trim() || '';
              const content = el.querySelector(contentSelector)?.textContent?.trim() || '';
              const date = el.querySelector(dateSelector)?.textContent?.trim() || '';
              const link = (el.querySelector(linkSelector) as HTMLAnchorElement)?.href;
              return { title, content, date, link };
            },
            source
          );
          
          if (data.title && data.content) {
            const article: Article = {
              id: uuidv4(),
              title: data.title,
              slug: data.title.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, ''),
              excerpt: data.content.substring(0, 200) + '...',
              content: data.content,
              date: data.date || new Date().toISOString().split('T')[0],
              category: source.category,
              source: source.name,
              originalUrl: data.link || '',
              published: false
            };
            
            articles.push(article);
            console.log(`Added article: ${article.title}`);
            
            // Create draft markdown file
            const draftContent = matter.stringify(article.content, {
              title: article.title,
              date: article.date,
              category: article.category,
              source: article.source,
              originalUrl: article.originalUrl,
              draft: true
            });
            
            const draftPath = path.join(draftsDir, `${article.slug}.md`);
            fs.writeFileSync(draftPath, draftContent);
            console.log(`Created draft: ${draftPath}`);
          }
        } catch (error) {
          console.error('Error processing article:', error);
        }
      }
    }
    
    // Save articles to JSON
    if (articles.length > 0) {
      const articlesPath = path.join(dataDir, `${source.name.replace(/\s+/g, '-')}-articles.json`);
      fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
      console.log(`Saved ${articles.length} articles to ${articlesPath}`);
    }
    
    return articles;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('Starting content scraping...');
  
  for (const source of sources) {
    try {
      await scrapeSource(source);
    } catch (error) {
      console.error(`Failed to scrape ${source.name}:`, error);
    }
  }
  
  console.log('Content scraping completed.');
}

if (require.main === module) {
  main().catch(console.error);
}

export { main as runScraper }; 