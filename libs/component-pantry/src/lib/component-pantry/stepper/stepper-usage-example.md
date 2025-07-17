# Stepper Component - Usage Examples

## ✨ Comprehensive Stepper Component

A flexible stepper component that supports multiple variants, orientations, and interactive features for creating step-by-step workflows.

## Basic Usage

```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="default"
  (stepClick)="onStepClick($event)"
  (stepChange)="onStepChange($event)">
</ntv-stepper>
```

## Component Setup

```typescript
import { StepData, StepClickEvent } from '@ntv-scaffolding/component-pantry';

@Component({
  // ...
})
export class MyComponent {
  // Define your step data
  stepData: StepData[] = [
    {
      id: '1',
      label: 'Personal Info',
      description: 'Enter your personal details',
      completed: true
    },
    {
      id: '2',
      label: 'Account Setup',
      description: 'Create your account credentials',
      error: false
    },
    {
      id: '3',
      label: 'Billing Info',
      description: 'Add payment method',
      disabled: false
    },
    {
      id: '4',
      label: 'Confirmation',
      description: 'Review and confirm'
    }
  ];
  
  activeStep = 1;
  
  onStepClick(event: StepClickEvent) {
    console.log('Step clicked:', event.step, 'Index:', event.index);
    this.activeStep = event.index;
  }
  
  onStepChange(stepIndex: number) {
    console.log('Step changed to:', stepIndex);
    this.activeStep = stepIndex;
  }
}
```

## Stepper Variants

### Default Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="default"
  [showLabels]="true">
</ntv-stepper>
```

### Progress Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="progress"
  [showLabels]="true">
</ntv-stepper>
```

### Detailed Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="detailed"
  [showLabels]="true"
  [showDescriptions]="true">
</ntv-stepper>
```

### Vertical Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="vertical"
  orientation="vertical"
  [showLabels]="true"
  [showDescriptions]="true">
</ntv-stepper>
```

### Panel Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="panel"
  [showLabels]="true">
</ntv-stepper>
```

### Breadcrumb Stepper
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="breadcrumb"
  [showLabels]="true">
</ntv-stepper>
```

## Interactive Features

### Clickable Steps
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="default"
  [clickable]="true"
  [allowSkipping]="true"
  (stepClick)="onStepClick($event)"
  (stepChange)="onStepChange($event)">
</ntv-stepper>
```

### With Error States
```typescript
export class MyComponent {
  stepDataWithErrors: StepData[] = [
    {
      id: '1',
      label: 'Personal Info',
      description: 'Enter your details',
      completed: true
    },
    {
      id: '2',
      label: 'Account Setup',
      description: 'Create account',
      error: true // Error state
    },
    {
      id: '3',
      label: 'Confirmation',
      description: 'Review info',
      disabled: true // Disabled state
    }
  ];
}
```

## Color Customization

### Custom Color Themes
```html
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  variant="default"
  stepperColor="primary"
  labelColor="accent"
  descriptionColor="neutral">
</ntv-stepper>
```

### Available Colors
```typescript
type ColorVariant = 
  | 'primary'     // #091635
  | 'accent'      // #8DCB2C
  | 'success'     // #3ADB30
  | 'warning'     // #FFA500
  | 'danger'      // #E73535
  | 'info'        // #095AF3
  | 'white'
  | 'neutral'
  | 'neutral-dark';
```

## Size Variants

```html
<!-- Small stepper -->
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  size="sm">
</ntv-stepper>

<!-- Medium stepper (default) -->
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  size="md">
</ntv-stepper>

<!-- Large stepper -->
<ntv-stepper
  [steps]="stepData"
  [currentStep]="activeStep"
  size="lg">
