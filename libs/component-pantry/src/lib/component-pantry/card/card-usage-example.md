# Card Component - Usage Examples

## ✨ NEW: Super DRY Usage with Config Object

### Before (Verbose):
```html
<ntv-card
  [variant]="'elevated'"
  [rounded]="'lg'"
  [shadow]="'md'"
  [backgroundColor]="'#f8fafc'"
  [borderColor]="'#e2e8f0'"
  [gradient]="''"
  [hoverEffect]="true"
  [clickable]="true"
  [fullWidth]="false"
  (cardClick)="onCardClick($event)">
  <div class="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</ntv-card>
```

### After (DRY & Clean):
```html
<ntv-card
  [config]="elevatedCardConfig"
  (cardClick)="onCardClick($event)">
  <div class="p-6">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </div>
</ntv-card>
```

## Component Setup

```typescript
import { CardConfig } from '@ntv/component-pantry';

@Component({
  // ...
})
export class MyComponent {
  // Define your card configuration
  elevatedCardConfig: CardConfig = {
    variant: 'elevated',
    rounded: 'lg',
    shadow: 'md',
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    hoverEffect: true,
    clickable: true,
    fullWidth: false
  };
  
  onCardClick(event: Event) {
    console.log('Card clicked:', event);
  }
}
```

## Multiple Card Configurations

```typescript
export class MyComponent {
  // Different card configs for different scenarios
  productCardConfig: CardConfig = {
    variant: 'elevated',
    shadow: 'lg',
    rounded: 'lg',
    hoverEffect: true,
    clickable: true
  };
  
  infoCardConfig: CardConfig = {
    variant: 'outlined',
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    rounded: 'md',
    hoverEffect: false,
    clickable: false
  };
  
  heroCardConfig: CardConfig = {
    variant: 'filled',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    shadow: 'xl',
    rounded: 'xl',
    fullWidth: true,
    hoverEffect: true
  };
  
  compactCardConfig: CardConfig = {
    variant: 'default',
    rounded: 'sm',
    shadow: 'sm'
  };
}
```

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Product Card -->
  <ntv-card 
    [config]="productCardConfig" 
    (cardClick)="onProductClick($event)">
    <div class="p-6">
      <img src="product.jpg" alt="Product" class="w-full h-48 object-cover mb-4 rounded">
      <h3 class="text-lg font-semibold mb-2">Product Name</h3>
      <p class="text-gray-600 mb-4">Product description goes here</p>
      <div class="text-xl font-bold text-blue-600">$99.99</div>
    </div>
  </ntv-card>
  
  <!-- Info Card -->
  <ntv-card [config]="infoCardConfig">
    <div class="p-6">
      <div class="flex items-center mb-4">
        <svg class="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <h3 class="text-lg font-semibold">Information</h3>
      </div>
      <p class="text-gray-700">This is an informational card with important details.</p>
    </div>
  </ntv-card>
  
  <!-- Hero Card -->
  <ntv-card [config]="heroCardConfig" class="md:col-span-2 lg:col-span-1">
    <div class="p-8 text-white text-center">
      <h2 class="text-2xl font-bold mb-4">Featured Content</h2>
      <p class="mb-6 opacity-90">Beautiful gradient card with enhanced styling</p>
      <button class="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Learn More
      </button>
    </div>
  </ntv-card>
</div>
```

## Backward Compatibility

The component still supports individual properties for simple use cases:

```html
<!-- Simple usage -->
<ntv-card>
  <div class="p-4">
    <p>Simple card content</p>
  </div>
</ntv-card>

<!-- Individual properties still work -->
<ntv-card 
  variant="elevated" 
  shadow="md" 
  rounded="lg">
  <div class="p-6">
    <h3>Individual Properties</h3>
  </div>
</ntv-card>

<!-- Mix config with individual overrides -->
<ntv-card 
  [config]="baseCardConfig" 
  variant="outlined">
  <div class="p-6">
    <p>Config with override</p>
  </div>
