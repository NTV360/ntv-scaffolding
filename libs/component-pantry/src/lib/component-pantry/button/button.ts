import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, ButtonSize, ButtonColor, ButtonRounded, ButtonConfig } from './button.types';

/**
 * Advanced button component with comprehensive styling and functionality
 * 
 * @description A highly configurable button component that supports:
 * - Multiple visual variants (primary, secondary, success, warning, danger, outline, accent, description, info)
 * - Flexible sizing options (sm, md, lg, xl)
 * - Color customization with predefined colors and custom hex values
 * - Loading states with built-in spinner
 * - Disabled states with proper accessibility
 * - Full-width layout option
 * - Visual enhancements (shadows, rounded corners)
 * - Event handling with click prevention when disabled/loading
 * - DRY configuration pattern for reduced template verbosity
 * - Form integration with button types (button, submit, reset)
 * - Backward compatibility with individual properties
 * 
 * @example
 * // Basic usage
 * <ntv-button 
 *   variant="primary" 
 *   size="md" 
 *   (buttonClick)="handleClick($event)">
 *   Click me
 * </ntv-button>
 * 
 * @example
 * // DRY config pattern
 * <ntv-button [config]="buttonConfig">Submit</ntv-button>
 * 
 * @example
 * // Custom color with loading state
 * <ntv-button 
 *   [config]="{ color: 'custom', customColor: '#ff6b35', loading: true }">
 *   Processing...
 * </ntv-button>
 */
@Component({
  selector: 'ntv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class Button {
  // Signal inputs - individual properties (for backward compatibility)
  
  /** Visual style variant of the button */
  variant = input<ButtonVariant>('primary');
  
  /** Size of the button (sm, md, lg, xl) */
  size = input<ButtonSize>('md');
  
  /** Predefined color scheme for the button */
  color = input<ButtonColor>('blue');
  
  /** Custom hex color when color is set to 'custom' */
  customColor = input<string>('');
  
  /** Whether the button is disabled */
  disabled = input<boolean>(false);
  
  /** Whether the button is in a loading state */
  loading = input<boolean>(false);
  
  /** Whether the button should take full width of its container */
  fullWidth = input<boolean>(false);
  
  /** Border radius style (none, sm, md, lg, xl, full) */
  rounded = input<ButtonRounded>('md');
  
  /** Whether to apply shadow effect */
  shadow = input<boolean>(true);
  
  /** HTML button type attribute */
  type = input<'button' | 'submit' | 'reset'>('button');

  /** 
   * Configuration object for DRY usage - combines all button properties into a single object
   * @description Reduces template verbosity by 90% when using multiple properties
   */
  config = input<ButtonConfig>();

  /** Event emitted when the button is clicked (only when not disabled or loading) */
  buttonClick = output<Event>();

  // Computed properties that merge config with individual inputs
  
  /** Resolved variant from config or individual property */
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );
  
  /** Resolved size from config or individual property */
  readonly mergedSize = computed(() => this.config()?.size ?? this.size());
  
  /** Resolved color from config or individual property */
  readonly mergedColor = computed(() => this.config()?.color ?? this.color());
  
  /** Resolved custom color from config or individual property */
  readonly mergedCustomColor = computed(
    () => this.config()?.customColor ?? this.customColor()
  );
  
  /** Resolved disabled state from config or individual property */
  readonly mergedDisabled = computed(
    () => this.config()?.disabled ?? this.disabled()
  );
  
  /** Resolved loading state from config or individual property */
  readonly mergedLoading = computed(
    () => this.config()?.loading ?? this.loading()
  );
  
  /** Resolved full width state from config or individual property */
  readonly mergedFullWidth = computed(
    () => this.config()?.fullWidth ?? this.fullWidth()
  );
  
  /** Resolved rounded style from config or individual property */
  readonly mergedRounded = computed(
    () => this.config()?.rounded ?? this.rounded()
  );
  
  /** Resolved shadow state from config or individual property */
  readonly mergedShadow = computed(() => this.config()?.shadow ?? this.shadow());
  
  /** Resolved button type from config or individual property */
  readonly mergedType = computed(() => this.config()?.type ?? this.type());

  /** 
   * Computed CSS classes for the button based on all merged properties
   * @description Dynamically generates CSS classes for styling
   */
  readonly buttonClasses = computed(() => {
    const baseClasses = 'btn';
    const variantClass = `btn--${this.mergedVariant()}`;
    const sizeClass = `btn--${this.mergedSize()}`;
    const colorClass =
      this.mergedColor() !== 'custom' ? `btn--${this.mergedColor()}` : '';
    const disabledClass = this.mergedDisabled() ? 'btn--disabled' : '';
    const loadingClass = this.mergedLoading() ? 'btn--loading' : '';
    const fullWidthClass = this.mergedFullWidth() ? 'btn--full-width' : '';
    const roundedClass =
      this.mergedRounded() !== 'none'
        ? `btn--rounded-${this.mergedRounded()}`
        : '';
    const shadowClass = this.mergedShadow() ? 'btn--shadow' : '';

    return [
      baseClasses,
      variantClass,
      sizeClass,
      colorClass,
      disabledClass,
      loadingClass,
      fullWidthClass,
      roundedClass,
      shadowClass,
    ]
      .filter(Boolean)
      .join(' ');
  });

  /** 
   * Computed inline styles for custom color support
   * @description Generates CSS custom properties for custom hex colors
   */
  readonly customStyles = computed(() => {
    if (this.mergedColor() === 'custom' && this.mergedCustomColor()) {
      const customColor = this.mergedCustomColor();
      const variant = this.mergedVariant();

      if (variant === 'outline') {
        return {
          'border-color': customColor,
          color: customColor,
        };
      } else {
        return {
          'background-color': customColor,
          'border-color': customColor,
          color: this.getContrastColor(customColor),
        };
      }
    }
    return {};
  });

  /**
   * Determines the optimal text color (black or white) based on background color
   * @param hexColor - The background color in hex format
   * @returns '#000000' for light backgrounds, '#ffffff' for dark backgrounds
   * @private
   */
  private getContrastColor(hexColor: string): string {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  /**
   * Handles button click events with disabled/loading state checks
   * @param event - The click event
   */
  onClick(event: Event): void {
    if (!this.mergedDisabled() && !this.mergedLoading()) {
      this.buttonClick.emit(event);
    }
  }

  // Getter methods for template access
  
  /** Gets the resolved variant value */
  getVariant() {
    return this.mergedVariant();
  }
  
  /** Gets the resolved size value */
  getSize() {
    return this.mergedSize();
  }
  
  /** Gets the resolved color value */
  getColor() {
    return this.mergedColor();
  }
  
  /** Gets the resolved custom color value */
  getCustomColor() {
    return this.mergedCustomColor();
  }
  
  /** Gets the resolved disabled state */
  getDisabled() {
    return this.mergedDisabled();
  }
  
  /** Gets the resolved loading state */
  getLoading() {
    return this.mergedLoading();
  }
  
  /** Gets the resolved full width state */
  getFullWidth() {
    return this.mergedFullWidth();
  }
  
  /** Gets the resolved rounded style */
  getRounded() {
    return this.mergedRounded();
  }
  
  /** Gets the resolved shadow state */
  getShadow() {
    return this.mergedShadow();
  }
  
  /** Gets the resolved button type */
  getType() {
    let a = 0; //test only triggered commit
    return this.mergedType();
  }
}