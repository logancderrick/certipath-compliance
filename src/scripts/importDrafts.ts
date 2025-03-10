import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';

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

async function importDrafts() {
  console.log('Starting draft import process...');
  
  const draftsDir = path.join(process.cwd(), 'data', 'drafts');
  const articlesFile = path.join(process.cwd(), 'src', 'data', 'articles.json');
  
  // Ensure directories exist
  if (!fs.existsSync(draftsDir)) {
    console.log('No drafts directory found. Creating...');
    fs.mkdirSync(draftsDir, { recursive: true });
    return;
  }
  
  // Read existing articles
  let articles: Article[] = [];
  if (fs.existsSync(articlesFile)) {
    const articlesData = fs.readFileSync(articlesFile, 'utf8');
    articles = JSON.parse(articlesData);
  }
  
  // Get all draft files
  const draftFiles = fs.readdirSync(draftsDir).filter(file => file.endsWith('.md'));
  console.log(`Found ${draftFiles.length} draft files`);
  
  for (const file of draftFiles) {
    const filePath = path.join(draftsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    try {
      // Parse the frontmatter
      const { data, content } = matter(fileContent);
      
      // Create article object
      const article: Article = {
        id: uuidv4(),
        title: data.title || '',
        slug: file.replace('.md', ''),
        excerpt: content.substring(0, 200) + '...',
        content,
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || 'Uncategorized',
        source: data.source || '',
        originalUrl: data.originalUrl || '',
        published: false
      };
      
      // Check if article already exists (by title)
      const existingArticle = articles.find(a => a.title === article.title);
      if (!existingArticle) {
        articles.push(article);
        console.log(`Imported: ${article.title}`);
      } else {
        console.log(`Skipped (already exists): ${article.title}`);
      }
      
      // Delete the draft file after successful import
      fs.unlinkSync(filePath);
      console.log(`Deleted draft file: ${file}`);
    } catch (error) {
      console.error(`Error processing draft ${file}:`, error);
    }
  }
  
  // Save updated articles
  fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2));
  console.log(`Saved ${articles.length} articles to ${articlesFile}`);
}

// Run the importer if this file is executed directly
if (require.main === module) {
  importDrafts().catch(console.error);
}

export { importDrafts };