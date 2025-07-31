<div align="center">

# 🏗️ NTV Scaffolding

[![Angular](https://img.shields.io/badge/Angular-20+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Nx](https://img.shields.io/badge/Nx-21.2.2-143055?style=for-the-badge&logo=nx&logoColor=white)](https://nx.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8.0+-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)

**A modern Angular Nx monorepo workspace featuring a host installation application and a comprehensive component library with Storybook documentation.**

[🚀 Quick Start](#-quick-start) • [📚 Components](#-component-library) • [🔧 Development](#-development-workflow) • [🌐 Deployment](#-deployment)

</div>

---

## 📁 Project Structure

<table>
<tr>
<td width="50%">

### 🎯 Applications

```
📱 host-installation
   └── Main Angular app for installation flow

🧪 host-installation-e2e
   └── Playwright E2E tests
```

</td>
<td width="50%">

### 📚 Libraries

```
🧩 component-pantry
   ├── Reusable Angular components
   ├── Storybook documentation
   └── Tailwind CSS styling
```

</td>
</tr>
</table>

## 🚀 Quick Start

<details open>
<summary><strong>🔥 Development Commands</strong></summary>

```bash
# 🚀 Start development servers
npm run serve          # Host installation app (http://localhost:4200)
npm run storybook      # Component library docs (http://localhost:4400)

# 🏗️ Build for production
npm run build:host:prod    # Production-ready host app
npm run build:pantry       # Component library package
npm run build:storybook    # Static Storybook site

# 🧪 Testing & Quality
npm run test           # Unit tests with Jest
npm run e2e           # E2E tests with Playwright
npm run lint          # ESLint code quality checks
```

</details>

> **💡 Pro Tip:** Use `npm run serve` and `npm run storybook` simultaneously for the best development experience!

## 📚 Component Library

<div align="center">

**🎨 A comprehensive collection of reusable Angular components with Storybook documentation**

</div>

<table>
<tr>
<td width="50%">

### 🎯 **UI & Form Components**

- 🔘 **Button** - Multi-variant interactive buttons
- 🃏 **Card** - Flexible content containers
- 📝 **Input** - Form input controls
- 🔍 **Autocomplete** - Smart search inputs

### 🧭 **Navigation & Interaction**

- 📊 **Stepper** - Multi-step workflows
- 📋 **Accordion** - Collapsible content panels
- 🪟 **Modal** - Overlay dialogs
- 💬 **Popover** - Contextual tooltips

</td>
<td width="50%">

### 📊 **Data Display**

- 🗂️ **Table** - Feature-rich data tables
- 🖼️ **Thumbnail Gallery** - Image galleries

### 🏗️ **Layout & Structure**

- 📐 **Template** - Page templates
- 🏠 **Layout** - Application layouts

### ✨ **And More...**

- 🎛️ **Offcanvas** - Slide-out panels
- 🔧 **Utility Components** - Helper components

</td>
</tr>
</table>

<details>
<summary><strong>💻 Usage Example</strong></summary>

```typescript
import { Button, Card, Table, Stepper } from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'app-example',
  imports: [Button, Card, Table, Stepper],
  template: `
    <lib-card>
      <lib-button variant="primary">Click me!</lib-button>
    </lib-card>
  `,
})
export class ExampleComponent {}
```

</details>

## 🔧 Development Workflow

<details>
<summary><strong>🛠️ Code Generation</strong></summary>

```bash
# 🧩 Add new component to library
npx nx g @nx/angular:component my-component --project=component-pantry

# 📱 Create new application
npx nx g @nx/angular:app my-app

# 📚 Generate new library
npx nx g @nx/angular:lib my-lib

# 📖 Add Storybook story
npx nx g @nx/storybook:story my-component --project=component-pantry
```

</details>

<details>
<summary><strong>🎯 Nx Console (Recommended)</strong></summary>

**Install the [Nx Console extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VS Code**

✨ **Features:**

- 🖱️ Visual interface for running commands
- 🎨 Code generation wizards
- 📊 Workspace dependency graph
- 🚀 One-click task execution

</details>

## 🌐 Deployment

<div align="center">

**🚀 Ready for AWS Amplify with GitHub integration**

</div>

### 📱 **Host Installation App**

**🔧 Development Environment**

```bash
Build: npm run build:host:dev
Output: dist/apps/ntv-host-installation/host-installation/browser
```

**🚀 Production Environment**

```bash
Build: npm run build:host:prod
Output: dist/apps/ntv-host-installation/host-installation/browser
```

### 📚 **Storybook Documentation**

**🔧 Development**

```bash
Build: npm run build:storybook:dev
Output: dist/storybook/component-pantry
```

**🚀 Production**

```bash
Build: npm run build:storybook:prod
Output: dist/storybook/component-pantry
```

<details>
<summary><strong>⚡ CI/CD Pipeline with Nx Cloud (Recommended)</strong></summary>

> 💡 **Highly recommended for teams and larger projects** - Nx Cloud provides significant performance improvements and valuable insights.

**🚀 Quick Setup (Choose one method):**

**Method 1: CLI Setup (Recommended)**

```bash
# 1. Connect to Nx Cloud (free tier available)
npx nx connect

# 2. Generate CI workflow for your platform
npx nx g ci-workflow --ci=github  # or gitlab, azure, etc.

# 3. Commit and push - your CI is now optimized!
```

**Method 2: Web Dashboard Setup**

```bash
# 1. Visit https://cloud.nx.app
# 2. Sign in with GitHub/GitLab
# 3. Select your repository from the list
# 4. Follow the guided setup process
```

**🎯 Key Benefits:**

- ⚡ **Remote Caching** - Share build artifacts across team and CI
- 🔄 **Distributed Task Execution** - Run tasks in parallel across multiple agents
- 🧪 **Intelligent Test Splitting** - Automatically distribute tests for faster execution
- 📊 **Advanced Analytics** - Detailed build performance insights and bottleneck detection
- 🎯 **Affected Detection** - Only rebuild what changed
- 💰 **Cost Reduction** - Significantly reduce CI/CD pipeline costs

**📈 Performance Impact:**

- Up to 10x faster CI/CD pipelines
- 70% reduction in compute costs
- Instant local cache hits for unchanged code

</details>

## 📋 Available Scripts

<details>
<summary><strong>📱 Host Installation App</strong></summary>

```bash
npm run serve              # 🚀 Development server
npm run serve:host         # 🚀 Alternative serve command
npm run build:host         # 🏗️ Production build
npm run build:host:dev     # 🔧 Development build
npm run build:host:prod    # 🚀 Production build (optimized)
```

</details>

<details>
<summary><strong>🧩 Component Library</strong></summary>

```bash
npm run build:pantry       # 📦 Build library package
npm run build:pantry:dev   # 🔧 Development build
npm run build:pantry:prod  # 🚀 Production build
```

</details>

<details>
<summary><strong>📚 Storybook</strong></summary>

```bash
npm run storybook              # 🚀 Development server (port 4400)
npm run build:storybook        # 📦 Build static site
npm run build:storybook:dev    # 🔧 Development build
npm run build:storybook:prod   # 🚀 Production build
```

</details>

<details>
<summary><strong>🧪 Testing & Quality</strong></summary>

```bash
npm run test           # 🧪 Unit tests with Jest
npm run test:watch     # 👀 Watch mode for tests
npm run e2e           # 🎭 E2E tests with Playwright
npm run e2e:ui        # 🖥️ E2E tests with UI
npm run e2e:report    # 📊 Generate test report
npm run lint          # ✅ ESLint code quality
```

</details>

<details>
<summary><strong>🖥️ Workspace Management</strong></summary>

```bash
# 🎯 Open focused workspaces (clean file view + root terminal)
npm run open:host      # Host Installation app only
npm run open:pantry    # Component Pantry library only
npm run open:custom    # Both Host Installation + Component Pantry
npm run open:full      # Full project view
npm run open:workspace # Show all workspace options

# 📁 Alternative methods
scripts\open-workspace.bat    # Windows batch script with menu
scripts\open-workspace.ps1    # PowerShell script with menu
```

**💡 Benefits:**

- ✨ **Clean Interface** - Only see files relevant to your current work
- ⚡ **Better Performance** - VSCode loads faster with fewer files
- 🎯 **Improved Focus** - Less distraction from unrelated code
- 🔧 **Root Terminal** - Terminal opens in project root for nx/npm commands

</details>

---

## 🛠️ Tech Stack

<div align="center">

| Category               | Technology   | Version |
| ---------------------- | ------------ | ------- |
| 🎯 **Framework**       | Angular      | 20+     |
| 🏗️ **Build System**    | Nx           | 21.2.2  |
| 🎨 **Styling**         | Tailwind CSS | 3.0+    |
| 🧪 **Unit Testing**    | Jest         | Latest  |
| 🎭 **E2E Testing**     | Playwright   | Latest  |
| 📚 **Documentation**   | Storybook    | 8+      |
| 📦 **Package Manager** | npm          | Latest  |
| 💻 **Language**        | TypeScript   | 5.0+    |

</div>

---

## 📖 Useful Resources

<div align="center">

[![Nx Docs](https://img.shields.io/badge/📖_Nx-Documentation-143055?style=for-the-badge)](https://nx.dev)
[![Angular Docs](https://img.shields.io/badge/📖_Angular-Documentation-DD0031?style=for-the-badge)](https://angular.dev)
[![Storybook Docs](https://img.shields.io/badge/📖_Storybook-Documentation-FF4785?style=for-the-badge)](https://storybook.js.org)
[![Tailwind Docs](https://img.shields.io/badge/📖_Tailwind-Documentation-38B2AC?style=for-the-badge)](https://tailwindcss.com)

</div>

---

<div align="center">

**Made with ❤️ using Angular & Nx**

_Happy coding! 🚀_

</div>
