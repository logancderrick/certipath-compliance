# Content Scraper Troubleshooting Guide

## Common Issues and Solutions

### Script Doesn't Run at Scheduled Time

1. **Check Task Scheduler History**:
   - Open Task Scheduler
   - Select "Task Scheduler Library" in the left panel
   - Find your task and check its history
   - Look for error codes or messages

2. **Permissions Issues**:
   - Ensure the user account running the task has appropriate permissions
   - Try setting the task to "Run with highest privileges"
   - Make sure the account has access to the project directory

3. **Network Connectivity**:
   - If the script requires internet access, ensure the "Start only if the following network connection is available" option is set to "Any connection"

### Script Runs But Fails

1. **Check Log Files**:
   - Review the log files in the `logs` directory
   - Look for specific error messages

2. **Node.js/NPM Issues**:
   - Ensure Node.js is installed and in the PATH for the user running the task
   - Try running the script manually to verify it works outside of Task Scheduler

3. **Puppeteer Issues**:
   - Puppeteer might have issues running in headless mode in some environments
   - Try modifying the script to use `{ headless: 'new' }` instead of `{ headless: true }`
   - Ensure all Chromium dependencies are installed

### Firebase Connection Issues

1. **Authentication**:
   - Verify that Firebase credentials are properly set up
   - Check if any authentication tokens have expired

2. **Firestore Quota**:
   - Check if you've hit any Firestore quotas or limits
   - Review Firebase console for any error messages

## Manual Testing

To test the script manually:

1. Open PowerShell or Command Prompt
2. Navigate to your project directory
3. Run: `npx ts-node src/scripts/contentScraper.ts`

## Updating the Schedule

To change the schedule:

1. Open Task Scheduler
2. Find your task
3. Right-click and select "Properties"
4. Go to the "Triggers" tab
5. Edit the trigger as needed

## Contact

If you encounter persistent issues, please document:
- The exact error message
- Steps to reproduce
- Log file contents
- Any recent changes to the system or code 