</ntv-stepper>
```

## Form Integration Example

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  template: `
    <ntv-stepper
      [steps]="formSteps"
      [currentStep]="currentFormStep"
      variant="detailed"
      [clickable]="true"
      [showLabels]="true"
      [showDescriptions]="true"
      (stepClick)="navigateToStep($event)">
    </ntv-stepper>
    
    <form [formGroup]="multiStepForm" (ngSubmit)="onSubmit()">
      <!-- Step content based on currentFormStep -->
      <div [ngSwitch]="currentFormStep">
        <div *ngSwitchCase="0">
          <!-- Personal Info Form -->
        </div>
        <div *ngSwitchCase="1">
          <!-- Account Setup Form -->
        </div>
        <div *ngSwitchCase="2">
          <!-- Billing Info Form -->
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" (click)="previousStep()" [disabled]="currentFormStep === 0">
          Previous
        </button>
        <button type="button" (click)="nextStep()" [disabled]="currentFormStep === formSteps.length - 1">
          Next
        </button>
        <button type="submit" *ngIf="currentFormStep === formSteps.length - 1">
          Submit
        </button>
      </div>
    </form>
  `
})
export class MultiStepFormComponent {
  currentFormStep = 0;
  
  formSteps: StepData[] = [
    {
      id: 'personal',
      label: 'Personal Information',
      description: 'Basic details about you'
    },
    {
      id: 'account',
      label: 'Account Setup',
      description: 'Create your account'
    },
    {
      id: 'billing',
      label: 'Billing Information',
      description: 'Payment and billing details'
    }
  ];
  
  multiStepForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.multiStepForm = this.fb.group({
      // Form controls for all steps
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cardNumber: ['', Validators.required]
    });
  }
  
  navigateToStep(event: StepClickEvent) {
    // Validate current step before allowing navigation
    if (this.validateCurrentStep()) {
      this.currentFormStep = event.index;
      this.updateStepStates();
    }
  }
  
  nextStep() {
    if (this.validateCurrentStep() && this.currentFormStep < this.formSteps.length - 1) {
      this.currentFormStep++;
      this.updateStepStates();
    }
  }
  
  previousStep() {
    if (this.currentFormStep > 0) {
      this.currentFormStep--;
      this.updateStepStates();
    }
  }
  
  validateCurrentStep(): boolean {
    // Add validation logic for current step
    return true;
  }
  
  updateStepStates() {
    this.formSteps = this.formSteps.map((step, index) => ({
      ...step,
      completed: index < this.currentFormStep,
      error: false // Update based on validation
    }));
  }
  
  onSubmit() {
    if (this.multiStepForm.valid) {
      console.log('Form submitted:', this.multiStepForm.value);
    }
  }
}
```

## Advanced Usage

### Dynamic Step Management
```typescript
export class DynamicStepperComponent {
  steps: StepData[] = [];
  currentStep = 0;
  
  addStep(label: string, description?: string) {
    const newStep: StepData = {
      id: `step-${this.steps.length + 1}`,
      label,
      description
    };
    this.steps = [...this.steps, newStep];
  }
  
  removeStep(index: number) {
    this.steps = this.steps.filter((_, i) => i !== index);
    if (this.currentStep >= this.steps.length) {
      this.currentStep = Math.max(0, this.steps.length - 1);
    }
  }
  
  markStepAsCompleted(index: number) {
    this.steps = this.steps.map((step, i) => 
      i === index ? { ...step, completed: true } : step
    );
  }
  
  markStepAsError(index: number) {
    this.steps = this.steps.map((step, i) => 
      i === index ? { ...step, error: true } : step
    );
  }
}
```

## Benefits

✅ **Multiple variants** for different use cases  
✅ **Flexible orientation** (horizontal/vertical)  
✅ **Interactive navigation** with click events  
✅ **State management** (completed, active, error, disabled)  
✅ **Customizable colors** and sizes  
✅ **Form integration** friendly  
✅ **Accessibility** support with ARIA labels  
✅ **Responsive design** for mobile and desktop  
✅ **TypeScript support** with full type safety

## Configuration Options

```typescript
interface StepData {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  disabled?: boolean;
  error?: boolean;
}

type StepperVariant = 
  | 'default'
  | 'progress'
  | 'detailed'
  | 'panel'
  | 'vertical'
  | 'vertical-reverse'
  | 'breadcrumb'
  | 'form'
  | 'icon'
  | 'numbered';

type StepperOrientation = 'horizontal' | 'vertical';
type StepperSize = 'sm' | 'md' | 'lg';
```

## Events

```typescript
interface StepClickEvent {
  step: StepData;
  index: number;
}

// Component outputs
@Output() stepClick = new EventEmitter<StepClickEvent>();
@Output() stepChange = new EventEmitter<number>();
```