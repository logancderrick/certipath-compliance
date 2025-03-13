# PowerShell script to register a scheduled job for the content scraper
# Run this script as administrator once to set up the scheduled job

# Register the scheduled job
$trigger = New-JobTrigger -Daily -At "3:00 AM"
$options = New-ScheduledJobOption -RunElevated -RequireNetwork

# Path to the scraper script
$scriptPath = "C:\Users\Logan\Nextcloud\Coding\projects\certipath-compliance\run-scraper.ps1"

# Register the job
Register-ScheduledJob -Name "ContentScraperDaily" -FilePath $scriptPath -Trigger $trigger -ScheduledJobOption $options

Write-Host "Scheduled job 'ContentScraperDaily' has been registered to run daily at 3:00 AM."
Write-Host "To view all scheduled jobs, run: Get-ScheduledJob"
Write-Host "To remove this job, run: Unregister-ScheduledJob -Name 'ContentScraperDaily'" 