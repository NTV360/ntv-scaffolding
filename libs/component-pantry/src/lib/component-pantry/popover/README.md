# Popover Component

A highly configurable popover component that supports multiple placement options, trigger methods, and customizable styling.

## Features

- ✅ 12 placement options (top, bottom, left, right with start/end variants)
- ✅ Click, hover, and manual trigger modes
- ✅ Customizable arrow indicator
- ✅ Click outside and escape key closing
- ✅ Responsive design with viewport boundary detection
- ✅ Dark mode support
- ✅ Accessibility features
- ✅ Content projection for flexible layouts
- ✅ Configuration pattern for cleaner templates

## Basic Usage

### Simple Click Trigger

```html
<!-- Button with click trigger -->
<button (click)="op.toggle($event)">Click to toggle popover</button>

<!-- Popover component with any content -->
<ntv-popover #op placement="bottom">
  <div>
    <h3>Popover Title</h3>
    <p>You can put any content you want here!</p>
  </div>
</ntv-popover>
```

### All Placement Options

```html
<!-- Top placements -->
<ntv-popover placement="top">Content</ntv-popover>
<ntv-popover placement="top-start">Content</ntv-popover>
<ntv-popover placement="top-end">Content</ntv-popover>

<!-- Bottom placements -->
<ntv-popover placement="bottom">Content</ntv-popover>
<ntv-popover placement="bottom-start">Content</ntv-popover>
<ntv-popover placement="bottom-end">Content</ntv-popover>

<!-- Left placements -->
<ntv-popover placement="left">Content</ntv-popover>
<ntv-popover placement="left-start">Content</ntv-popover>
<ntv-popover placement="left-end">Content</ntv-popover>

<!-- Right placements -->
<ntv-popover placement="right">Content</ntv-popover>
<ntv-popover placement="right-start">Content</ntv-popover>
<ntv-popover placement="right-end">Content</ntv-popover>
```

## Configuration Pattern

For cleaner templates when using multiple properties:

```html
<button (click)="popover.toggle($event)">Toggle</button>

<ntv-popover 
  #popover
  [config]="{
    placement: 'top',
    arrow: false,
    offset: 12,
    maxWidth: '400px',
    closeOnClickOutside: true
  }">
  <div class="custom-content">
    <h3>Configuration Example</h3>
    <p>This uses the config pattern for cleaner templates.</p>
  </div>
</ntv-popover>
```

## Component API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placement` | `PopoverPlacement` | `'bottom'` | Position of the popover relative to trigger |
| `offset` | `number` | `8` | Distance between popover and trigger element |
| `arrow` | `boolean` | `true` | Whether to show arrow indicator |
| `trigger` | `'click' \| 'hover' \| 'manual'` | `'manual'` | How the popover is triggered |
| `closeOnClickOutside` | `boolean` | `true` | Whether to close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Whether to close when pressing escape |
| `disabled` | `boolean` | `false` | Whether the popover is disabled |
| `maxWidth` | `string` | `'320px'` | Maximum width of the popover |
| `zIndex` | `number` | `1000` | Z-index for the popover |
| `config` | `PopoverConfig` | `undefined` | Configuration object for DRY usage |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `shown` | `void` | Emitted when popover is shown |
| `hidden` | `void` | Emitted when popover is hidden |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `toggle(event, triggerElement?)` | `Event, HTMLElement?` | Toggle popover visibility |
| `show(triggerElement?)` | `HTMLElement?` | Show the popover |
| `hide()` | - | Hide the popover |

### Placement Options

```typescript
type PopoverPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';
```

## Advanced Examples

### Rich Content with Actions

```html
<button (click)="richPopover.toggle($event)">User Profile</button>

<ntv-popover #richPopover placement="bottom" [config]="{ maxWidth: '400px' }">
  <div class="space-y-4">
    <div class="flex items-center space-x-3">
      <img src="avatar.jpg" class="w-10 h-10 rounded-full" alt="User">
      <div>
        <h3 class="font-semibold">John Doe</h3>
        <p class="text-sm text-gray-500">Software Engineer</p>
      </div>
    </div>
    
    <div class="border-t pt-3">
      <p class="text-sm mb-3">Experienced developer with expertise in Angular and TypeScript.</p>
      <div class="flex gap-2">
        <ntv-button variant="primary" size="sm">View Profile</ntv-button>
        <ntv-button variant="outline" size="sm">Send Message</ntv-button>
      </div>
    </div>
  </div>
</ntv-popover>
```

### Programmatic Control

```typescript
// In your component
export class MyComponent {
  @ViewChild('myPopover') popover!: Popover;
  
  showPopover() {
    this.popover.show();
  }
  
  hidePopover() {
    this.popover.hide();
  }
  
  onPopoverShown() {
    console.log('Popover is now visible');
  }
  
  onPopoverHidden() {
    console.log('Popover is now hidden');
  }
}
```

```html
<button (click)="showPopover()">Show</button>
<button (click)="hidePopover()">Hide</button>

<ntv-popover 
  #myPopover
  (shown)="onPopoverShown()"
  (hidden)="onPopoverHidden()">
  <p>Programmatically controlled popover</p>
</ntv-popover>
```

## Styling

The component uses Tailwind CSS classes and supports dark mode out of the box. You can customize the appearance by:

1. **Using CSS custom properties** for colors and spacing
2. **Overriding Tailwind classes** in your global styles
3. **Using the `maxWidth` property** to control popover size
4. **Customizing content** with your own CSS classes

## Accessibility

- ✅ Proper ARIA attributes (`role="tooltip"`, `aria-hidden`)
- ✅ Keyboard navigation (Escape key to close)
- ✅ Focus management
- ✅ High contrast mode support
- ✅ Reduced motion support

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Import

```typescript
import { Popover } from '@ntv-scaffolding/component-pantry';

@Component({
  imports: [Popover],
  // ...
})
export class MyComponent {}
```