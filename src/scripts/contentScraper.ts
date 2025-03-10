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
  listingSelectors: {
    articles: string;
    link: string;
  };
  articleSelectors: {
    title: string;
    content: string;
    date: string;
  };
  category: string;
}

const sources: Source[] = [
  {
    name: 'In Compliance Magazine',
    baseUrl: 'https://incompliancemag.com/topics/news/global-compliance-news/',
    listingSelectors: {
      articles: '.td_module_flex',
      link: '.entry-title a'
    },
    articleSelectors: {
      title: 'h1.tdb-title-text, h1.entry-title, .tdb-title-text',
      content: '.tdb-block-inner p, .td-post-content p, article p',
      date: 'time.entry-date, .tdb-author-date time'
    },
    category: 'Global Compliance News'
  },
  {
    name: 'UL Solutions',
    baseUrl: 'https://www.ul.com/news',
    listingSelectors: {
      articles: '.card.card--news',
      link: '.card--news a'
    },
    articleSelectors: {
      title: '.article__title, .article-title, h1',
      content: '.article__content, .article-content, .article-body, main article',
      date: '.article__date, .article-date, time, .date'
    },
    category: 'Regulatory Updates'
  }
];

async function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function downloadArticles(source: Source) {
  console.log(`\nDownloading articles from ${source.name}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Create directory for HTML files
    const rawHtmlDir = path.join(process.cwd(), 'src', 'data', 'raw-html', source.name.toLowerCase().replace(/\s+/g, '-'));
    await ensureDirectoryExists(rawHtmlDir);
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setDefaultNavigationTimeout(120000);
    
    // Navigate to the listing page
    console.log(`Navigating to ${source.baseUrl}`);
    await page.goto(source.baseUrl, { waitUntil: 'networkidle0' });
    
    // Get all article links
    const links = await page.$$eval(source.listingSelectors.link, (elements) => 
      elements.map((el) => ({
        url: (el as HTMLAnchorElement).href,
        text: el.textContent?.trim() || ''
      }))
    );
    
    console.log(`Found ${links.length} articles`);
    
    // Download first 5 articles
    for (let i = 0; i < Math.min(links.length, 5); i++) {
      const { url, text } = links[i];
      console.log(`\nDownloading article ${i + 1}/${Math.min(links.length, 5)}: ${text}`);
      
      const articlePage = await browser.newPage();
      try {
        await articlePage.goto(url, { waitUntil: 'networkidle0' });
        
        // Save raw HTML
        const html = await articlePage.content();
        const htmlFileName = `article-${i + 1}.html`;
        const htmlPath = path.join(rawHtmlDir, htmlFileName);
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log(`Saved HTML to ${htmlPath}`);
        
      } catch (error) {
        console.error(`Error downloading article ${url}:`, error);
      } finally {
        await articlePage.close();
      }
    }
  } finally {
    await browser.close();
  }
}

async function processArticles(source: Source) {
  console.log(`\nProcessing HTML files for ${source.name}...`);
  
  const rawHtmlDir = path.join(process.cwd(), 'src', 'data', 'raw-html', source.name.toLowerCase().replace(/\s+/g, '-'));
  const draftsDir = path.join(process.cwd(), 'src', 'data', 'drafts');
  
  await ensureDirectoryExists(draftsDir);
  
  if (!fs.existsSync(rawHtmlDir)) {
    console.error(`No HTML files found for ${source.name}`);
    return;
  }
  
  const htmlFiles = fs.readdirSync(rawHtmlDir)
    .filter(file => file.endsWith('.html') && !file.startsWith('debug-'));
  
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  for (const htmlFile of htmlFiles) {
    console.log(`\nProcessing ${htmlFile}...`);
    
    const htmlPath = path.join(rawHtmlDir, htmlFile);
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract title (try multiple methods)
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const title = (h1Match ? h1Match[1] : titleMatch ? titleMatch[1].split(' - ')[0] : '').trim();
    
    // Extract content
    let content = '';
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    const contentMatch = articleMatch || mainMatch;
    
    if (contentMatch) {
      // Extract paragraphs
      const paragraphs = contentMatch[1].match(/<p[^>]*>([\s\S]*?)<\/p>/g) || [];
      content = paragraphs
        .map(p => p.replace(/<[^>]+>/g, '').trim()) // Remove HTML tags
        .filter(p => p.length > 0) // Remove empty paragraphs
        .join('\n\n');
    }
    
    // Extract date
    const dateMatch = html.match(/datetime="([^"]+)"|<time[^>]*>([^<]+)<\/time>|<div class="date">([^<]+)<\/div>/);
    const date = dateMatch ? (dateMatch[1] || dateMatch[2] || dateMatch[3]).trim() : new Date().toISOString().split('T')[0];
    
    // Extract canonical URL
    const urlMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    const originalUrl = urlMatch ? urlMatch[1] : '';
    
    if (title && content) {
      const slug = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      const frontmatter = {
        title,
        date,
        category: source.category,
        source: source.name,
        originalUrl,
        draft: true
      };
      
      const draftContent = matter.stringify(content, frontmatter);
      const draftPath = path.join(draftsDir, `${slug}.md`);
      
      console.log('\nCreating draft:');
      console.log('Title:', title);
      console.log('Date:', date);
      console.log('Path:', draftPath);
      
      fs.writeFileSync(draftPath, draftContent, 'utf8');
      console.log('Draft created successfully');
    } else {
      console.log('Skipping - missing title or content');
      console.log('Title found:', title ? 'Yes' : 'No');
      console.log('Content length:', content.length);
    }
  }
}

async function main() {
  console.log('Starting content scraping...');
  
  for (const source of sources) {
    try {
      // Phase 1: Download HTML files
      await downloadArticles(source);
      // Phase 2: Process HTML files and create drafts
      await processArticles(source);
    } catch (error) {
      console.error(`Failed to process ${source.name}:`, error);
    }
  }
  
  console.log('Content scraping completed.');
}

if (require.main === module) {
  main().catch(console.error);
}

export { main as runScraper }; 