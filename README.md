# NTV Scaffolding

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

An Angular Nx monorepo workspace containing a host installation application and a comprehensive component library with Storybook documentation.

## 📁 Project Structure

- **`apps/ntv-host-installation/host-installation`** - Main Angular application for host installation flow
- **`libs/component-pantry`** - Reusable Angular component library with Storybook
- **`apps/ntv-host-installation/host-installation-e2e`** - End-to-end tests using Playwright

## 🚀 Quick Start

### Development Server

```sh
# Start the host installation app
npm run serve
# or
npx nx serve host-installation

# Start Storybook for component development
npm run storybook
# or
npx nx storybook component-pantry
```

### Building Projects

```sh
# Build host installation app (production)
npm run build:host:prod

# Build host installation app (development)
npm run build:host:dev

# Build component library
npm run build:pantry

# Build Storybook
npm run build:storybook:prod
```

### Testing

```sh
# Run unit tests
npm run test

# Run E2E tests
npm run e2e

# Run E2E tests with UI
npm run e2e:ui

# Run linting
npm run lint
```

## 📚 Component Library

The `component-pantry` library contains reusable Angular components with comprehensive Storybook documentation:

- **Button** - Configurable button component with multiple variants
- **Card** - Flexible card component for content containers
- **Popover** - Advanced popover with positioning and trigger options
- **Stepper** - Multi-variant stepper for workflow navigation
- **Table** - Feature-rich table with sorting, filtering, and row actions
- **Layout** - Application layout components

### Using Components

```typescript
import { Button, Card, Table } from '@ntv-scaffolding/component-pantry';

@Component({
  imports: [Button, Card, Table],
  // ...
})
```

## 🔧 Development Workflow

### Adding New Components

```sh
# Generate a new component in the library
npx nx g @nx/angular:component my-component --project=component-pantry

# Generate a new application
npx nx g @nx/angular:app my-app

# Generate a new library
npx nx g @nx/angular:lib my-lib
```

### Nx Console

[Install Nx Console](https://nx.dev/getting-started/editor-setup) for VSCode to browse generators and run tasks through a GUI interface.

## 🚀 Deployment

### AWS Amplify Setup

For deploying to AWS Amplify with GitHub integration:

1. **Host Installation App**:
   - Development: `npm run build:host:dev`
   - Production: `npm run build:host:prod`
   - Output: `dist/apps/ntv-host-installation/host-installation/browser`

2. **Storybook Documentation**:
   - Development: `npm run build:storybook:dev`
   - Production: `npm run build:storybook:prod`
   - Output: `dist/storybook/component-pantry`

### CI/CD Pipeline

```sh
# Connect to Nx Cloud for faster CI
npx nx connect

# Generate CI workflow
npx nx g ci-workflow
```

Nx Cloud provides remote caching, task distribution, and automated test splitting for faster CI/CD pipelines.

## 📋 Available Scripts

All available npm scripts are organized in `package.json` with comments for clarity:

- **Host Installation App**: `serve`, `build:host:dev`, `build:host:prod`
- **Component Library**: `build:pantry:dev`, `build:pantry:prod`
- **Storybook**: `storybook`, `build:storybook:dev`, `build:storybook:prod`
- **Testing**: `test`, `lint`, `e2e`, `e2e:ui`, `e2e:headed`

## 🛠️ Tech Stack

- **Framework**: Angular 20+ with standalone components
- **Build System**: Nx 21.2.2
- **Styling**: Tailwind CSS
- **Testing**: Jest (unit), Playwright (E2E)
- **Documentation**: Storybook
- **Package Manager**: npm

## 📖 Useful Resources

- [Nx Documentation](https://nx.dev)
- [Angular Documentation](https://angular.dev)
- [Storybook Documentation](https://storybook.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
