import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { initScheduler } from './src/utils/scheduler';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Check if we should run the scrape script immediately for testing
const runImmediately = process.env.RUN_SCRAPE_IMMEDIATELY === 'true';

// Prepare the Next.js app
app.prepare().then(() => {
  try {
    // Initialize the scheduler
    initScheduler({ runImmediately });
    console.log('Scheduler initialized successfully');
  } catch (error) {
    console.error('Failed to initialize scheduler:', error);
  }
  
  // Create the HTTP server
  createServer((req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end('Bad Request');
      return;
    }
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
}); 