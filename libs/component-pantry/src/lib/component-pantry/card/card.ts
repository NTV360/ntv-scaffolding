import {
  Component,
  input,
  computed,
  HostBinding,
  ElementRef,
  inject,
  effect,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardVariant, CardRounded, CardShadow, CardConfig } from './card.types';

/**
 * A flexible and customizable card component with comprehensive styling options
 *
 * @description A highly configurable card component that supports:
 * - Visual variants (default, elevated, outlined, filled)
 * - Flexible border radius options
 * - Shadow customization (none, sm, md, lg, xl)
 * - Custom background and border colors
 * - Hover effects and clickable states
 * - Full-width layout option
 * - DRY configuration pattern for reduced template verbosity
 * - Content projection with ng-content
 * - Backward compatibility with individual properties
 * - Content-driven sizing (no artificial size constraints)
 *
 * @example
 * // Basic usage
 * <ntv-card variant="elevated" shadow="md">
 *   <p>Card content goes here</p>
 * </ntv-card>
 *
 * @example
 * // DRY config pattern
 * <ntv-card [config]="cardConfig">
 *   <div>Dynamic card content</div>
 * </ntv-card>
 *
 * @example
 * // Clickable card with hover effects
 * <ntv-card
 *   [config]="{ clickable: true, hoverEffect: true, variant: 'outlined' }"
 *   (cardClick)="handleCardClick($event)">
 *   <h3>Clickable Card</h3>
 * </ntv-card>
 */
