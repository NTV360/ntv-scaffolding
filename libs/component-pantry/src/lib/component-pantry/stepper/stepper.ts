import {
  Component,
  input,
  output,
  linkedSignal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  StepData,
  StepperVariant,
  StepperSize,
  ColorVariant,
  StepClickEvent,
  StepperConfig,
} from './stepper.types';

/**
 * A flexible stepper component that supports multiple variants and orientations.
 * Provides visual progress indication and step navigation functionality.
 *
 * @description A highly configurable stepper component that supports:
 * - Multiple visual variants (default, progress, detailed, panel, vertical, etc.)
 * - Layout direction determined by variant (vertical variants for vertical layout)
 * - Color customization with predefined color schemes
 * - Interactive step navigation with clickable steps
 * - Step state management (completed, active, disabled, error)
 * - DRY configuration pattern for reduced template verbosity
 * - Accessibility features and keyboard navigation
 * - Backward compatibility with individual properties
 *
 * @example
 * // Basic usage
 * <ntv-stepper
 *   [steps]="stepData"
 *   [currentStep]="activeStep"
 *   variant="progress"
 *   [clickable]="true"
 *   (stepClick)="onStepClick($event)"
 *   (stepChange)="onStepChange($event)">
 * </ntv-stepper>
 *
 * @example
 * // DRY config pattern
 * <ntv-stepper
 *   [steps]="stepData"
 *   [currentStep]="activeStep"
 *   [config]="stepperConfig">
 * </ntv-stepper>
 *
 * @example
 * // Advanced configuration
 * <ntv-stepper
 *   [steps]="stepData"
 *   [config]="{
 *     variant: 'vertical',
 *     size: 'lg',
 *     stepperColor: 'primary',
 *     clickable: true,
 *     showDescriptions: true
 *   }"
 *   (stepClick)="handleStepClick($event)">
 * </ntv-stepper>
 */
@Component({
  selector: 'ntv-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
})
export class Stepper {
  // Signal inputs
  /** Array of step data objects defining the stepper content */
  steps = input<StepData[]>([]);

  /** Zero-based index of the currently active step */
  currentStep = input<number>(0);

  /** Visual variant of the stepper (default, progress, detailed, panel, vertical, etc.) */
  variant = input<StepperVariant>('default');

  /** Size variant for step numbers and overall spacing */
  size = input<StepperSize>('md');

  /** Primary color theme for the stepper elements */
  stepperColor = input<ColorVariant>('accent');

  /** Color theme for step labels */
  labelColor = input<ColorVariant>('accent');

  /** Color theme for step descriptions */
  descriptionColor = input<ColorVariant>('accent');

  /** Whether steps can be clicked for navigation */
  clickable = input<boolean>(false);

  /** Whether to display step labels */
  showLabels = input<boolean>(true);

  /** Whether to display step descriptions */
  showDescriptions = input<boolean>(false);

  /** Whether users can skip ahead to future steps */
  allowSkipping = input<boolean>(false);

  /** Whether to animate the progress lines in vertical steppers */
  animateProgress = input<boolean>(false);

  /**
   * Configuration object for DRY usage - combines all stepper properties into a single object
   * @description Reduces template verbosity by 90% when using multiple properties
   */
  config = input<Partial<StepperConfig>>();

  // Computed properties that merge config with individual inputs

