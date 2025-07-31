# Accordion Component Usage Examples

The Accordion component is a simple, highly configurable component that provides collapsible content panels with smooth animations and accessibility features using ng-content projections.

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { Accordion } from '@ntv/component-pantry';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Accordion],
  template: `
    <ntv-accordion variant="bordered" (accordionToggle)="onAccordionToggle($event)">
      <div slot="header">
        <div class="flex items-center space-x-2">
          <span>📚</span>
          <span class="font-medium">Getting Started</span>
        </div>
      </div>
      <div slot="body">
        <p>Learn the basics of our platform and how to get up and running quickly.</p>
      </div>
    </ntv-accordion>
  `,
})
export class ExampleComponent {
  onAccordionToggle(isOpen: boolean) {
    console.log(`Accordion is now ${isOpen ? 'open' : 'closed'}`);
  }
}
```

## Configuration Object Pattern

For cleaner templates when using multiple properties:

```typescript
import { AccordionConfig } from '@ntv/component-pantry';

@Component({
  template: `
    <ntv-accordion [config]="accordionConfig">
      <div slot="header">Configuration Example</div>
      <div slot="body">This accordion uses a config object for cleaner templates.</div>
    </ntv-accordion>
  `,
})
export class ConfigExampleComponent {
  accordionConfig: AccordionConfig = {
    variant: 'bordered',
    size: 'lg',
    animated: true,
    showIcons: true,
    initialOpen: false,
  };
}
```

## Variants

### Default Variant

```html
<ntv-accordion variant="default">
  <div slot="header">Default Header</div>
  <div slot="body">Default content with standard styling.</div>
</ntv-accordion>
```

### Bordered Variant

```html
<ntv-accordion variant="bordered">
  <div slot="header">Bordered Header</div>
  <div slot="body">Bordered content with enhanced visual separation.</div>
</ntv-accordion>
```

### Flush Variant

```html
<ntv-accordion variant="flush">
  <div slot="header">Flush Header</div>
  <div slot="body">Flush content with minimal styling.</div>
</ntv-accordion>
```

## Sizes

```html
<!-- Small -->
<ntv-accordion size="sm">
  <div slot="header">Small Header</div>
  <div slot="body">Compact content with smaller padding.</div>
</ntv-accordion>

<!-- Medium (default) -->
<ntv-accordion size="md">
  <div slot="header">Medium Header</div>
  <div slot="body">Standard content with default padding.</div>
</ntv-accordion>

<!-- Large -->
<ntv-accordion size="lg">
  <div slot="header">Large Header</div>
  <div slot="body">Spacious content with larger padding.</div>
</ntv-accordion>
```

## Advanced Features

### Exclusive Groups

```html
<!-- Only one accordion in the group can be open at a time -->
<ntv-accordion group="setup-wizard" variant="bordered">
  <div slot="header">Step 1: Configuration</div>
  <div slot="body">Configure your settings here.</div>
</ntv-accordion>

<ntv-accordion group="setup-wizard" variant="bordered">
  <div slot="header">Step 2: Installation</div>
  <div slot="body">Install the components.</div>
</ntv-accordion>

<ntv-accordion group="setup-wizard" variant="bordered">
  <div slot="header">Step 3: Verification</div>
  <div slot="body">Verify your installation.</div>
</ntv-accordion>
```

### Without Icons

```html
<ntv-accordion [showIcons]="false" variant="bordered">
  <div slot="header">Clean Header</div>
  <div slot="body">Content without expand/collapse icons.</div>
</ntv-accordion>
```

### Disable Animations

```html
<ntv-accordion [animated]="false" variant="bordered">
  <div slot="header">Instant Toggle</div>
  <div slot="body">Content appears instantly without animation.</div>
</ntv-accordion>
```

### Initially Open

```html
<ntv-accordion [initialOpen]="true" variant="bordered">
  <div slot="header">Pre-opened Content</div>
  <div slot="body">This accordion starts in the open state.</div>
