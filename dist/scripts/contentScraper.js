"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const articles_1 = require("../lib/firebase/articles");
const slugify_1 = __importDefault(require("slugify"));
async function downloadArticles(source, baseUrl, articleSelector) {
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    const articles = [];
    try {
        // Navigate to the source's base URL
        await page.goto(baseUrl, { waitUntil: 'networkidle0' });
        // Get article links
        const articleLinks = await page.$$eval(articleSelector, (links) => links.slice(0, 5).map(link => link.href));
        // Process each article
        for (const url of articleLinks) {
            console.log(`Processing article: ${url}`);
            await page.goto(url, { waitUntil: 'networkidle0' });
            // Extract article data
            const article = await page.evaluate(() => {
                let title = '';
                let content = '';
                let date = '';
                let htmlContent = '';
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
                return { title, content, date, htmlContent };
            });
            if (article.title && article.content) {
                articles.push({
                    ...article,
                    category: 'Regulations', // Default category
                    source,
                    originalUrl: url,
                    htmlContent: article.htmlContent
                });
            }
        }
    }
    catch (error) {
        console.error(`Error processing ${source}:`, error);
    }
    finally {
        await browser.close();
    }
    return articles;
}
async function saveArticlesToFirebase(articles) {
    for (const article of articles) {
        try {
            const slug = (0, slugify_1.default)(article.title, {
                lower: true,
                strict: true
            });
            const articleData = {
                title: article.title,
                slug,
                excerpt: (0, articles_1.formatExcerpt)(article.content),
                content: (0, articles_1.cleanArticleContent)(article.content),
                date: article.date,
                category: article.category,
                source: article.source,
                originalUrl: article.originalUrl,
                published: true,
                htmlContent: article.htmlContent
            };
            await (0, articles_1.createArticle)(articleData);
            console.log(`Saved article: ${article.title}`);
        }
        catch (error) {
            console.error(`Error saving article "${article.title}":`, error);
        }
    }
}
async function main() {
    // UL Solutions articles
    const ulArticles = await downloadArticles('UL Solutions', 'https://www.ul.com/news', 'a[href*="/news/"]');
    // In Compliance Magazine articles
    const inComplianceArticles = await downloadArticles('In Compliance Magazine', 'https://incompliancemag.com/news/', 'h2.entry-title a');
    // Save all articles to Firebase
    await saveArticlesToFirebase([...ulArticles, ...inComplianceArticles]);
}
main().catch(console.error);
