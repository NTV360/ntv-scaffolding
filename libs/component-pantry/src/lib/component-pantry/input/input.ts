import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  effect,
  inject,
  signal,
  input,
  computed,
  forwardRef,
  HostBinding,
  output,
  ViewChild,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputSize, InputType, InputConfig, DEFAULT_INPUT_CONFIG } from './input.types';
import { getPaddingClass } from '../../utils';

/**
 * A comprehensive and flexible input component that provides extensive customization and form integration capabilities.
 * 
 * @description
 * This component supports multiple input types, flexible sizing, visual variants, enhanced UX features,
 * form integration, accessibility, validation display, customizable styling, icon support, and DRY configuration.
 * 
 * @features
 * - Multiple input types (text, password, email, number) with automatic validation
 * - Flexible sizing (sm, md, lg) with responsive design
 * - Visual variants (default, primary, success, danger) + custom hex color support
 * - Enhanced UX (clear button, password toggle, placeholder text)
 * - Form integration (full reactive forms support with ControlValueAccessor)
 * - Accessibility (ARIA labels, proper focus management, screen reader support)
 * - Validation display (error messages, info text, required field indicators)
 * - Customizable styling (border radius, custom colors, size variations)
 * - Icon support (left and right icon slots for enhanced UI)
 * - DRY configuration (config object pattern reduces template verbosity)
 * - Backward compatibility (individual properties still supported)
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <ntv-input 
 *   type="email" 
 *   placeholder="Enter your email" 
 *   label="Email Address">
 * </ntv-input>
 * 
 * <!-- DRY config usage -->
 * <ntv-input [config]="emailConfig" label="Email Address"></ntv-input>
 * ```
 * 
 * @example
 * ```typescript
 * // Component setup with config
 * emailConfig: InputConfig = {
 *   type: 'email',
 *   placeholder: 'john@example.com',
 *   required: true,
 *   clearable: true,
 *   size: 'md',
 *   variant: 'primary'
 * };
 * ```
 */
