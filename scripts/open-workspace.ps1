# PowerShell script to open specific workspaces
Write-Host "Select which workspace to open:" -ForegroundColor Cyan
Write-Host "1. Host Installation App only" -ForegroundColor Yellow
Write-Host "2. Component Pantry Library only" -ForegroundColor Yellow
Write-Host "3. Custom workspace (Host Installation + Component Pantry)" -ForegroundColor Yellow
Write-Host "4. Full project (current behavior)" -ForegroundColor Yellow
Write-Host "5. Open specific folder" -ForegroundColor Yellow

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "Opening Host Installation workspace..." -ForegroundColor Green
        code "workspace-configs/host-installation-only.code-workspace"
    }
    "2" {
        Write-Host "Opening Component Pantry workspace..." -ForegroundColor Green
        code "workspace-configs/component-pantry-only.code-workspace"
    }
    "3" {
        Write-Host "Opening Custom workspace..." -ForegroundColor Green
        code "workspace-configs/custom-workspace.code-workspace"
    }
    "4" {
        Write-Host "Opening full project..." -ForegroundColor Green
        code .
    }
    "5" {
        Write-Host "Available folders:" -ForegroundColor Cyan
        Write-Host "- apps/ntv-host-installation/host-installation" -ForegroundColor Yellow
        Write-Host "- libs/component-pantry" -ForegroundColor Yellow
        $folder = Read-Host "Enter folder path"
        if (Test-Path $folder) {
            code $folder
        } else {
            Write-Host "Folder not found: $folder" -ForegroundColor Red
        }
    }
    default {
        Write-Host "Invalid choice. Opening full project..." -ForegroundColor Red
        code .
    }
}

Read-Host "Press Enter to exit"