import puppeteer from 'puppeteer';
import { createArticle, cleanArticleContent, formatExcerpt } from '../lib/firebase/articles';
import { Timestamp } from 'firebase/firestore';
import slugify from 'slugify';

interface RawArticle {
  title: string;
  content: string;
  date: string;
  category: string;
  source: string;
  originalUrl: string;
  htmlContent: string;
}

interface FirestoreArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  source: string;
  originalUrl: string;
  published: boolean;
  htmlContent: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  timestamp: number;
}

async function downloadArticles(source: string, baseUrl: string, articleSelector: string): Promise<RawArticle[]> {
  console.log(`\n🔍 Starting to scrape articles from ${source} (${baseUrl})`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const articles: RawArticle[] = [];

  try {
    // Navigate to the source's base URL
    console.log('Navigating to source page...');
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
    
    // Get article links based on source
    let articleLinks: string[] = [];
    if (source === 'In Compliance Magazine') {
      // Wait for the specific article headlines to load
      await page.waitForSelector('h3.entry-title.td-module-title');
      
      // Get all article headlines with the specific class names
      const articleContainers = await page.$$('h3.entry-title.td-module-title');
      console.log(`Found ${articleContainers.length} article headlines`);
      
      // Extract links from article headlines
      for (const container of articleContainers.slice(0, 5)) {
        try {
          const link = await container.$eval('a', (el) => el.href);
          const title = await container.$eval('a', (el) => el.textContent);
          if (link) {
            articleLinks.push(link);
            console.log('Found article:', {
              title: title?.trim(),
              link: link
            });
          }
        } catch (error) {
          console.log('Failed to extract link from container:', error);
        }
      }
    } else {
      // Default link extraction for other sources
      articleLinks = await page.$$eval(articleSelector, (links: Element[]) => 
        links.slice(0, 5).map(link => (link as HTMLAnchorElement).href)
      );
    }
    console.log(`Found ${articleLinks.length} article links`);

    // Process each article
    for (const url of articleLinks) {
      console.log(`\n📄 Processing article: ${url}`);
      
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      // Extract article data based on source
      const article = await page.evaluate((source) => {
        let title = '';
        let content = '';
        let date = '';
        let htmlContent = '';

        if (source === 'UL Solutions') {
          // Find title
          const titleElement = document.querySelector('h1');
          if (titleElement) {
            title = titleElement.textContent?.trim() || '';
          }

          // Find date
          const dateElement = document.querySelector('[datetime]');
          if (dateElement) {
            date = dateElement.getAttribute('datetime')?.split('T')[0] || '';
          }

          // Find content
          const contentElement = document.querySelector('article') || document.querySelector('main');
          if (contentElement) {
            content = contentElement.textContent?.trim() || '';
            htmlContent = contentElement.innerHTML;
          }
        } else if (source === 'In Compliance Magazine') {
          // Find title - article pages use h1.tdb-title-text
          const titleElement = document.querySelector('h1.tdb-title-text');
          if (titleElement) {
            title = titleElement.textContent?.trim() || '';
          } else {
            console.log('Title element not found with selector: h1.tdb-title-text');
          }

          // Find date - article pages use .td-post-date time
          const dateElement = document.querySelector('.td-post-date time');
          if (dateElement) {
            const dateText = dateElement.textContent?.trim() || '';
            const dateAttr = dateElement.getAttribute('datetime');
            if (dateAttr) {
              date = dateAttr.split('T')[0];
            } else {
              const parsedDate = new Date(dateText);
              if (!isNaN(parsedDate.getTime())) {
                date = parsedDate.toISOString().split('T')[0];
              } else {
                console.log('Failed to parse date:', dateText);
              }
            }
          } else {
            console.log('Date element not found with selector: .td-post-date time');
          }

          // Find content - article pages use .td-post-content
          const contentElement = document.querySelector('.td-post-content');
          if (contentElement) {
            // Remove unwanted elements first
            const elementsToRemove = contentElement.querySelectorAll(
              '.sharedaddy, .jp-relatedposts, .social-share, .related-posts, .post-tags, .post-categories, .td-post-sharing, .td-post-source-tags, .addtoany_share_save_container'
            );
            elementsToRemove.forEach(el => el.remove());

            // Create a clone of the content element to work with
            const contentClone = contentElement.cloneNode(true) as HTMLElement;

            // Remove any script tags
            const scripts = contentClone.getElementsByTagName('script');
            while (scripts[0]) scripts[0].parentNode?.removeChild(scripts[0]);

            // Remove any style tags
            const styles = contentClone.getElementsByTagName('style');
            while (styles[0]) styles[0].parentNode?.removeChild(styles[0]);

            // Remove any iframes
            const iframes = contentClone.getElementsByTagName('iframe');
            while (iframes[0]) iframes[0].parentNode?.removeChild(iframes[0]);

            // Clean up the content
            content = contentClone.textContent?.trim() || '';
            
            // Format the HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentClone.innerHTML;

            // Remove empty paragraphs and divs
            const emptyElements = tempDiv.querySelectorAll('p:empty, div:empty');
            emptyElements.forEach(el => el.remove());

            // Clean up whitespace and normalize spacing
            htmlContent = tempDiv.innerHTML
              .replace(/\s+/g, ' ')
              .replace(/>\s+</g, '><')
              .trim();
            
            if (!content) {
              console.log('Content element found but empty with selector: .td-post-content');
            }
          } else {
            console.log('Content element not found with selector: .td-post-content');
          }

          // Debug output
          console.log('Debug - Found elements:', {
            titleFound: !!titleElement,
            dateFound: !!dateElement,
            contentFound: !!contentElement,
            contentLength: content.length,
            htmlLength: htmlContent.length
          });
        }

        return { title, content, date, htmlContent };
      }, source);

      if (article.title && article.content) {
        console.log('✅ Found article:', {
          title: article.title,
          date: article.date || 'No date found',
          contentLength: article.content.length
        });
        articles.push({
          ...article,
          category: 'Regulations', // Default category
          source,
          originalUrl: url,
          htmlContent: article.htmlContent
        });
      } else {
        console.log('❌ Skipping article - missing title or content');
        console.log('Debug info:', {
          titleFound: !!article.title,
          contentFound: !!article.content,
          title: article.title,
          contentLength: article.content?.length || 0
        });
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${source}:`, error);
  } finally {
    await browser.close();
  }

  console.log(`\n✅ Finished scraping ${source}. Found ${articles.length} articles.`);
  return articles;
}

async function saveArticlesToFirebase(articles: RawArticle[]) {
  console.log(`\n💾 Starting to save ${articles.length} articles to Firebase...`);
  let savedCount = 0;
  let errorCount = 0;

  for (const article of articles) {
    try {
      // Basic validation
      if (!article.title || !article.content) {
        console.warn('❌ Skipping article: Missing title or content');
        continue;
      }

      // Create a clean slug
      const slug = slugify(article.title, {
        lower: true,
        strict: true,
        trim: true,
        replacement: '-'
      }).substring(0, 100);

      // Ensure date is valid
      let date = article.date || new Date().toISOString().split('T')[0];
      try {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          date = new Date().toISOString().split('T')[0];
        } else {
          date = parsedDate.toISOString().split('T')[0];
        }
      } catch {
        date = new Date().toISOString().split('T')[0];
      }

      // Clean and sanitize content
      const cleanContent = cleanArticleContent(article.content || '');
      const cleanHtml = (article.htmlContent || '')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
        .replace(/\uFFFD/g, ''); // Remove replacement character

      // Create timestamps
      const now = new Date();
      const firestoreTimestamp = Timestamp.fromDate(now);

      // Create the article data object with explicit type checking
      const articleData: FirestoreArticle = {
        title: String(article.title || '').trim().substring(0, 500),
        slug: String(slug),
        excerpt: String(formatExcerpt(cleanContent)).substring(0, 1000),
        content: String(cleanContent),
        date: String(date),
        category: String(article.category || 'Regulations').trim().substring(0, 100),
        source: String(article.source || '').trim().substring(0, 100),
        originalUrl: String(article.originalUrl || '').trim().substring(0, 500),
        published: true,
        htmlContent: String(cleanHtml),
        createdAt: firestoreTimestamp,
        updatedAt: firestoreTimestamp,
        timestamp: firestoreTimestamp.seconds
      };

      // Final validation
      if (!articleData.title || !articleData.content) {
        console.warn('❌ Skipping article: Invalid data after cleaning');
        continue;
      }

      // Log the data being saved
      console.log('\n📝 Saving article:', {
        title: articleData.title,
        slug: articleData.slug,
        date: articleData.date,
        source: articleData.source,
        excerptLength: articleData.excerpt.length,
        contentLength: articleData.content.length
      });

      // Save to Firestore
      await createArticle(articleData);
      console.log(`✅ Successfully saved article: ${articleData.title}`);
      savedCount++;
    } catch (error) {
      console.error(`❌ Error saving article:`, error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`Total articles processed: ${articles.length}`);
  console.log(`Successfully saved: ${savedCount}`);
  console.log(`Errors: ${errorCount}`);
}

async function main() {
  console.log('🚀 Starting content scraper...');

  // UL Solutions articles
  const ulArticles = await downloadArticles(
    'UL Solutions',
    'https://www.ul.com/news',
    'a[href*="/news/"]'
  );

  // In Compliance Magazine articles
  const inComplianceArticles = await downloadArticles(
    'In Compliance Magazine',
    'https://incompliancemag.com/topics/news/global-compliance-news/',
    '' // Selector not needed as we're using container-based approach
  );

  // Save all articles to Firebase
  await saveArticlesToFirebase([...ulArticles, ...inComplianceArticles]);
  console.log('\n✨ Content scraper finished!');
}

main().catch(console.error); 