# @ntv-scaffolding/component-pantry

🎨 **A modern Angular component library** built with Tailwind CSS and designed for scalable applications.

[![npm version](https://badge.fury.io/js/@ntv-scaffolding%2Fcomponent-pantry.svg)](https://www.npmjs.com/package/@ntv-scaffolding/component-pantry)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Installation

> **✨ Angular 20+ Ready**: This library fully supports standalone components and modern Angular features!

### Prerequisites

**⚠️ Important**: This library requires **Tailwind CSS** to be installed and configured in your project.

### Step 1: Install the Component Library

```bash
npm install @ntv-scaffolding/component-pantry
```

### Step 2: Install and Configure Tailwind CSS (if not already installed)

```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind configuration
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS

Update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@ntv-scaffolding/component-pantry/**/*.{js,ts,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Add Tailwind to Your CSS

Add to your `src/styles.css` or main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Quick Start

### 1. Import Components (Standalone - Recommended)

```typescript
// app.component.ts or any standalone component
import { Component } from '@angular/core';
import { 
  Button, 
  Input, 
  Card 
} from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Button,
    Input,
    Card
  ],
  template: `
    <ntv-button>Click Me</ntv-button>
  `
})
export class AppComponent { }
```

### 1b. Import Module (Legacy NgModule)

```typescript
// For projects still using NgModule
import { NgModule } from '@angular/core';
import { ComponentPantryModule } from '@ntv-scaffolding/component-pantry';

@NgModule({
  imports: [
    ComponentPantryModule
  ]
})
export class AppModule { }
```

### 2. Use Components

#### Modern Standalone Component Example

```typescript
// modern-app.component.ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  Button, 
  Input, 
  Card 
} from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'app-modern',
  standalone: true,
  imports: [
    FormsModule,
    Button,
    Input,
    Card
  ],
  template: `
    <!-- Button with Angular 20 signals and dynamic theming -->
    <ntv-button 
      [config]="{
        variant: 'primary',
        size: 'md',
        color: 'custom',
        customColor: '#3b82f6',
        rounded: 'lg'
      }"
      (buttonClick)="handleClick()">
      Clicked {{ clickCount() }} times
    </ntv-button>

    <!-- Input with enhanced features -->
    <ntv-input 
      [config]="{
        type: 'text',
        size: 'lg',
        variant: 'default',
        placeholder: 'Enter your name',
        clearable: true,
        borderRadius: 'md'
      }"
      [(ngModel)]="name"
      label="Full Name">
    </ntv-input>

    <!-- Card with dynamic theming -->
    <ntv-card 
      [title]="'Hello ' + name()"
      subtitle="Welcome to Angular 20!"
      [config]="{
        variant: 'elevated',
        rounded: 'xl',
        shadow: 'lg',
        hoverEffect: true,
        adaptToTheme: true
      }">
      <p>This component uses modern Angular features and dynamic theming!</p>
    </ntv-card>

    <!-- Autocomplete with signals -->
    <ntv-autocomplete
      [data]="autocompleteOptions()"
      [config]="{
        placeholder: 'Search items...',
        multiple: true,
        clearable: true,
        searchable: true
      }"
      (selectionChange)="onSelectionChange($event)">
    </ntv-autocomplete>
  `
})
export class ModernAppComponent {
  name = signal('');
  clickCount = signal(0);

  handleClick() {
    this.clickCount.update(count => count + 1);
  }
}
```

#### Traditional Template Usage

```html
<!-- Button Component with Dynamic Theming -->
<ntv-button 
  variant="primary" 
  size="md"
  color="blue"
  (buttonClick)="handleClick($event)">
  Click Me
</ntv-button>

<!-- Button with Custom Color -->
<ntv-button 
  variant="outline"
  color="custom"
  customColor="#8b5cf6"
  rounded="full">
  Custom Purple
</ntv-button>

<!-- Input Component with Enhanced Features -->
<ntv-input 
  type="email"
  size="lg"
  variant="default"
  placeholder="Enter your email"
  [(ngModel)]="email"
  label="Email Address"
  clearable="true"
  info="We'll never share your email">
</ntv-input>

<!-- Card Component with Advanced Styling -->
<ntv-card 
  title="Dynamic Card"
  subtitle="Adapts to your theme"
  variant="elevated"
  rounded="lg"
  shadow="md"
  hoverEffect="true">
  <p>This card uses dynamic theming!</p>
</ntv-card>

<!-- Autocomplete with Configuration -->
<ntv-autocomplete
  [data]="options"
  placeholder="Search options..."
  multiple="true"
  clearable="true"
  (selectionChange)="onSelectionChange($event)">
</ntv-autocomplete>

<!-- Accordion with Slot Content -->
<ntv-accordion variant="bordered" size="md" showIcons="true">
  <div slot="header">Expandable Section</div>
  <div slot="body">
    <p>Content that can be collapsed and expanded</p>
  </div>
