# PowerShell script to run the content scraper
$logFile = "scraper-log-$(Get-Date -Format 'yyyy-MM-dd').txt"
$projectPath = "C:\Users\Logan\Nextcloud\Coding\projects\certipath-compliance"

# Function to log messages
function Log-Message {
    param (
        [string]$message
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $message"
    Write-Host $logMessage
    Add-Content -Path "$projectPath\logs\$logFile" -Value $logMessage
}

# Create logs directory if it doesn't exist
if (-not (Test-Path "$projectPath\logs")) {
    New-Item -ItemType Directory -Path "$projectPath\logs" | Out-Null
}

# Start logging
Log-Message "Starting Content Scraper"

try {
    # Change to the project directory
    Set-Location -Path $projectPath
    Log-Message "Changed directory to $projectPath"
    
    # Run the script
    Log-Message "Running content scraper..."
    $output = npx ts-node src/scripts/contentScraper.ts 2>&1
    
    # Log the output
    foreach ($line in $output) {
        Log-Message $line
    }
    
    Log-Message "Content scraper completed successfully"
} 
catch {
    Log-Message "Error running content scraper: $_"
    exit 1
}
finally {
    Log-Message "Content scraper process finished"
    Log-Message "----------------------------------------"
} 