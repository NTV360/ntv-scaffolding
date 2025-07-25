# Animated Progress Stepper Example

The stepper component now supports animated progress lines for vertical and vertical-reverse variants. When a step is completed, the connecting line will animate from top to bottom, creating a smooth visual progression effect.

## Basic Usage

```html
<!-- Vertical stepper with animation -->
<ntv-stepper
  [steps]="steps"
  [currentStep]="currentStep"
  variant="vertical"
  [animateProgress]="true"
  [clickable]="true">
</ntv-stepper>

<!-- Vertical-reverse stepper with animation -->
<ntv-stepper
  [steps]="steps"
  [currentStep]="currentStep"
  variant="vertical-reverse"
  [animateProgress]="true"
  [clickable]="true">
</ntv-stepper>
```

## Using Config Object

```html
<!-- Using config for cleaner templates -->
<ntv-stepper
  [steps]="steps"
  [currentStep]="currentStep"
  [config]="stepperConfig">
</ntv-stepper>
```

```typescript
// Component
export class MyComponent {
  stepperConfig: StepperConfig = {
    variant: 'vertical-reverse',
    animateProgress: true,
    clickable: true,
    stepperColor: 'accent',
    showDescriptions: true
  };

  steps: StepData[] = [
    { id: '1', label: 'Personal Info', description: 'Enter your details' },
    { id: '2', label: 'Address', description: 'Provide your address' },
    { id: '3', label: 'Payment', description: 'Payment information' },
    { id: '4', label: 'Review', description: 'Review and submit' }
  ];

  currentStep = 0;

  onStepComplete() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
}
```

## Animation Features

### Basic Animation
- **Duration**: 0.8 seconds
- **Easing**: ease-in-out
- **Effect**: Line grows from 0 to full height with opacity transition

### Enhanced Animation (with `step__connector--animated` class)
- **Duration**: 1 second
- **Easing**: ease-in-out
- **Effect**: Gradient background with glow effect and scale transformation
- **Visual**: More pronounced animation with shadow and gradient

## Customization

The animation automatically applies to:
- ✅ Vertical steppers (`variant="vertical"`)
- ✅ Vertical-reverse steppers (`variant="vertical-reverse"`)
- ❌ Horizontal steppers (no animation support)

## CSS Classes Applied

When `animateProgress` is enabled:
- `.step__connector--vertical-completed` gets `animation: progressLineDown 0.8s ease-in-out`
- `.step__connector--vertical-reverse-completed` gets `animation: progressLineDown 0.8s ease-in-out`
- `.step__connector--animated` adds enhanced gradient animation

## Performance Notes

- Animations are CSS-based for optimal performance
- Only completed steps trigger animations
- Animations respect `prefers-reduced-motion` accessibility settings
- No JavaScript animation loops - pure CSS transitions