</ntv-accordion>
```

## Rich Content Support

The accordion supports any Angular content through ng-content projection:

```html
<ntv-accordion variant="bordered">
  <div slot="header">
    <div class="flex items-center space-x-2">
      <span class="text-blue-600">🎨</span>
      <span class="font-medium">Rich Content Example</span>
    </div>
  </div>
  <div slot="body">
    <h4 class="font-semibold mb-2">Features Include:</h4>
    <ul class="list-disc list-inside space-y-1">
      <li>Full Angular component support</li>
      <li>Data binding and event handling</li>
      <li>Custom CSS classes and styling</li>
      <li>Interactive elements</li>
    </ul>
    <div class="bg-blue-50 p-3 rounded-lg mt-3"><strong>Note:</strong> Content is fully interactive Angular content</div>
    <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded" (click)="handleClick()">Interactive Button</button>
  </div>
</ntv-accordion>
```

## Multiple Accordions

```html
<!-- Independent accordions -->
<div class="space-y-4">
  <ntv-accordion variant="bordered">
    <div slot="header">First Accordion</div>
    <div slot="body">This accordion works independently.</div>
  </ntv-accordion>

  <ntv-accordion variant="bordered">
    <div slot="header">Second Accordion</div>
    <div slot="body">This accordion also works independently.</div>
  </ntv-accordion>
</div>

<!-- Grouped accordions (exclusive) -->
<div class="space-y-4">
  <ntv-accordion group="faq" variant="bordered">
    <div slot="header">FAQ Item 1</div>
    <div slot="body">Only one FAQ can be open at a time.</div>
  </ntv-accordion>

  <ntv-accordion group="faq" variant="bordered">
    <div slot="header">FAQ Item 2</div>
    <div slot="body">Opening this will close the other FAQ items.</div>
  </ntv-accordion>
</div>
```

## Event Handling

```typescript
export class EventExampleComponent {
  onItemToggle(event: { item: AccordionItem; isOpen: boolean }) {
    // Handle individual item toggle
    if (event.isOpen) {
      console.log(`Opened: ${event.item.title}`);
      // Perform actions when item opens
    } else {
      console.log(`Closed: ${event.item.title}`);
      // Perform actions when item closes
    }
  }

  onStateChange(items: AccordionItem[]) {
    // Handle overall state changes
    const openItems = items.filter((item) => item.isOpen);
    console.log(`${openItems.length} items are currently open`);

    // Save state to localStorage
    localStorage.setItem('accordionState', JSON.stringify(items));
  }
}
```

## Accessibility Features

The accordion component includes built-in accessibility features:

- **ARIA attributes**: Proper `aria-expanded`, `aria-controls`, and `aria-labelledby` attributes
- **Keyboard navigation**: Full keyboard support for navigation and interaction
- **Screen reader support**: Semantic HTML structure with proper roles
- **Focus management**: Visible focus indicators and logical tab order
- **High contrast support**: Enhanced visibility in high contrast mode
- **Reduced motion support**: Respects user's motion preferences

## Styling Customization

The component uses CSS custom properties and Tailwind classes. You can override styles:

```css
/* Custom accordion styles */
.accordion {
  --accordion-border-color: #e5e7eb;
  --accordion-bg-color: #ffffff;
  --accordion-text-color: #374151;
}

/* Dark mode customization */
@media (prefers-color-scheme: dark) {
  .accordion {
    --accordion-border-color: #4b5563;
    --accordion-bg-color: #1f2937;
    --accordion-text-color: #f9fafb;
  }
}
```

## Best Practices

1. **Unique IDs**: Always provide unique `id` values for each accordion item
2. **Meaningful Titles**: Use descriptive titles that clearly indicate the content
3. **Content Length**: Keep content concise but informative
4. **Initial State**: Consider which items should be open by default
5. **Event Handling**: Use events to track user interactions and save state
6. **Accessibility**: Test with screen readers and keyboard navigation
7. **Performance**: For large lists, consider virtual scrolling or pagination

## TypeScript Interfaces

```typescript
interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
  disabled?: boolean;
}

interface AccordionConfig {
  variant?: 'default' | 'bordered' | 'flush';
  size?: 'sm' | 'md' | 'lg';
  allowMultiple?: boolean;
  collapsible?: boolean;
  animated?: boolean;
  showIcons?: boolean;
}
```
