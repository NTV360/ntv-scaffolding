import {
  Component,
  input,
  output,
  computed,
  signal,
  effect,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy,
  inject,
  Renderer2,
  DOCUMENT,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverPlacement, PopoverConfig } from './popover.types';

/**
 * Advanced popover component with comprehensive positioning and trigger options
 *
 * @description A highly configurable popover component that supports:
 * - Multiple placement options (top, bottom, left, right with start/end variants)
 * - Various trigger methods (click, hover, manual)
 * - Customizable styling and positioning
 * - Click outside and escape key closing
 * - Arrow indicator with dynamic positioning
 * - Content projection for flexible layouts
 * - Template reference support
 *
 * @example
 * // Basic usage with click trigger
 * <button (click)="popover.toggle($event)">Toggle Popover</button>
 * <ntv-popover #popover placement="top">
 *   <p>Popover content goes here</p>
 * </ntv-popover>
 *
 * @example
 * // Configuration pattern
 * <ntv-popover [config]="{ placement: 'bottom-start', arrow: false }">
 *   Custom content
 * </ntv-popover>
 */
@Component({
  selector: 'ntv-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.html',
  styleUrl: './popover.css',
})
export class Popover implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  @ViewChild('popoverContent', { static: false }) popoverContent!: ElementRef;

  // Signal inputs
  /** Placement position of the popover */
  placement = input<PopoverPlacement>('bottom');

  /** Offset distance from the trigger element */
  offset = input<number>(8);

  /** Whether to show arrow indicator */
  arrow = input<boolean>(true);

  /** Trigger method for showing/hiding popover */
  trigger = input<'click' | 'hover' | 'manual'>('manual');

  /** Whether to close popover when clicking outside */
  closeOnClickOutside = input<boolean>(true);

  /** Whether to close popover when pressing escape */
  closeOnEscape = input<boolean>(true);

  /** Whether the popover is disabled */
  disabled = input<boolean>(false);

  /** Maximum width of the popover */
  maxWidth = input<string>('320px');

  /** Z-index for the popover */
  zIndex = input<number>(1000);

  /** Configuration object for DRY usage */
  config = input<PopoverConfig>();

  // Signal outputs
  /** Event emitted when popover is shown */
  shown = output<void>();

  /** Event emitted when popover is hidden */
  hidden = output<void>();

  // Internal signals
  /** Whether the popover is currently visible */
  readonly isVisible = signal<boolean>(false);

  /** Current trigger element */
  private readonly triggerElement = signal<HTMLElement | null>(null);

  /** Position styles for the popover */
  readonly positionStyles = signal<Record<string, string>>({});

  /** Arrow position styles */
  readonly arrowStyles = signal<Record<string, string>>({});

  // Computed properties that merge config with individual inputs
  readonly mergedPlacement = computed(
    () => this.config()?.placement ?? this.placement()
  );
  readonly mergedOffset = computed(
    () => this.config()?.offset ?? this.offset()
  );
  readonly mergedArrow = computed(() => this.config()?.arrow ?? this.arrow());
  readonly mergedTrigger = computed(
    () => this.config()?.trigger ?? this.trigger()
  );
  readonly mergedCloseOnClickOutside = computed(
    () => this.config()?.closeOnClickOutside ?? this.closeOnClickOutside()
  );
  readonly mergedCloseOnEscape = computed(
    () => this.config()?.closeOnEscape ?? this.closeOnEscape()
  );
  readonly mergedDisabled = computed(
    () => this.config()?.disabled ?? this.disabled()
  );
  readonly mergedMaxWidth = computed(
    () => this.config()?.maxWidth ?? this.maxWidth()
  );
  readonly mergedZIndex = computed(
    () => this.config()?.zIndex ?? this.zIndex()
  );

  /** Computed CSS classes for the popover */
  readonly popoverClasses = computed(() => {
    const baseClasses = 'ntv-popover';
    const placementClass = `ntv-popover--${this.mergedPlacement()}`;
    const visibleClass = this.isVisible()
      ? 'ntv-popover--visible'
      : 'ntv-popover--hidden';

    return [baseClasses, placementClass, visibleClass].join(' ');
  });

  /** Computed styles for the popover container */
  readonly popoverStyles = computed(() => ({
    ...this.positionStyles(),
    'max-width': this.mergedMaxWidth(),
    'z-index': this.mergedZIndex().toString(),
  }));

  private clickOutsideListener?: () => void;

  constructor() {
    // Effect to handle click outside functionality
    effect(() => {
      if (this.isVisible() && this.mergedCloseOnClickOutside()) {
        this.setupClickOutsideListener();
      } else {
        this.removeClickOutsideListener();
      }
    });
  }

  ngOnDestroy(): void {
    this.removeClickOutsideListener();
  }

  /**
   * Toggle the popover visibility
   * @param event - The trigger event
   * @param triggerElement - Optional trigger element, defaults to event target
   */
  public toggle(event: Event, triggerElement?: HTMLElement): void {
    if (this.mergedDisabled()) return;

    const trigger = triggerElement || (event.currentTarget as HTMLElement);
    this.triggerElement.set(trigger);

    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Show the popover
   * @param triggerElement - Optional trigger element
   */
  public show(triggerElement?: HTMLElement): void {
    if (this.mergedDisabled() || this.isVisible()) return;

    if (triggerElement) {
      this.triggerElement.set(triggerElement);
    }

    this.isVisible.set(true);

    // Calculate position after the view updates
    setTimeout(() => {
      this.calculatePosition();
      this.shown.emit();
    });
  }

  /**
   * Hide the popover
   */
  public hide(): void {
    if (!this.isVisible()) return;

    this.isVisible.set(false);
    this.hidden.emit();
  }

  /**
   * Calculate and set the position of the popover
   */
  private calculatePosition(): void {
    const trigger = this.triggerElement();
    const popover = this.popoverContent?.nativeElement;

    if (!trigger || !popover) return;

    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const placement = this.mergedPlacement();
    const offset = this.mergedOffset();

    let top = 0;
    let left = 0;
    // Arrow functionality removed

    // Calculate base position based on placement
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = triggerRect.top + scrollY - popoverRect.height - offset;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = triggerRect.bottom + scrollY + offset;
        break;
      case 'left':
        left = triggerRect.left + scrollX - popoverRect.width - offset;
        break;
      case 'right':
        left = triggerRect.right + scrollX + offset;
        break;
    }

    // Calculate alignment
    switch (placement) {
      case 'top':
      case 'bottom':
        left =
          triggerRect.left +
          scrollX +
          (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
      case 'bottom-start':
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
      case 'bottom-end':
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'left':
      case 'right':
        top =
          triggerRect.top +
          scrollY +
          (triggerRect.height - popoverRect.height) / 2;
        break;
    }

    // Viewport boundary adjustments
    if (left < scrollX) {
      left = scrollX + 8;
    } else if (left + popoverRect.width > scrollX + viewportWidth) {
      left = scrollX + viewportWidth - popoverRect.width - 8;
    }

    if (top < scrollY) {
      top = scrollY + 8;
    } else if (top + popoverRect.height > scrollY + viewportHeight) {
      top = scrollY + viewportHeight - popoverRect.height - 8;
    }

    // Set position styles using fixed positioning to avoid layout shifts
    this.positionStyles.set({
      position: 'fixed',
      top: `${top - scrollY}px`,
      left: `${left - scrollX}px`,
      zIndex: this.mergedZIndex().toString(),
    });
  }

  /**
   * Setup click outside listener
   */
  private setupClickOutsideListener(): void {
    this.removeClickOutsideListener();

    this.clickOutsideListener = this.renderer.listen(
      this.document,
      'click',
      (event: Event) => {
        const target = event.target as HTMLElement;
        const popoverElement = this.elementRef.nativeElement;
        const triggerElement = this.triggerElement();

        if (
          !popoverElement.contains(target) &&
          triggerElement &&
          !triggerElement.contains(target)
        ) {
          this.hide();
        }
      }
    );
  }

  /**
   * Remove click outside listener
   */
  private removeClickOutsideListener(): void {
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
      this.clickOutsideListener = undefined;
    }
  }

  /**
   * Handle escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (this.isVisible() && this.mergedCloseOnEscape()) {
      this.hide();
      keyboardEvent.preventDefault();
    }
  }
}
