# Workspace Management Guide

This guide helps you open only specific parts of your NTV scaffolding project instead of the entire monorepo, reducing file clutter and improving focus.

## Quick Start

### Option 1: Use NPM Scripts (Recommended)

Run these commands from your project root:

```bash
# Open Host Installation workspace only
npm run open:host

# Open Component Pantry workspace only
npm run open:pantry

# Open custom workspace (Host + Pantry)
npm run open:custom

# Open full project
npm run open:full

# Show all available workspace options
npm run open:workspace
```

### Option 2: Use the Scripts

Run one of these scripts from your project root:

**Windows Command Prompt:**

```bash
scripts\open-workspace.bat
```

**PowerShell:**

```powershell
scripts\open-workspace.ps1
```

Both scripts will present you with a menu to choose which workspace to open.

### Option 3: Open Workspace Files Directly

Double-click any of these `.code-workspace` files to open them in VSCode:

- [`workspace-configs/host-installation-only.code-workspace`](workspace-configs/host-installation-only.code-workspace) - Only the Host Installation app
- [`workspace-configs/component-pantry-only.code-workspace`](workspace-configs/component-pantry-only.code-workspace) - Only the Component Pantry library
- [`workspace-configs/custom-workspace.code-workspace`](workspace-configs/custom-workspace.code-workspace) - Both Host Installation and Component Pantry

### Option 4: Command Line

Open specific workspaces directly:

```bash
# Host Installation only
code workspace-configs/host-installation-only.code-workspace

# Component Pantry only
code workspace-configs/component-pantry-only.code-workspace

# Custom workspace
code workspace-configs/custom-workspace.code-workspace

# Open specific folder directly (cleanest approach)
code apps/ntv-host-installation/host-installation
code libs/component-pantry

# Alternative: Use workspace files for additional VSCode features
code workspace-configs/host-installation-only.code-workspace
code workspace-configs/component-pantry-only.code-workspace
```

## What Each Workspace Contains

### Host Installation Only

- **Focus:** [`apps/ntv-host-installation/host-installation/`](apps/ntv-host-installation/host-installation/)
- **Includes:** Only the installation flow components, services, and related files
- **Hidden:** Component Pantry library, other apps, and root configuration files
- **Best for:** Working specifically on the host installation application without distractions

### Component Pantry Only

- **Focus:** [`libs/component-pantry/`](libs/component-pantry/)
- **Includes:** Only the reusable components (accordion, button, card, input, modal, etc.)
- **Hidden:** Apps, other libraries, and root configuration files
- **Best for:** Developing and maintaining the component library without distractions

### Custom Workspace

- **Focus:** Both Host Installation app and Component Pantry library
- **Includes:** The two main development areas
- **Hidden:** Other apps and libraries
- **Best for:** Working on features that involve both the app and components

## Benefits

✅ **Reduced Clutter:** Only see files relevant to your current work  
✅ **Faster Search:** Search operations are limited to relevant files  
✅ **Better Performance:** VSCode loads faster with fewer files  
✅ **Improved Focus:** Less distraction from unrelated code  
✅ **Easier Navigation:** File explorer shows only what you need

## VSCode Features Used

- **Multi-root Workspaces:** Each workspace can contain multiple folders
- **File Exclusion:** Automatically hides irrelevant files and folders
- **Search Exclusion:** Limits search scope to relevant files
- **Extension Recommendations:** Suggests useful extensions for Angular development

## Creating Your Own Workspace

To create a custom workspace for your specific needs:

1. Copy one of the existing `.code-workspace` files
2. Modify the `folders` array to include your desired paths
3. Update the `files.exclude` settings to hide unwanted files
4. Save with a descriptive name
5. Open with `code your-workspace.code-workspace`

## Tips

- **Bookmark Workspaces:** Pin frequently used workspace files to your taskbar
- **Use Shortcuts:** Create desktop shortcuts to your most-used workspaces
- **Switch Contexts:** Close current workspace and open another when switching focus areas
- **Keep Root Access:** Most workspaces include the root folder for configuration files

## Troubleshooting

**Script doesn't run?**

- Ensure you're in the project root directory
- For PowerShell: You may need to run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

**Workspace doesn't open correctly?**

- Check that the paths in the `.code-workspace` file are correct
- Ensure VSCode is installed and accessible via the `code` command

**Missing files in workspace?**

- Check the `files.exclude` settings in the workspace file
- You may need to adjust the exclusion patterns