  /** Resolved variant from config or individual property */
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );

  /** Resolved size from config or individual property */
  readonly mergedSize = computed(() => this.config()?.size ?? this.size());

  /** Resolved stepper color from config or individual property */
  readonly mergedStepperColor = computed(
    () => this.config()?.stepperColor ?? this.stepperColor()
  );

  /** Resolved label color from config or individual property */
  readonly mergedLabelColor = computed(
    () => this.config()?.labelColor ?? this.labelColor()
  );

  /** Resolved description color from config or individual property */
  readonly mergedDescriptionColor = computed(
    () => this.config()?.descriptionColor ?? this.descriptionColor()
  );

  /** Resolved clickable state from config or individual property */
  readonly mergedClickable = computed(
    () => this.config()?.clickable ?? this.clickable()
  );

  /** Resolved show labels state from config or individual property */
  readonly mergedShowLabels = computed(
    () => this.config()?.showLabels ?? this.showLabels()
  );

  /** Resolved show descriptions state from config or individual property */
  readonly mergedShowDescriptions = computed(
    () => this.config()?.showDescriptions ?? this.showDescriptions()
  );

  /** Resolved allow skipping state from config or individual property */
  readonly mergedAllowSkipping = computed(
    () => this.config()?.allowSkipping ?? this.allowSkipping()
  );

  /** Resolved animate progress state from config or individual property */
  readonly mergedAnimateProgress = computed(
    () => this.config()?.animateProgress ?? this.animateProgress()
  );

  // Signal outputs
  /** Emitted when a step is clicked, providing step data and index */
  stepClick = output<StepClickEvent>();

  /** Emitted when the current step changes, providing the new step index */
  stepChange = output<number>();

  // Linked signal for internal state management
  /** Internal signal that tracks the current step for reactive updates */
  internalCurrentStep = linkedSignal(() => this.currentStep());

  /**
   * Handles step click events with validation for clickability and skipping rules.
   *
   * @param step - The step data object that was clicked
   * @param index - The zero-based index of the clicked step
   */
  onStepClick(step: StepData, index: number): void {
    if (!this.mergedClickable() || step.disabled) return;

    if (!this.mergedAllowSkipping() && index > this.currentStep() + 1) return;

    this.stepClick.emit({ step, index });
    this.stepChange.emit(index);
  }

  /**
   * Determines if a step is in completed state.
   * A step is completed if it's before the current step or explicitly marked as completed.
   *
   * @param index - The zero-based step index to check
   * @returns True if the step is completed
   */
  isStepCompleted(index: number): boolean {
    return (
      index < this.internalCurrentStep() ||
      this.steps()[index]?.completed === true
    );
  }

  /**
   * Determines if a step is currently active.
   * Only one step can be active at a time.
   *
   * @param index - The zero-based step index to check
   * @returns True if the step is currently active
   */
  isStepActive(index: number): boolean {
    return index === this.internalCurrentStep();
  }

  /**
   * Determines if a step is disabled and cannot be interacted with.
   *
   * @param index - The zero-based step index to check
   * @returns True if the step is disabled
   */
  isStepDisabled(index: number): boolean {
    return this.steps()[index]?.disabled ?? false;
  }

  /**
   * Determines if a step is in an error state.
   *
   * @param index - The zero-based step index to check
   * @returns True if the step has an error
   */
  isStepError(index: number): boolean {
    return this.steps()[index]?.error ?? false;
  }

  /**
   * Generates CSS classes for step containers based on variant and state.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step containers
   */
  getStepClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isDisabled = this.isStepDisabled(index);
    const isError = this.isStepError(index);
    let classes = 'step';

    // Add variant-specific classes
    classes += ` step--${this.mergedVariant()}`;

    // Add size classes
    classes += ` step--${this.mergedSize()}`;

    // Add state classes with priority: error > active > completed > disabled > default
    if (isError) {
      classes += ' step--error';
    } else if (isActive) {
      classes += ' step--active';
    } else if (isCompleted) {
      classes += ' step--completed';
    } else if (isDisabled) {
      classes += ' step--disabled';
    } else {
      classes += ' step--inactive';
    }

    // Add clickable class if applicable
    if (this.mergedClickable() && !isDisabled) {
      classes += ' step--clickable';
    }

    return classes;
  }

  /**
   * Generates CSS classes for step numbers with color and state variations.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step numbers
   */
  getStepNumberClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__number';

    // Add size classes
    classes += ` step__number--${this.mergedSize()}`;

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__number--danger';
      if (isActive) {
        classes += ' step__number--danger--active';
      } else if (isCompleted) {
        classes += ' step__number--danger--completed';
      } else {
        classes += ' step__number--danger--inactive';
      }
    } else {
      const color = this.mergedStepperColor();
      classes += ` step__number--${color}`;
      if (isActive) {
        classes += ` step__number--${color}--active`;
      } else if (isCompleted) {
        classes += ` step__number--${color}--completed`;
      } else {
        classes += ` step__number--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isCompleted) {
      classes += ' step__number--completed';
    } else if (isActive) {
      classes += ' step__number--active';
    } else {
      classes += ' step__number--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for step connectors (lines between steps).
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step connectors
   */
  getConnectorClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    let classes = 'step__connector';

    // Add color classes for connector
    classes += ` step__connector--${this.mergedStepperColor()}`;

    if (isCompleted) {
      classes += ' step__connector--completed';
      // Check if the next step is also completed to determine connector state
      const nextStepCompleted = this.isStepCompleted(index + 1);
      if (nextStepCompleted) {
        classes += ' step__connector--next-completed';
      }
    } else {
      classes += ' step__connector--inactive';
      // Check if this is the connector before the active step
      const isBeforeActive = index + 1 === this.internalCurrentStep();
      if (isBeforeActive) {
        classes += ' step__connector--before-active';
      }
    }

    return classes;
  }

  /**
   * Generates CSS classes for progress variant step containers.
   *
   * @param index - The zero-based step index
   * @param isLast - Whether this is the last step in the sequence
   * @returns Space-separated CSS class string for progress steps
   */
  getProgressStepClasses(index: number, isLast: boolean): string {
    const isCompleted = this.isStepCompleted(index);
    const isError = this.isStepError(index);
    let classes = 'step--progress';

    if (!isLast) {
      classes += ' step__connector--progress';
      // Add color classes for connector
      if (isError) {
        classes += ' step__connector--danger';
      } else {
        classes += ` step__connector--${this.mergedStepperColor()}`;
      }

      if (isCompleted) {
        classes += ' step__connector--progress-completed';
      } else {
        classes += ' step__connector--progress-inactive';
      }
    }

    return classes;
  }

  /**
   * Generates CSS classes for progress variant step numbers.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for progress step numbers
   */
  getProgressStepNumberClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__number';

    // Add size classes
    classes += ` step__number--${this.mergedSize()}`;

    // Add color classes
    if (isError) {
      classes += ' step__number--danger';
    } else {
      classes += ` step__number--${this.mergedStepperColor()}`;
    }

    // Add state classes
    if (isCompleted) {
      classes += ' step__number--completed';
    } else if (isActive) {
      classes += ' step__number--active';
    } else {
      classes += ' step__number--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for detailed variant step containers.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for detailed steps
   */
  getDetailedStepClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__detailed';

    // Add color classes
    classes += ` step__detailed--${this.mergedStepperColor()}`;

    // Add state classes with priority: error > active > completed > default
    if (isError) {
      classes += ' step__detailed--error';
    } else if (isActive) {
      classes += ' step__detailed--active';
    } else if (isCompleted) {
      classes += ' step__detailed--completed';
    } else {
      classes += ' step__detailed--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for detailed variant step text elements.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for detailed step text
   */
  getDetailedStepTextClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    let classes = 'step__detailed-text';

    if (isCompleted || isActive) {
      classes += ' step__detailed-text--active';
    } else {
      classes += ' step__detailed-text--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for detailed variant step titles.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for detailed step titles
   */
  getDetailedStepTitleClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);

    let classes = 'text-sm font-medium leading-tight';

    // Add color classes
    classes += ` step__detailed-title--${this.mergedLabelColor()}`;

    if (isError) {
      classes += ' step__detailed-title--danger';
    }

    if (isCompleted || isActive) {
      classes += ' step__detailed-title--active';
    } else {
      classes += ' step__detailed-title--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for panel variant step containers.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for panel steps
   */
  getPanelStepClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__panel';

    // Add color classes
    classes += ` step__panel--${this.mergedStepperColor()}`;

    // Add state classes with priority: error > active > completed > default
    if (isError) {
      classes += ' step__panel--error';
    } else if (isActive) {
      classes += ' step__panel--active';
    } else if (isCompleted) {
      classes += ' step__panel--completed';
    } else {
      classes += ' step__panel--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for panel variant step text elements.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for panel step text
   */
  getPanelStepTextClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    let classes = 'step__panel-text';

    if (isCompleted || isActive) {
      classes += ' step__panel-text--active';
    } else {
      classes += ' step__panel-text--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical variant step containers.
   *
   * @param index - The zero-based step index
   * @param isLast - Whether this is the last step in the sequence
   * @returns Space-separated CSS class string for vertical steps
   */
  getVerticalStepClasses(index: number, isLast: boolean): string {
    let classes = 'relative';

    if (!isLast) {
      const isCompleted = this.isStepCompleted(index);
      const isError = this.isStepError(index);
      classes += ' step__connector--vertical';

      if (isError) {
        // Add error color for connector
        classes += ' step__connector--danger';
        classes += ' step__connector--vertical-error';
      } else {
        // Add color classes for connector
        classes += ` step__connector--${this.mergedStepperColor()}`;

        if (isCompleted) {
          classes += ' step__connector--vertical-completed';
          // Add animation class if enabled
          if (this.mergedAnimateProgress()) {
            classes += ' step__connector--animated';
          }
        } else {
          classes += ' step__connector--vertical-inactive';
        }
      }
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical variant step numbers.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical step numbers
   */
  getVerticalStepNumberClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-number';

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__vertical-number--danger';
      if (isActive) {
        classes += ' step__vertical-number--danger--active';
      } else if (isCompleted) {
        classes += ' step__vertical-number--danger--completed';
      } else {
        classes += ' step__vertical-number--danger--inactive';
      }
    } else {
      const color = this.mergedStepperColor();
      classes += ` step__vertical-number--${color}`;
      if (isActive) {
        classes += ` step__vertical-number--${color}--active`;
      } else if (isCompleted) {
        classes += ` step__vertical-number--${color}--completed`;
      } else {
        classes += ` step__vertical-number--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isError) {
      classes += ' step__vertical-number--error';
    } else if (isActive) {
      classes += ' step__vertical-number--active';
    } else if (isCompleted) {
      classes += ' step__vertical-number--completed';
    } else {
      classes += ' step__vertical-number--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical variant step titles.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical step titles
   */
  getVerticalStepTitleClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-title';

    // Add color classes
    classes += ` step__vertical-title--${this.mergedStepperColor()}`;

    if (isError) {
      classes += ' step__vertical-title--error';
    } else if (isCompleted || isActive) {
      classes += ' step__vertical-title--active';
    } else {
      classes += ' step__vertical-title--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical variant step text elements.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical step text
   */
  getVerticalStepTextClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    let classes = 'step__detailed-text';

    if (isCompleted || isActive) {
      classes += ' step__detailed-text--active';
    } else {
      classes += ' step__detailed-text--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for breadcrumb variant step text elements.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for breadcrumb step text
   */
  getBreadcrumbStepTextClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    let classes = 'step__breadcrumb-text';

    // Add color classes
    classes += ` step__breadcrumb-text--${this.mergedStepperColor()}`;

    if (isCompleted || isActive) {
      classes += ' step__breadcrumb-text--active';
    } else {
      classes += ' step__breadcrumb-text--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for breadcrumb variant step icons.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for breadcrumb step icons
   */
  getBreadcrumbStepIconClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    let classes = 'step__breadcrumb-icon';

    // Add color classes
    classes += ` step__breadcrumb-icon--${this.mergedStepperColor()}`;

    if (isCompleted || isActive) {
      classes += ' step__breadcrumb-icon--active';
    } else {
      classes += ' step__breadcrumb-icon--inactive';
    }

    return classes;
  }

  // Vertical-reverse variant methods
  /**
   * Generates CSS classes for vertical-reverse variant step containers.
   *
   * @param index - The zero-based step index
   * @param isLast - Whether this is the last step in the sequence
   * @returns Space-separated CSS class string for vertical-reverse steps
   */
  getVerticalReverseStepClasses(index: number, isLast: boolean): string {
    let classes = 'relative';

    if (!isLast) {
      const isCompleted = this.isStepCompleted(index);
      const isError = this.isStepError(index);
      classes += ' step__connector--vertical-reverse';

      if (isError) {
        // Add error color for connector
        classes += ' step__connector--danger';
        classes += ' step__connector--vertical-reverse-error';
      } else {
        // Add color classes for connector
        classes += ` step__connector--${this.mergedStepperColor()}`;

        if (isCompleted) {
          classes += ' step__connector--vertical-reverse-completed';
          // Add animation class if enabled
          if (this.mergedAnimateProgress()) {
            classes += ' step__connector--animated';
          }
        } else {
          classes += ' step__connector--vertical-reverse-inactive';
        }
      }
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical-reverse variant step numbers.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical-reverse step numbers
   */
  getVerticalReverseStepNumberClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-reverse-number';

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__vertical-reverse-number--danger';
      if (isActive) {
        classes += ' step__vertical-reverse-number--danger--active';
      } else if (isCompleted) {
        classes += ' step__vertical-reverse-number--danger--completed';
      } else {
        classes += ' step__vertical-reverse-number--danger--inactive';
      }
    } else {
      const color = this.mergedStepperColor();
      classes += ` step__vertical-reverse-number--${color}`;
      if (isActive) {
        classes += ` step__vertical-reverse-number--${color}--active`;
      } else if (isCompleted) {
        classes += ` step__vertical-reverse-number--${color}--completed`;
      } else {
        classes += ` step__vertical-reverse-number--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isError) {
      classes += ' step__vertical-reverse-number--error';
    } else if (isActive) {
      classes += ' step__vertical-reverse-number--active';
    } else if (isCompleted) {
      classes += ' step__vertical-reverse-number--completed';
    } else {
      classes += ' step__vertical-reverse-number--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical-reverse variant step titles.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical-reverse step titles
   */
  getVerticalReverseStepTitleClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-reverse-title';

    // Add color classes
    classes += ` step__vertical-reverse-title--${this.mergedStepperColor()}`;

    if (isError) {
      classes += ' step__vertical-reverse-title--error';
    } else if (isCompleted || isActive) {
      classes += ' step__vertical-reverse-title--active';
    } else {
      classes += ' step__vertical-reverse-title--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical-reverse variant step descriptions.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical-reverse step descriptions
   */
  getVerticalReverseStepDescriptionClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-reverse-description';

    // Add color classes
    classes += ` step__vertical-reverse-description--${this.mergedStepperColor()}`;

    if (isError) {
      classes += ' step__vertical-reverse-description--error';
    } else if (isCompleted || isActive) {
      classes += ' step__vertical-reverse-description--active';
    } else {
      classes += ' step__vertical-reverse-description--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for vertical variant step descriptions.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for vertical step descriptions
   */
  getVerticalStepDescriptionClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);
    let classes = 'step__vertical-description';

    // Add color classes
    classes += ` step__vertical-description--${this.mergedStepperColor()}`;

    if (isError) {
      classes += ' step__vertical-description--error';
    } else if (isCompleted || isActive) {
      classes += ' step__vertical-description--active';
    } else {
      classes += ' step__vertical-description--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for detailed variant step descriptions.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for detailed step descriptions
   */
  getDetailedStepDescriptionClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);

    let classes = 'text-xs leading-tight';

    // Add color classes
    classes += ` step__detailed-description--${this.mergedDescriptionColor()}`;

    if (isError) {
      classes += ' step__detailed-description--danger';
    }

    if (isCompleted || isActive) {
      classes += ' step__detailed-description--active';
    } else {
      classes += ' step__detailed-description--inactive';
    }

    return classes;
  }

  // Helper methods for label and description colors
  /**
   * Generates CSS classes for step labels with appropriate color theming.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step labels
   */
  getLabelClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);

    let classes = 'step__label';

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__label--danger';
      classes += ' step__label--danger--error';
    } else {
      const color = this.mergedLabelColor();
      classes += ` step__label--${color}`;
      if (isCompleted || isActive) {
        classes += ` step__label--${color}--active`;
      } else {
        classes += ` step__label--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isError) {
      classes += ' step__label--error';
    } else if (isCompleted || isActive) {
      classes += ' step__label--active';
    } else {
      classes += ' step__label--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for step descriptions with appropriate color theming.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step descriptions
   */
  getDescriptionClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);

    let classes = 'step__description';

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__description--danger';
      classes += ' step__description--danger--error';
    } else {
      const color = this.mergedDescriptionColor();
      classes += ` step__description--${color}`;
      if (isCompleted || isActive) {
        classes += ` step__description--${color}--active`;
      } else {
        classes += ` step__description--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isError) {
      classes += ' step__description--error';
    } else if (isCompleted || isActive) {
      classes += ' step__description--active';
    } else {
      classes += ' step__description--inactive';
    }

    return classes;
  }

  /**
   * Generates CSS classes for step subtitles with appropriate color theming.
   *
   * @param index - The zero-based step index
   * @returns Space-separated CSS class string for step subtitles
   */
  getSubtitleClasses(index: number): string {
    const isCompleted = this.isStepCompleted(index);
    const isActive = this.isStepActive(index);
    const isError = this.isStepError(index);

    let classes = 'step__subtitle';

    // Add combined color and state classes for CSS optimization compatibility
    if (isError) {
      classes += ' step__subtitle--danger';
      classes += ' step__subtitle--danger--error';
    } else {
      const color = this.mergedDescriptionColor();
      classes += ` step__subtitle--${color}`;
      if (isCompleted || isActive) {
        classes += ` step__subtitle--${color}--active`;
      } else {
        classes += ` step__subtitle--${color}--inactive`;
      }
    }

    // Add basic state classes for fallback
    if (isError) {
      classes += ' step__subtitle--error';
    } else if (isCompleted || isActive) {
      classes += ' step__subtitle--active';
    } else {
      classes += ' step__subtitle--inactive';
    }

    return classes;
  }
}