</ntv-card>
```

## Interactive Cards

```typescript
@Component({
  selector: 'app-interactive-cards',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ntv-card
        [config]="clickableCardConfig"
        (cardClick)="onActionClick('action1')">
        <div class="p-6 text-center">
          <div class="text-3xl mb-4">📊</div>
          <h3 class="font-semibold mb-2">Analytics</h3>
          <p class="text-gray-600">View your analytics dashboard</p>
        </div>
      </ntv-card>
      
      <ntv-card
        [config]="clickableCardConfig"
        (cardClick)="onActionClick('action2')">
        <div class="p-6 text-center">
          <div class="text-3xl mb-4">⚙️</div>
          <h3 class="font-semibold mb-2">Settings</h3>
          <p class="text-gray-600">Manage your preferences</p>
        </div>
      </ntv-card>
      
      <ntv-card
        [config]="clickableCardConfig"
        (cardClick)="onActionClick('action3')">
        <div class="p-6 text-center">
          <div class="text-3xl mb-4">👥</div>
          <h3 class="font-semibold mb-2">Team</h3>
          <p class="text-gray-600">Collaborate with your team</p>
        </div>
      </ntv-card>
    </div>
  `
})
export class InteractiveCardsComponent {
  clickableCardConfig: CardConfig = {
    variant: 'outlined',
    rounded: 'lg',
    hoverEffect: true,
    clickable: true,
    shadow: 'sm'
  };
  
  onActionClick(action: string) {
    console.log(`${action} card clicked`);
    // Navigate or perform action
  }
}
```

## Benefits

✅ **90% less template code** when using all properties  
✅ **Type-safe** configuration objects  
✅ **Reusable** card configurations  
✅ **Backward compatible** with existing code  
✅ **Easy to maintain** and update  
✅ **Clean templates** that focus on content  
✅ **Content-driven sizing** (no artificial constraints)  
✅ **Accessibility** features built-in  
✅ **Responsive design** support

## Basic Usage

```typescript
import { Card, CardConfig } from '@ntv/component-pantry';

@Component({
  selector: 'app-example',
  template: `
    <ntv-card
      [config]="cardConfig"
      (cardClick)="onCardClick($event)">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2">Card Title</h3>
        <p class="text-gray-600">This is a basic card example with clean configuration.</p>
      </div>
    </ntv-card>
  `
})
export class ExampleComponent {
  cardConfig: CardConfig = {
    variant: 'elevated',
    shadow: 'md',
    rounded: 'lg',
    hoverEffect: true
  };

  onCardClick(event: Event) {
    console.log('Card clicked:', event);
  }
}
```

## Card Variants

```html
<!-- Default Card -->
<ntv-card [config]="{ variant: 'default' }">
  <div class="p-6">
    <h3>Default Card</h3>
    <p>Basic card with minimal styling</p>
  </div>
</ntv-card>

<!-- Elevated Card -->
<ntv-card [config]="{ variant: 'elevated', shadow: 'lg' }">
  <div class="p-6">
    <h3>Elevated Card</h3>
    <p>Card with shadow elevation</p>
  </div>
</ntv-card>

<!-- Outlined Card -->
<ntv-card [config]="{ variant: 'outlined', borderColor: '#e2e8f0' }">
  <div class="p-6">
    <h3>Outlined Card</h3>
    <p>Card with border styling</p>
  </div>
</ntv-card>

<!-- Filled Card -->
<ntv-card [config]="{ variant: 'filled', backgroundColor: '#f1f5f9' }">
  <div class="p-6">
    <h3>Filled Card</h3>
    <p>Card with background fill</p>
  </div>
</ntv-card>
```

## Gradient Cards

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Blue Gradient -->
  <ntv-card [config]="{
    variant: 'filled',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    rounded: 'xl',
    shadow: 'lg'
  }">
    <div class="p-8 text-white">
      <h3 class="text-xl font-bold mb-4">Blue Gradient</h3>
      <p class="opacity-90">Beautiful blue to purple gradient</p>
    </div>
  </ntv-card>
  
  <!-- Sunset Gradient -->
  <ntv-card [config]="{
    variant: 'filled',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    rounded: 'xl',
    shadow: 'lg'
  }">
    <div class="p-8 text-white">
      <h3 class="text-xl font-bold mb-4">Sunset Gradient</h3>
      <p class="opacity-90">Warm sunset colors</p>
    </div>
  </ntv-card>
</div>
```

## Full-Width Cards

```html
<!-- Full-width hero card -->
<ntv-card [config]="{
  variant: 'elevated',
  fullWidth: true,
  shadow: 'xl',
  rounded: 'lg'
}">
  <div class="p-12 text-center">
    <h1 class="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Discover amazing features and capabilities with our comprehensive solution.
    </p>
    <div class="space-x-4">
      <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Get Started
      </button>
      <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
        Learn More
      </button>
    </div>
  </div>
</ntv-card>
```

## Configuration Options

```typescript
interface CardConfig {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';  // Visual variant
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';     // Border radius
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';              // Shadow intensity
  backgroundColor?: string;                                   // Custom background color
  borderColor?: string;                                       // Custom border color
  gradient?: string;                                          // CSS gradient background
  hoverEffect?: boolean;                                      // Enable hover effects
  clickable?: boolean;                                        // Make card clickable
  fullWidth?: boolean;                                        // Take full container width
}
```

## Accessibility Features

- **Keyboard Navigation**: Clickable cards support Enter and Space key activation
- **ARIA Attributes**: Proper role and aria-label for clickable cards
- **Focus Management**: Visual focus indicators for keyboard users
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Works with high contrast mode

## Responsive Design

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <ntv-card [config]="responsiveCardConfig" *ngFor="let item of items">
    <div class="p-4 sm:p-6">
      <h3 class="text-sm sm:text-base lg:text-lg font-semibold mb-2">{{ item.title }}</h3>
      <p class="text-xs sm:text-sm text-gray-600">{{ item.description }}</p>
    </div>
  </ntv-card>
</div>
```

## Events

```typescript
// Card click event (only when clickable is true)
(cardClick)="onCardClick($event)"
```

```typescript
onCardClick(event: Event) {
  console.log('Card clicked:', event);
  // Handle card click - navigation, modal, etc.
}
```

## Content-Driven Sizing

Cards automatically size based on their content without artificial constraints:

```html
<!-- Small content = small card -->
<ntv-card [config]="{ variant: 'outlined' }">
  <div class="p-4 text-center">
    <div class="text-2xl mb-2">📱</div>
    <div class="font-semibold">Mobile</div>
  </div>
</ntv-card>

<!-- Large content = large card -->
<ntv-card [config]="{ variant: 'outlined' }">
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Detailed Information</h2>
    <p class="mb-4">This card contains much more content and will naturally expand to accommodate it.</p>
    <ul class="list-disc list-inside space-y-2">
      <li>Feature one with detailed explanation</li>
      <li>Feature two with additional context</li>
      <li>Feature three with comprehensive details</li>
    </ul>
  </div>
</ntv-card>
```

## Best Practices

1. **Use Config Objects**: Prefer config objects for cards with multiple properties
2. **Consistent Spacing**: Use consistent padding classes (p-4, p-6, p-8)
3. **Semantic Content**: Structure content with proper headings and hierarchy
4. **Responsive Images**: Use responsive image classes for media content
5. **Hover States**: Enable hover effects for interactive cards
6. **Accessibility**: Always provide meaningful content for screen readers
7. **Performance**: Reuse config objects across similar cards