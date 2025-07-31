@echo off
echo Select which workspace to open:
echo 1. Host Installation App only
echo 2. Component Pantry Library only
echo 3. Custom workspace (Host Installation + Component Pantry)
echo 4. Full project (current behavior)
echo 5. Open specific folder

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo Opening Host Installation workspace...
    code "workspace-configs/host-installation-only.code-workspace"
) else if "%choice%"=="2" (
    echo Opening Component Pantry workspace...
    code "workspace-configs/component-pantry-only.code-workspace"
) else if "%choice%"=="3" (
    echo Opening Custom workspace...
    code "workspace-configs/custom-workspace.code-workspace"
) else if "%choice%"=="4" (
    echo Opening full project...
    code .
) else if "%choice%"=="5" (
    echo Available folders:
    echo - apps/ntv-host-installation/host-installation
    echo - libs/component-pantry
    set /p folder="Enter folder path: "
    code "%folder%"
) else (
    echo Invalid choice. Opening full project...
    code .
)

pause