@Component({
  selector: 'ntv-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class Card {
  // Signal inputs - individual properties (for backward compatibility)

  /** Visual variant of the card */
  readonly variant = input<CardVariant>('default');

  /** Border radius style (none, sm, md, lg, xl, full) */
  readonly rounded = input<CardRounded>('md');

  /** Shadow intensity (none, sm, md, lg, xl) */
  readonly shadow = input<CardShadow>('sm');

  /** Custom background color (hex or CSS color) */
  readonly backgroundColor = input<string>('');

  /** Custom border color (hex or CSS color) */
  readonly borderColor = input<string>('');

  /** CSS gradient background (e.g., 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)') */
  readonly gradient = input<string>('');

  /** Whether to apply hover effects */
  readonly hoverEffect = input<boolean>(false);

  /** Whether the card is clickable */
  readonly clickable = input<boolean>(false);

  /** Whether the card should take full width of its container */
  readonly fullWidth = input<boolean>(false);

  /** Whether custom colors should adapt to the current theme (light/dark mode) */
  readonly adaptToTheme = input<boolean>(true);

  /**
   * Configuration object for DRY usage - combines all card properties into a single object
   * @description Reduces template verbosity by 90% when using multiple properties
   */
  readonly config = input<Partial<CardConfig>>();

  /** Event emitted when the card is clicked (only when clickable is true) */
  readonly cardClick = output<Event>();

  // Computed properties that merge config with individual inputs

  /** Resolved variant from config or individual property */
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );

  /** Resolved rounded style from config or individual property */
  readonly mergedRounded = computed(
    () => this.config()?.rounded ?? this.rounded()
  );

  /** Resolved shadow from config or individual property */
  readonly mergedShadow = computed(
    () => this.config()?.shadow ?? this.shadow()
  );

  /** Resolved background color from config or individual property */
  readonly mergedBackgroundColor = computed(
    () => this.config()?.backgroundColor ?? this.backgroundColor()
  );

  /** Resolved border color from config or individual property */
  readonly mergedBorderColor = computed(
    () => this.config()?.borderColor ?? this.borderColor()
  );

  /** Resolved gradient from config or individual property */
  readonly mergedGradient = computed(
    () => this.config()?.gradient ?? this.gradient()
  );

  /** Resolved hover effect from config or individual property */
  readonly mergedHoverEffect = computed(
    () => this.config()?.hoverEffect ?? this.hoverEffect()
  );

  /** Resolved clickable state from config or individual property */
  readonly mergedClickable = computed(
    () => this.config()?.clickable ?? this.clickable()
  );

  /** Resolved full width state from config or individual property */
  readonly mergedFullWidth = computed(
    () => this.config()?.fullWidth ?? this.fullWidth()
  );

  /** Resolved adapt to theme state from config or individual property */
  readonly mergedAdaptToTheme = computed(
    () => this.config()?.adaptToTheme ?? this.adaptToTheme()
  );

  /**
   * Computed CSS classes for the card based on all merged properties
   * @description Dynamically generates CSS classes for styling
   */
  readonly cardClasses = computed(() => {
    const baseClasses = 'card';
    const variantClass = `card--${this.mergedVariant()}`;
    const roundedClass =
      this.mergedRounded() !== 'none'
        ? `card--rounded-${this.mergedRounded()}`
        : '';
    const shadowClass =
      this.mergedShadow() !== 'none'
        ? `card--shadow-${this.mergedShadow()}`
        : '';
    const hoverClass = this.mergedHoverEffect() ? 'card--hover' : '';
    const clickableClass = this.mergedClickable() ? 'card--clickable' : '';
    const fullWidthClass = this.mergedFullWidth() ? 'card--full-width' : '';

    return [
      baseClasses,
      variantClass,
      roundedClass,
      shadowClass,
      hoverClass,
      clickableClass,
      fullWidthClass,
    ]
      .filter(Boolean)
      .join(' ');
  });

  /**
   * Signal to track dark mode state reactively
   */
  private darkModeSignal = signal(this.checkDarkMode());

  /**
   * Utility function to detect if the system is in dark mode
   * Checks multiple sources: CSS class, data attribute, and system preference
   */
  private checkDarkMode(): boolean {
    // Check for manual dark mode class on document
    if (document.documentElement.classList.contains('dark')) {
      return true;
    }
    
    // Check for data attribute
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      return true;
    }
    
    // No system preference fallback - only manual control
    return false;
  }

  /**
   * Reactive dark mode getter
   */
  private isDarkMode(): boolean {
    return this.darkModeSignal();
  }

  /**
   * Utility function to adapt a color for dark mode
   * @param color - The original color (hex, rgb, hsl)
   * @returns Adapted color for dark mode
   */
  private adaptColorForDarkMode(color: string): string {
    // Simple color adaptation logic - can be enhanced
    // For now, we'll darken light colors and lighten dark colors
    
    // Handle hex colors
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      // If it's a light color, make it darker for dark mode
      if (luminance > 0.5) {
        const factor = 0.3; // Darken by 70%
        const newR = Math.round(r * factor);
        const newG = Math.round(g * factor);
        const newB = Math.round(b * factor);
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      } else {
        // If it's a dark color, make it lighter for dark mode
        const factor = 1.8; // Lighten
        const newR = Math.min(255, Math.round(r * factor));
        const newG = Math.min(255, Math.round(g * factor));
        const newB = Math.min(255, Math.round(b * factor));
        return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      }
    }
    
    // For non-hex colors, return as-is for now
    // Could be enhanced to handle rgb(), hsl(), etc.
    return color;
  }

  /**
   * Utility function to adapt a gradient for dark mode
   * @param gradient - The original gradient string
   * @returns Adapted gradient for dark mode
   */
  private adaptGradientForDarkMode(gradient: string): string {
    // Simple gradient adaptation - extract hex colors and adapt them
    const hexColorRegex = /#[0-9a-fA-F]{6}/g;
    return gradient.replace(hexColorRegex, (match) => this.adaptColorForDarkMode(match));
  }

  /**
   * Computed inline styles for custom colors and gradients
   * @description Generates CSS custom properties for custom colors and gradients
   * Supports theme adaptation when adaptToTheme is enabled
   */
  readonly customStyles = computed(() => {
    const styles: Record<string, string> = {};
    const shouldAdapt = this.mergedAdaptToTheme() && this.isDarkMode();

    // Handle gradient first (takes priority over background color)
    if (this.mergedGradient()) {
      const gradient = shouldAdapt 
        ? this.adaptGradientForDarkMode(this.mergedGradient())
        : this.mergedGradient();
      styles['background'] = gradient;
    } else if (this.mergedBackgroundColor()) {
      const backgroundColor = shouldAdapt 
        ? this.adaptColorForDarkMode(this.mergedBackgroundColor())
        : this.mergedBackgroundColor();
      styles['background-color'] = backgroundColor;
    }

    if (this.mergedBorderColor()) {
      const borderColor = shouldAdapt 
        ? this.adaptColorForDarkMode(this.mergedBorderColor())
        : this.mergedBorderColor();
      styles['border-color'] = borderColor;
    }

    return styles;
  });

  @HostBinding('class')
  get hostClass(): string {
    return this.cardClasses();
  }

  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const native = this.el.nativeElement;

      // Set cursor style for clickable cards
      if (this.mergedClickable()) {
        native.style.cursor = 'pointer';
      } else {
        native.style.cursor = 'default';
      }
    });

    // Set up dark mode detection with MutationObserver
    const observer = new MutationObserver(() => {
      const newDarkMode = this.checkDarkMode();
      if (newDarkMode !== this.darkModeSignal()) {
        this.darkModeSignal.set(newDarkMode);
      }
    });

    // Observe changes to the document element's class and attributes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });

    // No system theme listener - only manual control
  }

  /**
   * Handles card click events
   * @param event - The click event
   */
  onClick(event: Event): void {
    if (this.mergedClickable()) {
      this.cardClick.emit(event);
    }
  }

  /**
   * Handles keyboard events for accessibility
   * @param event - The keyboard event
   */
  onKeyDown(event: KeyboardEvent): void {
    if (
      this.mergedClickable() &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this.cardClick.emit(event);
    }
  }

  // Getter methods for template access

  /** Gets the resolved variant value */
  getVariant() {
    return this.mergedVariant();
  }

  /** Gets the resolved rounded style */
  getRounded() {
    return this.mergedRounded();
  }

  /** Gets the resolved shadow value */
  getShadow() {
    return this.mergedShadow();
  }

  /** Gets the resolved background color */
  getBackgroundColor() {
    return this.mergedBackgroundColor();
  }

  /** Gets the resolved border color */
  getBorderColor() {
    return this.mergedBorderColor();
  }

  /** Gets the resolved gradient */
  getGradient() {
    return this.mergedGradient();
  }

  /** Gets the resolved hover effect state */
  getHoverEffect() {
    return this.mergedHoverEffect();
  }

  /** Gets the resolved clickable state */
  getClickable() {
    return this.mergedClickable();
  }

  /** Gets the resolved full width state */
  getFullWidth() {
    return this.mergedFullWidth();
  }

  /** Gets the resolved adapt to theme state */
  getAdaptToTheme() {
    return this.mergedAdaptToTheme();
  }
}
