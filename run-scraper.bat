@echo off
echo Starting Content Scraper at %date% %time%

:: Change to the project directory - update this path to your actual project path
cd /d C:\Users\Logan\Nextcloud\Coding\projects\certipath-compliance

:: Run the script
echo Running content scraper...
npx ts-node src/scripts/contentScraper.ts

echo Content scraper finished at %date% %time%
echo ---------------------------------------- 