# Popover Component Usage Examples

The Popover component is a feature-rich, highly configurable component that provides contextual overlays with flexible positioning, multiple trigger types, and accessibility features using ng-content projection.

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { Popover } from '@ntv/component-pantry';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Popover],
  template: `
    <ntv-popover 
      placement="top"
      trigger="click"
      variant="bordered"
      (popoverToggle)="onPopoverToggle($event)">
      <button slot="trigger" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Click me
      </button>
      <div slot="content">
        <div class="flex items-center space-x-2">
          <span>💡</span>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Quick Tip</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">This is a helpful popover with useful information.</p>
          </div>
        </div>
      </div>
    </ntv-popover>
  `
})
export class ExampleComponent {
  onPopoverToggle(isVisible: boolean) {
    console.log(`Popover is now ${isVisible ? 'visible' : 'hidden'}`);
  }
}
```

## Configuration Object Pattern

For cleaner templates when using multiple properties:

```typescript
import { PopoverConfig } from '@ntv/component-pantry';

@Component({
  template: `
    <ntv-popover [config]="popoverConfig">
      <span slot="trigger" class="text-blue-500 underline cursor-pointer">
        Hover for info
      </span>
      <div slot="content">
        <p class="text-sm">This popover uses a config object for cleaner templates.</p>
      </div>
    </ntv-popover>
  `
})
export class ConfigExampleComponent {
  popoverConfig: PopoverConfig = {
    placement: 'top',
    trigger: 'hover',
    variant: 'shadow',
    size: 'lg',
    showArrow: true,
    delay: 300,
    closeOnClickOutside: true,
    closeOnEscape: true
  };
}
```

## Variants

### Default Variant
```html
<ntv-popover variant="default" placement="bottom">
  <button slot="trigger" class="btn btn-primary">Default Popover</button>
  <div slot="content">
    <p>Standard popover with default styling.</p>
  </div>
</ntv-popover>
```

### Bordered Variant
```html
<ntv-popover variant="bordered" placement="top">
  <button slot="trigger" class="btn btn-secondary">Bordered Popover</button>
  <div slot="content">
    <p>Popover with enhanced border styling.</p>
  </div>
</ntv-popover>
```

### Shadow Variant
```html
<ntv-popover variant="shadow" placement="right">
  <button slot="trigger" class="btn btn-accent">Shadow Popover</button>
  <div slot="content">
    <p>Popover with enhanced shadow effects.</p>
  </div>
</ntv-popover>
```

### Minimal Variant
```html
<ntv-popover variant="minimal" placement="left">
  <button slot="trigger" class="btn btn-ghost">Minimal Popover</button>
  <div slot="content">
    <p>Clean, minimal popover design.</p>
  </div>
</ntv-popover>
```

## Sizes

```html
<!-- Small -->
<ntv-popover size="sm" placement="top">
  <button slot="trigger">Small</button>
  <div slot="content">Compact content</div>
</ntv-popover>

<!-- Medium (default) -->
<ntv-popover size="md" placement="top">
  <button slot="trigger">Medium</button>
  <div slot="content">Standard content size</div>
</ntv-popover>

<!-- Large -->
<ntv-popover size="lg" placement="top">
  <button slot="trigger">Large</button>
  <div slot="content">More spacious content area</div>
</ntv-popover>

<!-- Extra Large -->
<ntv-popover size="xl" placement="top">
  <button slot="trigger">Extra Large</button>
  <div slot="content">Maximum content space for detailed information</div>
</ntv-popover>
```

## Placement Options

### Basic Placements
```html
<!-- Top -->
<ntv-popover placement="top">
  <button slot="trigger">Top</button>
  <div slot="content">Content appears above</div>
</ntv-popover>

<!-- Bottom -->
<ntv-popover placement="bottom">
  <button slot="trigger">Bottom</button>
  <div slot="content">Content appears below</div>
</ntv-popover>

<!-- Left -->
<ntv-popover placement="left">
  <button slot="trigger">Left</button>
  <div slot="content">Content appears to the left</div>
</ntv-popover>

<!-- Right -->
<ntv-popover placement="right">
  <button slot="trigger">Right</button>
  <div slot="content">Content appears to the right</div>
</ntv-popover>
```

### Advanced Placements
```html
<!-- Top with alignment -->
<ntv-popover placement="top-start">
  <button slot="trigger">Top Start</button>
  <div slot="content">Aligned to start</div>
</ntv-popover>

<ntv-popover placement="top-end">
  <button slot="trigger">Top End</button>
  <div slot="content">Aligned to end</div>
</ntv-popover>

<!-- Bottom with alignment -->
<ntv-popover placement="bottom-start">
  <button slot="trigger">Bottom Start</button>
  <div slot="content">Aligned to start</div>
</ntv-popover>

<ntv-popover placement="bottom-end">
  <button slot="trigger">Bottom End</button>
  <div slot="content">Aligned to end</div>
</ntv-popover>
```

## Trigger Types

### Click Trigger
```html
<ntv-popover trigger="click" placement="top">
  <button slot="trigger" class="btn btn-primary">Click to toggle</button>
  <div slot="content">
    <h4 class="font-semibold mb-2">Click Trigger</h4>
    <p>Click the button to show/hide this popover.</p>
  </div>
