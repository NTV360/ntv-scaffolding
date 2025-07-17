# Button Component - DRY Usage Examples

## ✨ NEW: Super DRY Usage with Config Object

### Before (Verbose):
```html
<lib-button 
  [variant]="buttonConfig.variant" 
  [size]="buttonConfig.size" 
  [color]="buttonConfig.color" 
  [customColor]="buttonConfig.customColor" 
  [disabled]="buttonConfig.disabled" 
  [loading]="buttonConfig.loading" 
  [fullWidth]="buttonConfig.fullWidth" 
  [rounded]="buttonConfig.rounded" 
  [shadow]="buttonConfig.shadow" 
  [type]="buttonConfig.type" 
  (buttonClick)="handleClick($event)"> 
  Submit Form 
</lib-button>
```

### After (DRY & Clean):
```html
<lib-button 
  [config]="buttonConfig" 
  (buttonClick)="handleClick($event)">
  Submit Form
</lib-button>
```

## Component Setup

```typescript
import { ButtonConfig } from './button.types';

@Component({
  // ...
})
export class MyComponent {
  // Define your button configuration
  buttonConfig: ButtonConfig = {
    variant: 'primary',
    size: 'lg',
    color: 'custom',
    customColor: '#ff6b35',
    disabled: false,
    loading: this.isProcessing,
    fullWidth: true,
    rounded: 'lg',
    shadow: true,
    type: 'submit'
  };
  
  isProcessing = false;
  
  handleClick(event: Event) {
    console.log('Button clicked!', event);
  }
}
```

## Multiple Button Configurations

```typescript
export class MyComponent {
  // Different button configs for different scenarios
  saveButtonConfig: ButtonConfig = {
    variant: 'primary',
    color: 'green',
    loading: this.isSaving,
    type: 'submit'
  };
  
  cancelButtonConfig: ButtonConfig = {
    variant: 'secondary',
    color: 'gray'
  };
  
  deleteButtonConfig: ButtonConfig = {
    variant: 'danger',
    color: 'red',
    loading: this.isDeleting
  };
}
```

```html
<div class="button-group">
  <lib-button [config]="saveButtonConfig" (buttonClick)="save()">Save</lib-button>
  <lib-button [config]="cancelButtonConfig" (buttonClick)="cancel()">Cancel</lib-button>
  <lib-button [config]="deleteButtonConfig" (buttonClick)="delete()">Delete</lib-button>
</div>
```

## Backward Compatibility

The component still supports individual properties for simple use cases:

```html
<!-- Simple usage -->
<lib-button>Click me</lib-button>

<!-- Individual properties still work -->
<lib-button variant="secondary" color="red">Delete</lib-button>

<!-- Mix config with individual overrides -->
<lib-button [config]="baseConfig" variant="danger">Override variant</lib-button>
```

## Benefits

✅ **90% less template code** when using all properties  
✅ **Type-safe** configuration objects  
✅ **Reusable** button configurations  
✅ **Backward compatible** with existing code  
✅ **Easy to maintain** and update  
✅ **Clean templates** that focus on content