</ntv-accordion>
```

## 🧩 Available Components

### Button (`ntv-button`)
Advanced button component with comprehensive styling and dynamic theming.

**Properties:**
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'accent' | 'description' | 'info'`
- `size`: `'sm' | 'md' | 'lg' | 'xl'`
- `color`: `'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'pink' | 'custom'`
- `customColor`: `string` (hex color when color is 'custom')
- `disabled`: `boolean`
- `loading`: `boolean`
- `fullWidth`: `boolean`
- `rounded`: `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'`
- `shadow`: `boolean`
- `type`: `'button' | 'submit' | 'reset'`
- `config`: `ButtonConfig` (DRY configuration object)

**Dynamic Theming:** Supports custom colors, Tailwind color schemes, and adapts to your theme configuration.

### Input (`ntv-input`)
Form input component with validation, styling, and dynamic theming.

**Properties:**
- `type`: `'text' | 'password' | 'email' | 'number'`
- `size`: `'xs' | 'sm' | 'md' | 'lg'`
- `variant`: `'default' | 'error' | 'success'` (or custom string)
- `label`: `string | null`
- `placeholder`: `string`
- `required`: `boolean`
- `disabled`: `boolean`
- `clearable`: `boolean`
- `borderRadius`: `string`
- `info`: `string | null` (helper text)
- `error`: `string | null` (error message)
- `showError`: `boolean`
- `config`: `InputConfig` (DRY configuration object)

**Dynamic Theming:** Adapts to your Tailwind theme, supports custom border radius and color variants.

### Autocomplete (`ntv-autocomplete`)
Advanced searchable dropdown with filtering, grouping, and dynamic theming.

**Properties:**
- `data`: `AutocompleteOption[] | AutocompleteGroup[]`
- `placeholder`: `string`
- `searchable`: `boolean`
- `clearable`: `boolean`
- `multiple`: `boolean`
- `maxSelections`: `number`
- `minSearchLength`: `number`
- `debounceTime`: `number`
- `noResultsText`: `string`
- `loadingText`: `string`
- `maxDisplayItems`: `number`
- `config`: `AutocompleteConfig` (DRY configuration object)

**Dynamic Theming:** Fully integrates with your Tailwind theme and supports custom styling.

### Card (`ntv-card`)
Flexible card container with advanced styling and dynamic theming.

**Properties:**
- `title`: `string`
- `subtitle`: `string`
- `variant`: `'default' | 'elevated' | 'outlined' | 'filled'`
- `rounded`: `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'`
- `shadow`: `'none' | 'sm' | 'md' | 'lg' | 'xl'`
- `backgroundColor`: `string` (custom background)
- `borderColor`: `string` (custom border)
- `gradient`: `string` (gradient background)
- `hoverEffect`: `boolean`
- `clickable`: `boolean`
- `fullWidth`: `boolean`
- `adaptToTheme`: `boolean`
- `config`: `CardConfig` (DRY configuration object)

**Dynamic Theming:** Supports custom colors, gradients, and automatically adapts to your theme configuration.

### Accordion (`ntv-accordion`)
Collapsible content component with animations and dynamic theming.

**Properties:**
- `variant`: `'default' | 'bordered' | 'flush'`
- `size`: `'sm' | 'md' | 'lg'`
- `animated`: `boolean`
- `showIcons`: `boolean`
- `initialOpen`: `boolean`
- `disabled`: `boolean`
- `group`: `string` (for accordion groups)
- `config`: `AccordionConfig` (DRY configuration object)

**Dynamic Theming:** Integrates with your Tailwind theme and supports custom styling patterns.

**Note:** Uses slot-based content projection with `[slot="header"]` and `[slot="body"]` for flexible content structure.

## 🎨 Styling & Theming

### 🎯 Dynamic Theming System

This library features a **powerful dynamic theming system** that automatically adapts to your Tailwind configuration:

- 🎨 **Auto-Theme Integration**: Components automatically inherit your `tailwind.config.js` theme settings
- 🌈 **Custom Color Support**: Use any hex color with `customColor` properties
- 📱 **Responsive Design**: All components are mobile-first and responsive
- 🔧 **DRY Configuration**: Reduce template verbosity with config objects
- ⚡ **Runtime Theming**: Change themes dynamically without rebuilds

### Tailwind CSS Dependency

This library is **built with Tailwind CSS** and requires it to function properly. The components use Tailwind utility classes for:

- ✅ **Responsive Design**: Mobile-first responsive layouts
- ✅ **Color Schemes**: Consistent color palette across components
- ✅ **Spacing & Typography**: Standardized spacing and text styles
- ✅ **Interactive States**: Hover, focus, and active states
- ✅ **Dynamic Theming**: Automatic integration with your theme configuration

### 🎨 Advanced Custom Theming

#### 1. Extend Your Tailwind Theme

