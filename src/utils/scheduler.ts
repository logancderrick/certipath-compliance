import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the options interface
interface SchedulerOptions {
  runImmediately?: boolean;
}

// Get the project root directory
const getProjectRoot = (): string => {
  try {
    // ESM approach
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, '..', '..');
  } catch {
    // CommonJS fallback
    return process.cwd();
  }
};

const projectRoot = getProjectRoot();

// Function to run the scrape script
const runScrapeScript = (): void => {
  console.log('Running the scrape script...');
  
  // Execute the npm run scrape command from the project root
  exec('npm run scrape', { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr && !stderr.includes('npm WARN')) {
      console.error(`Script error: ${stderr}`);
      return;
    }
    console.log(`Script output: ${stdout}`);
  });
};

// Initialize the scheduler
const initScheduler = (options: SchedulerOptions = { runImmediately: false }): void => {
  // Schedule the task to run every day at midnight
  cron.schedule('0 0 * * *', runScrapeScript);
  
  console.log('Scheduler initialized and running...');
  
  // Optionally, run the script immediately when the app starts
  if (options.runImmediately) {
    console.log('Running scrape script immediately for testing...');
    runScrapeScript();
  }
};

export { initScheduler, runScrapeScript }; 