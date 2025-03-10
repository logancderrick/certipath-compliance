"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDrafts = importDrafts;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
const uuid_1 = require("uuid");
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
    let articles = [];
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
            const { data, content } = (0, gray_matter_1.default)(fileContent);
            // Create article object
            const article = {
                id: (0, uuid_1.v4)(),
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
            }
            else {
                console.log(`Skipped (already exists): ${article.title}`);
            }
            // Delete the draft file after successful import
            fs.unlinkSync(filePath);
            console.log(`Deleted draft file: ${file}`);
        }
        catch (error) {
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