Components automatically adapt to your Tailwind theme configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom brand colors - components will use these automatically
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // Custom semantic colors
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      borderRadius: {
        'custom': '12px',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }
    }
  }
}
```

#### 2. Dynamic Color Usage

```typescript
// Use predefined colors
<ntv-button color="blue" variant="primary">Blue Button</ntv-button>

// Use custom hex colors
<ntv-button 
  color="custom" 
  customColor="#ff6b35" 
  variant="primary">
  Custom Color
</ntv-button>

// Use config object for complex theming
<ntv-button [config]="{
  color: 'custom',
  customColor: '#8b5cf6',
  variant: 'outline',
  rounded: 'full',
  shadow: true
}">Themed Button</ntv-button>
```

#### 3. Component-Specific Theming

```typescript
// Card with custom styling
<ntv-card [config]="{
  variant: 'elevated',
  backgroundColor: '#f8fafc',
  borderColor: '#e2e8f0',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  rounded: 'xl',
  shadow: 'lg'
}">Custom Themed Card</ntv-card>

// Input with theme integration
<ntv-input [config]="{
  variant: 'success',
  size: 'lg',
  borderRadius: 'custom'
}">Themed Input</ntv-input>
```

### Dark Mode Support

Components fully support Tailwind's dark mode with modern Angular 20 integration.

#### 1. Configure Tailwind (Recommended: 'selector' strategy)

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'selector', // Modern approach (Tailwind 3.4+)
  // darkMode: 'class', // Legacy approach
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@ntv-scaffolding/component-pantry/**/*.{js,ts,html}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f1f5f9'
        }
      }
    }
  }
}
```

#### 2. Angular 20 Dark Mode Service (Modern Approach)

```typescript
// dark-mode.service.ts
import { Injectable, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private document = inject(DOCUMENT);
  
  // Signal-based state management
  isDarkMode = signal(false);
  
  constructor() {
    // Auto-detect system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);
    
    // Apply dark mode class when signal changes
    effect(() => {
      if (this.isDarkMode()) {
        this.document.documentElement.classList.add('dark');
      } else {
        this.document.documentElement.classList.remove('dark');
      }
    });
  }
  
  toggle() {
    this.isDarkMode.update(current => !current);
  }
}
```

#### 3. Usage in Components

```typescript
// app.component.ts
import { Component, inject } from '@angular/core';
import { DarkModeService } from './dark-mode.service';
import { Button } from '@ntv-scaffolding/component-pantry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Button],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <ntv-button 
        (click)="darkMode.toggle()"
        variant="primary">
        {{ darkMode.isDarkMode() ? '☀️ Light' : '🌙 Dark' }} Mode
      </ntv-button>
      
      <!-- Components automatically adapt to dark mode -->
      <ntv-card title="Dark Mode Card">
        <p>This card adapts to your theme preference!</p>
      </ntv-card>
    </div>
  `
})
export class AppComponent {
  darkMode = inject(DarkModeService);
}
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Components appear unstyled
**Problem**: Tailwind CSS is not properly configured.

**Solution**:
- Ensure Tailwind is installed: `npm list tailwindcss`
- Check that your `tailwind.config.js` includes the component library path
- Verify Tailwind directives are in your main CSS file

#### 2. Styles not updating
**Problem**: Tailwind is not detecting component library classes.

**Solution**:
```javascript
// Add this to your tailwind.config.js content array
"./node_modules/@ntv-scaffolding/component-pantry/**/*.{js,ts,html}"
```

#### 3. Build errors with Tailwind
**Problem**: PostCSS configuration issues.

**Solution**:
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### 4. Components not importing
**Problem**: Component import errors.

**Solution for Standalone Components (Recommended)**:
```typescript
// Import individual components
import { 
  Button, 
  Input, 
  Card 
} from '@ntv-scaffolding/component-pantry';

@Component({
  standalone: true,
  imports: [
    Button,
    Input,
    Card
  ]
})
```

**Solution for NgModule (Legacy)**:
```typescript
// Import the module
import { ComponentPantryModule } from '@ntv-scaffolding/component-pantry';

@NgModule({
  imports: [ComponentPantryModule]
})
```

### Getting Help

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/your-org/ntv-scaffolding/issues)
2. Review the [Tailwind CSS Documentation](https://tailwindcss.com/docs)
3. Contact the maintainer: efgbt17@gmail.com

## 📖 Documentation

- **Storybook**: [View interactive component documentation](https://your-storybook-url.com)
- **API Reference**: Detailed component APIs and examples
- **Design System**: Component design guidelines and usage patterns

## 🛠️ Development

### Running unit tests

```bash
nx test component-pantry
```

### Building the library

```bash
nx build component-pantry
```

### Running Storybook

```bash
nx storybook component-pantry
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@ntv-scaffolding/component-pantry)
- [GitHub Repository](https://github.com/your-org/ntv-scaffolding)
- [Issues](https://github.com/your-org/ntv-scaffolding/issues)

---

**Built with ❤️ using [Nx](https://nx.dev) and [Angular](https://angular.io)**