</ntv-popover>
```

### Hover Trigger
```html
<ntv-popover trigger="hover" placement="top" [delay]="300">
  <span slot="trigger" class="text-blue-500 underline cursor-help">
    Hover me
  </span>
  <div slot="content">
    <h4 class="font-semibold mb-2">Hover Trigger</h4>
    <p>This appears when you hover over the trigger.</p>
  </div>
</ntv-popover>
```

### Focus Trigger
```html
<ntv-popover trigger="focus" placement="top">
  <input slot="trigger" 
         type="text" 
         placeholder="Focus me" 
         class="border rounded px-3 py-2">
  <div slot="content">
    <h4 class="font-semibold mb-2">Focus Trigger</h4>
    <p>This appears when the input receives focus.</p>
  </div>
</ntv-popover>
```

### Manual Trigger
```typescript
@Component({
  template: `
    <ntv-popover #manualPopover trigger="manual" placement="top">
      <button slot="trigger" class="btn btn-secondary">Manual Control</button>
      <div slot="content">
        <h4 class="font-semibold mb-2">Manual Trigger</h4>
        <p>Controlled programmatically.</p>
      </div>
    </ntv-popover>
    
    <div class="mt-4 space-x-2">
      <button (click)="manualPopover.show()" class="btn btn-sm btn-success">
        Show
      </button>
      <button (click)="manualPopover.hide()" class="btn btn-sm btn-error">
        Hide
      </button>
      <button (click)="manualPopover.toggle()" class="btn btn-sm btn-info">
        Toggle
      </button>
    </div>
  `
})
export class ManualTriggerComponent {}
```

## Advanced Features

### Rich Content
```html
<ntv-popover placement="bottom" size="lg" variant="shadow">
  <button slot="trigger" class="btn btn-primary">
    User Profile
  </button>
  <div slot="content">
    <div class="flex items-start space-x-3">
      <img src="/avatar.jpg" alt="User" class="w-12 h-12 rounded-full">
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white">John Doe</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">Software Engineer</p>
        <div class="mt-2 flex space-x-2">
          <button class="btn btn-xs btn-primary">View Profile</button>
          <button class="btn btn-xs btn-secondary">Send Message</button>
        </div>
      </div>
    </div>
  </div>
</ntv-popover>
```

### Custom Offset and Delay
```html
<ntv-popover 
  placement="top" 
  trigger="hover" 
  [offset]="16" 
  [delay]="500">
  <button slot="trigger">Delayed Hover</button>
  <div slot="content">
    <p>This popover has custom offset and delay settings.</p>
  </div>
</ntv-popover>
```

### Without Arrow
```html
<ntv-popover placement="top" [showArrow]="false">
  <button slot="trigger">No Arrow</button>
  <div slot="content">
    <p>This popover doesn't show an arrow indicator.</p>
  </div>
</ntv-popover>
```

### Disabled State
```html
<ntv-popover placement="top" [disabled]="true">
  <button slot="trigger" class="btn btn-disabled">Disabled</button>
  <div slot="content">
    <p>This popover is disabled and won't show.</p>
  </div>
</ntv-popover>
```

## Event Handling

```typescript
@Component({
  template: `
    <ntv-popover 
      placement="top"
      (popoverShow)="onShow()"
      (popoverHide)="onHide()"
      (popoverToggle)="onToggle($event)">
      <button slot="trigger">Event Example</button>
      <div slot="content">
        <p>Check the console for event logs.</p>
      </div>
    </ntv-popover>
  `
})
export class EventExampleComponent {
  onShow() {
    console.log('Popover shown');
  }
  
  onHide() {
    console.log('Popover hidden');
  }
  
  onToggle(isVisible: boolean) {
    console.log('Popover toggled:', isVisible);
  }
}
```

## Accessibility Features

The popover component includes built-in accessibility features:

- **ARIA attributes**: Proper `aria-describedby`, `aria-expanded`, and `aria-hidden` attributes
- **Keyboard navigation**: Escape key to close, focus management
- **Screen reader support**: Semantic HTML and proper roles
- **High contrast support**: Adapts to high contrast mode preferences
- **Reduced motion support**: Respects user's motion preferences

## Styling Customization

The component uses CSS custom properties and Tailwind classes. You can override styles:

```css
/* Custom popover styles */
.popover {
  --popover-bg-color: #ffffff;
  --popover-border-color: #e5e7eb;
  --popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Dark mode customization */
@media (prefers-color-scheme: dark) {
  .popover {
    --popover-bg-color: #1f2937;
    --popover-border-color: #4b5563;
    --popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}

/* Custom variant */
.popover--custom {
  @apply bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0;
}
```

## Best Practices

1. **Choose appropriate triggers**: Use `click` for interactive content, `hover` for quick info, `focus` for form help
2. **Consider placement**: Ensure popovers don't get cut off by viewport edges
3. **Keep content concise**: Popovers work best with brief, focused content
4. **Test accessibility**: Ensure keyboard navigation and screen reader compatibility
5. **Responsive design**: Test on different screen sizes and adjust accordingly
6. **Performance**: Use manual triggers for complex content that doesn't need to be always ready

## Common Use Cases

- **Tooltips**: Quick information on hover
- **Help text**: Contextual assistance for form fields
- **User profiles**: Quick preview of user information
- **Action confirmations**: "Are you sure?" dialogs
- **Feature highlights**: Onboarding and feature discovery
- **Additional options**: Secondary actions and settings