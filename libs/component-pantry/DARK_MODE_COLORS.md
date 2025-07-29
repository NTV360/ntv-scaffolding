# Dark Mode Colors Guide

This document explains the dark mode color system available in the component library.

## Configuration

Dark modes is now configured using Tailwind's class-based approach (`darkMode: 'class'`) instead of media queries. This allows for programmatic control of dark mode.

## Available Dark Mode Colors

The following custom colors are available for dark mode styling:

### Background Colors

- `dark-bg-primary` - Main dark background (#1f2937 - gray-800)
- `dark-bg-secondary` - Secondary dark background (#374151 - gray-700)
- `dark-bg-tertiary` - Tertiary dark background (#4b5563 - gray-600)

### Text Colors

- `dark-text-primary` - Primary text color (#f9fafb - gray-50)
- `dark-text-secondary` - Secondary text color (#e5e7eb - gray-200)
- `dark-text-tertiary` - Tertiary text color (#d1d5db - gray-300)
- `dark-text-muted` - Muted text color (#9ca3af - gray-400)

### Border Colors

- `dark-border-primary` - Primary border color (#4b5563 - gray-600)
- `dark-border-secondary` - Secondary border color (#6b7280 - gray-500)

### Accent Colors

- `dark-accent-primary` - Primary accent color (#3b82f6 - blue-500)
- `dark-accent-secondary` - Secondary accent color (#1d4ed8 - blue-700)
- `dark-accent-hover` - Hover accent color (#2563eb - blue-600)

## Global Text Color Utilities

The component library now includes global text color utilities that automatically adjust based on the current theme:

- `.text-primary` - Main content text (dark gray in light mode, light gray in dark mode)
- `.text-secondary` - Supporting content text (medium gray in light mode, lighter gray in dark mode)
- `.text-tertiary` - Less important content text (light gray in light mode, medium light gray in dark mode)
- `.text-muted` - Subtle content like placeholders (very light gray in light mode, medium gray in dark mode)
- `.text-inverted` - For use on colored backgrounds (white in light mode, dark gray in dark mode)
- `.text-auto` - Automatically contrasts with background (dark gray in light mode, very light gray in dark mode)

## Usage Examples

### Using Global Text Color Classes

```html
<!-- Using global text utilities -->
<div class="bg-white dark:bg-dark-bg-primary">
  <h1 class="text-primary">Main Heading</h1>
  <p class="text-secondary">Supporting paragraph text</p>
  <small class="text-muted">Less important details</small>
</div>
```

### Using with Tailwind Classes

```html
<!-- Background -->
<div class="bg-white dark:bg-dark-bg-primary">
  <!-- Text -->
  <p class="text-gray-900 dark:text-dark-text-primary">Primary text</p>
  <p class="text-gray-600 dark:text-dark-text-secondary">Secondary text</p>

  <!-- Borders -->
  <div class="border border-gray-300 dark:border-dark-border-primary">
    <!-- Accent elements -->
    <button class="bg-blue-500 dark:bg-dark-accent-primary hover:bg-blue-600 dark:hover:bg-dark-accent-hover">Click me</button>
  </div>
</div>
```

### Enabling Dark Mode

To enable dark mode, add the `dark` class to your root element:

```html
<html class="dark">
  <!-- Your app content -->
</html>
```

Or toggle it programmatically:

```javascript
// Enable dark mode
document.documentElement.classList.add('dark');

// Disable dark mode
document.documentElement.classList.remove('dark');

// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

## Migration from Media Query Approach

The autocomplete component has been updated to use these new colors instead of hardcoded media query styles. This provides:

1. **Better consistency** - All components use the same color palette
2. **Programmatic control** - Dark mode can be toggled via JavaScript
3. **Easier customization** - Colors are defined in one place (Tailwind config)
4. **Better maintainability** - No need to duplicate color values across components

## Customization

To customize the dark mode colors, update the `dark` color object in your `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      dark: {
        bg: {
          primary: '#your-color', // Custom primary background
          // ... other colors
        },
        // ... other color categories
      },
    },
  },
},
```