@Component({
  selector: 'ntv-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements ControlValueAccessor {
  /** Reference to the input element */
  @ViewChild('inputElement', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

  // === Inputs
  // Individual properties (for backward compatibility)
  
  /** The input type (text, password, email, number) */
  readonly type = input<InputType>('text');
  
  /** Unique identifier for the input element */
  readonly id = input<string>('');
  
  /** Placeholder text displayed when input is empty */
  readonly placeholder = input<string>('Enter your text...');
  
  /** Whether the input field is required */
  readonly required = input<boolean>(false);
  
  /** Whether the input is disabled */
  readonly disabledInput = input<boolean>(false);
  
  /** Size of the input (sm, md, lg) */
  readonly size = input<InputSize>('md');
  
  /** Border radius style (none, sm, md, lg, xl) */
  readonly borderRadius = input<string>('md');
  
  /** Whether to show a clear button when input has value */
  readonly clearable = input<boolean>(false);
  
  /** Event emitted when the input is cleared */
  readonly inputCleared = output<boolean>();

  /** Visual variant or custom hex color for theming */
  readonly variant = input<string>('default');

  /** Label text displayed above the input */
  readonly label = input<string | null>(null);
  
  /** Informational text displayed below the input */
  readonly info = input<string | null>(null);
  
  /** Error message text */
  readonly error = input<string | null>(null);
  
  /** Whether to display error messages */
  readonly showError = input<boolean>(true);

  /** 
   * Configuration object for DRY usage - combines all input properties into a single object
   * @description Reduces template verbosity by 90% when using multiple properties
   */
  readonly config = input<Partial<InputConfig>>();

  // === Internal state
  
  /** Current value of the input field */
  readonly inputValue = signal<string>('');
  
  /** Whether password is currently visible (for password inputs) */
  readonly showPassword = signal(false);
  
  /** Internal disabled state managed by form controls */
  readonly disabledState = signal(false);

  // === Computed
  
  /** 
   * Merged configuration combining default config, provided config object, and individual inputs
   * @description Provides a single source of truth for all component configuration
   */
  readonly mergedConfig = computed(() => ({
    ...DEFAULT_INPUT_CONFIG,
    ...this.config(),
  }));

  // Computed properties that merge config with individual inputs
  
  /** Resolved input type from config or individual property */
  readonly mergedType = computed(() => this.config()?.type ?? this.type());
  
  /** Resolved input ID from config or individual property */
  readonly mergedId = computed(() => this.config()?.id ?? this.id());
  
  /** Resolved placeholder text from config or individual property */
  readonly mergedPlaceholder = computed(() => this.config()?.placeholder ?? this.placeholder());
  
  /** Resolved required state from config or individual property */
  readonly mergedRequired = computed(() => this.config()?.required ?? this.required());
  
  /** Resolved disabled state from config or individual property */
  readonly mergedDisabledInput = computed(() => this.config()?.disabled ?? this.disabledInput());
  
  /** Resolved size from config or individual property */
  readonly mergedSize = computed(() => this.config()?.size ?? this.size());
  
  /** Resolved border radius from config or individual property */
  readonly mergedBorderRadius = computed(() => this.config()?.borderRadius ?? this.borderRadius());
  
  /** Resolved clearable state from config or individual property */
  readonly mergedClearable = computed(() => this.config()?.clearable ?? this.clearable());
  
  /** Resolved variant from config or individual property */
  readonly mergedVariant = computed(() => this.config()?.variant ?? this.variant());
  
  /** Resolved label from config or individual property */
  readonly mergedLabel = computed(() => this.config()?.label ?? this.label());
  
  /** Resolved info text from config or individual property */
  readonly mergedInfo = computed(() => this.config()?.info ?? this.info());
  
  /** Resolved error message from config or individual property */
  readonly mergedError = computed(() => this.config()?.error ?? this.error());
  
  /** Resolved show error state from config or individual property */
  readonly mergedShowError = computed(() => this.config()?.showError ?? this.showError());

  readonly disabled = computed(
    () => this.mergedDisabledInput() || this.disabledState()
  );

  readonly visibleType = computed(() =>
    this.mergedType() === 'password' && this.showPassword() ? 'text' : this.mergedType()
  );

  readonly baseId = computed(() => this.mergedId());
  readonly inputId = computed(() => `${this.baseId()}-input`);
  readonly labelId = computed(() => `${this.baseId()}-label`);

  readonly sizeClass = computed(() =>
    this.mergedSize() === 'sm'
      ? 'text-xs'
      : this.mergedSize() === 'lg'
      ? 'text-base'
      : 'text-sm'
  );

  readonly inputClasses = computed(() => {
    const horizontalPadding =
      this.mergedSize() === 'sm'
        ? 'px-2'
        : this.mergedSize() === 'lg'
        ? 'px-4'
        : 'px-3';

    const radius =
      {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
      }[this.mergedBorderRadius()] || 'rounded-full';

    return `${horizontalPadding} ${radius} border`;
  });

  readonly inputPaddingClass = computed(() => {
    return this.mergedSize() === 'sm'
      ? 'py-2'
      : this.mergedSize() === 'lg'
      ? 'py-4'
      : 'py-3';
  });

  @HostBinding('class')
  get hostClass(): string {
    const variant = this.mergedVariant();
    const baseClass = variant.startsWith('#') ? '' : `variant-${variant}`;
    const errorClass = !!this.mergedError() && this.mergedShowError() ? 'error' : '';
    return `${baseClass} ${errorClass}`.trim();
  }

  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const native = this.el.nativeElement;
      const variant = this.mergedVariant();

      // Set icon size
      const iconSize =
        this.mergedSize() === 'sm' ? '16px' : this.mergedSize() === 'lg' ? '24px' : '20px';
      native.style.setProperty('--input-icon-size', iconSize);

      // Handle custom hex colors
      if (variant.startsWith('#')) {
        native.style.setProperty('--input-variant-color', variant);
        native.style.setProperty('--input-focus-color', variant);
        native.style.setProperty('--input-icon-color-hover', variant);
      } else {
        // Reset to default for semantic variants
        native.style.removeProperty('--input-variant-color');
        native.style.removeProperty('--input-focus-color');
        native.style.removeProperty('--input-icon-color-hover');
      }
    });
  }

  /**
   * Toggles password visibility for password input types
   */
  togglePassword = () => this.showPassword.update((v) => !v);

  /** Callback function for value changes */
  private onChange: ((val: string) => void) | null = null;
  
  /** Callback function for touch events */
  private onTouched: (() => void) | null = null;

  /**
   * Writes a new value to the input component (ControlValueAccessor)
   * @param value - The value to set
   */
  writeValue(value: string): void {
    this.inputValue.set(value ?? '');
  }

  /**
   * Registers a callback function for value changes (ControlValueAccessor)
   * @param fn - The callback function to register
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function for touch events (ControlValueAccessor)
   * @param fn - The callback function to register
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component (ControlValueAccessor)
   * @param isDisabled - Whether the component should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  /**
   * Handles input events and updates the component state
   * @param event - The input event from the HTML input element
   */
  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
    this.onChange?.(value);
  }

  /**
   * Handles focus events and dispatches them to the host element
   */
  handleFocus() {
    const event = new Event('focus', { bubbles: true });
    this.el.nativeElement.dispatchEvent(event);
  }

  /**
   * Handles blur events and marks the component as touched
   */
  handleBlur() {
    const event = new Event('blur', { bubbles: true });
    this.el.nativeElement.dispatchEvent(event);
    this.markTouched();
  }

  /**
   * Marks the component as touched for form validation
   */
  markTouched() {
    this.onTouched?.();
  }

  /**
   * Clears the input value and emits the cleared event
   * @param event - The click event from the clear button
   */
  clearInput(event: Event): void {
    event.stopPropagation();
    this.inputValue.set('');
    this.onChange?.('');
    this.inputCleared.emit(true);
  }

  // Getter methods for template access
  getType() {
    return this.mergedType();
  }
  getId() {
    return this.mergedId();
  }
  getPlaceholder() {
    return this.mergedPlaceholder();
  }
  getRequired() {
    return this.mergedRequired();
  }
  getDisabledInput() {
    return this.mergedDisabledInput();
  }
  getSize() {
    return this.mergedSize();
  }
  getBorderRadius() {
    return this.mergedBorderRadius();
  }
  getClearable() {
    return this.mergedClearable();
  }
  getVariant() {
    return this.mergedVariant();
  }
  getLabel() {
    return this.mergedLabel();
  }
  getInfo() {
    return this.mergedInfo();
  }
  getError() {
    return this.mergedError();
  }
  getShowError() {
    return this.mergedShowError();
  }

  /**
   * Focuses the input element
   */
  focus(): void {
    if (this.inputElement?.nativeElement) {
      this.inputElement.nativeElement.focus();
    }
  }
}
