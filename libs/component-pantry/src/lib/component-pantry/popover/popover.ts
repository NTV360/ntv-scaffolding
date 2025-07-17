import { Component, input, output, computed, signal, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, HostListener, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverConfig, PopoverPlacement, PopoverTrigger, PopoverVariant, PopoverSize, PopoverPosition } from './popover.types';

/**
 * Advanced popover component with flexible positioning and trigger options
 * 
 * @description A feature-rich popover component that supports:
 * - Multiple placement options (12 positions)
 * - Various trigger types (click, hover, focus, manual)
 * - Multiple visual variants (default, bordered, shadow, minimal)
 * - Flexible sizing options (sm, md, lg, xl)
 * - Arrow indicators with smart positioning
 * - Click outside and escape key closing
 * - Accessibility features
 * - Smooth animations
 * - Custom offset and delay options
 * 
 * @example
 * // Basic usage with click trigger
 * <ntv-popover placement="top" trigger="click">
 *   <button slot="trigger">Click me</button>
 *   <div slot="content">
 *     <h3>Popover Title</h3>
 *     <p>This is the popover content</p>
 *   </div>
 * </ntv-popover>
 * 
 * @example
 * // With configuration object
 * <ntv-popover [config]="popoverConfig">
 *   <span slot="trigger">Hover me</span>
 *   <div slot="content">Hover content here</div>
 * </ntv-popover>
 */
@Component({
  selector: 'ntv-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.html',
  styleUrls: ['./popover.css'],
})
export class Popover implements OnDestroy {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  // ViewChild references
  @ViewChild('triggerElement', { static: false }) triggerElement!: ElementRef;
  @ViewChild('popoverElement', { static: false }) popoverElement!: ElementRef;

  // Signal inputs
  
  /** Placement position of the popover */
  placement = input<PopoverPlacement>('bottom');
  
  /** Trigger type for showing/hiding the popover */
  trigger = input<PopoverTrigger>('click');
  
  /** Visual style variant of the popover */
  variant = input<PopoverVariant>('default');
  
  /** Size of the popover */
  size = input<PopoverSize>('md');
  
  /** Whether to show the arrow indicator */
  showArrow = input<boolean>(true);
  
  /** Offset distance from the trigger element */
  offset = input<number>(8);
  
  /** Delay before showing/hiding (in milliseconds) */
  delay = input<number>(0);
  
  /** Whether to close when clicking outside */
  closeOnClickOutside = input<boolean>(true);
  
  /** Whether to close when pressing escape key */
  closeOnEscape = input<boolean>(true);
  
  /** Whether the popover is disabled */
  disabled = input<boolean>(false);
  
  /** Configuration object for DRY usage */
  config = input<PopoverConfig>();

  // Signal outputs
  
  /**
   * Event emitted when the popover is shown
   */
  popoverShow = output<void>();
  
  /**
   * Event emitted when the popover is hidden
   */
  popoverHide = output<void>();
  
  /**
   * Event emitted when the popover visibility changes
   */
  popoverToggle = output<boolean>();

  // Internal state
  public _isVisible = signal<boolean>(false);
  private _popoverId = signal<string>('popover-' + Math.random().toString(36).substr(2, 9));
  private _position = signal<PopoverPosition>({ top: 0, left: 0 });
  private _hoverTimeout: any;
  private _clickOutsideListener?: () => void;
  private _resizeListener?: () => void;
  private _scrollListener?: () => void;

  // Computed properties that merge config with individual inputs
  
  readonly mergedPlacement = computed(
    () => this.config()?.placement ?? this.placement()
  );
  
  readonly mergedTrigger = computed(
    () => this.config()?.trigger ?? this.trigger()
  );
  
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );
  
  readonly mergedSize = computed(
    () => this.config()?.size ?? this.size()
  );
  
  readonly mergedShowArrow = computed(
    () => this.config()?.showArrow ?? this.showArrow()
  );
  
  readonly mergedOffset = computed(
    () => this.config()?.offset ?? this.offset()
  );
  
  readonly mergedDelay = computed(
    () => this.config()?.delay ?? this.delay()
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

  /** Computed CSS classes for the popover container */
  popoverClasses = computed(() => {
    const baseClasses = 'popover';
    const variantClass = `popover--${this.mergedVariant()}`;
    const sizeClass = `popover--${this.mergedSize()}`;
    const placementClass = `popover--${this.mergedPlacement()}`;
    const visibleClass = this._isVisible() ? 'popover--visible' : '';

    return [baseClasses, variantClass, sizeClass, placementClass, visibleClass]
      .filter(Boolean)
      .join(' ');
  });

  /** Computed CSS classes for the arrow */
  arrowClasses = computed(() => {
    const baseClasses = 'popover__arrow';
    const placementClass = `popover__arrow--${this.mergedPlacement()}`;
    const variantClass = `popover__arrow--${this.mergedVariant()}`;

    return [baseClasses, placementClass, variantClass]
      .filter(Boolean)
      .join(' ');
  });

  /** Computed property for the visible state */
  isVisible = computed(() => this._isVisible());
  
  /** Computed property for the popover ID */
  popoverId = computed(() => this._popoverId());
  
  /** Computed property for the position */
  position = computed(() => this._position());

  /**
   * Shows the popover
   */
  show(): void {
    if (this.mergedDisabled() || this._isVisible()) return;

    const showPopover = () => {
      this._isVisible.set(true);
      // Use setTimeout to ensure DOM is updated before positioning
      setTimeout(() => {
        this.updatePosition();
      }, 0);
      this.popoverShow.emit();
      this.popoverToggle.emit(true);
      this.setupEventListeners();
    };

    if (this.mergedDelay() > 0) {
      this._hoverTimeout = setTimeout(showPopover, this.mergedDelay());
    } else {
      showPopover();
    }
  }

  /**
   * Hides the popover
   */
  hide(): void {
    if (!this._isVisible()) return;

    const hidePopover = () => {
      this._isVisible.set(false);
      this.popoverHide.emit();
      this.popoverToggle.emit(false);
      this.removeEventListeners();
    };

    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }

    if (this.mergedDelay() > 0 && this.mergedTrigger() === 'hover') {
      this._hoverTimeout = setTimeout(hidePopover, this.mergedDelay());
    } else {
      hidePopover();
    }
  }

  /**
   * Toggles the popover visibility
   */
  toggle(): void {
    if (this._isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Handles trigger element events
   */
  onTriggerEvent(event: Event): void {
    if (this.mergedDisabled()) return;

    const triggerType = this.mergedTrigger();
    
    switch (event.type) {
      case 'click':
        if (triggerType === 'click') {
          event.preventDefault();
          this.toggle();
        }
        break;
      case 'mouseenter':
        if (triggerType === 'hover') {
          this.show();
        }
        break;
      case 'mouseleave':
        if (triggerType === 'hover') {
          this.hide();
        }
        break;
      case 'focus':
        if (triggerType === 'focus') {
          this.show();
        }
        break;
      case 'blur':
        if (triggerType === 'focus') {
          this.hide();
        }
        break;
    }
  }

  /**
   * Updates the popover position based on placement
   */
  private updatePosition(): void {
    if (!this.triggerElement || !this.popoverElement) return;

    const triggerRect = this.triggerElement.nativeElement.getBoundingClientRect();
    const popoverRect = this.popoverElement.nativeElement.getBoundingClientRect();
    const placement = this.mergedPlacement();
    const offset = this.mergedOffset();
    
    const position: PopoverPosition = { top: 0, left: 0 };
    
    // Calculate base position
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        position.top = triggerRect.top - popoverRect.height - offset;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        position.top = triggerRect.bottom + offset;
        break;
      case 'left':
      case 'left-start':
      case 'left-end':
        position.left = triggerRect.left - popoverRect.width - offset;
        break;
      case 'right':
      case 'right-start':
      case 'right-end':
        position.left = triggerRect.right + offset;
        break;
    }
    
    // Calculate secondary axis position
    switch (placement) {
      case 'top':
      case 'bottom':
        position.left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
      case 'bottom-start':
        position.left = triggerRect.left;
        break;
      case 'top-end':
      case 'bottom-end':
        position.left = triggerRect.right - popoverRect.width;
        break;
      case 'left':
      case 'right':
        position.top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        break;
      case 'left-start':
      case 'right-start':
        position.top = triggerRect.top;
        break;
      case 'left-end':
      case 'right-end':
        position.top = triggerRect.bottom - popoverRect.height;
        break;
    }
    
    // Ensure popover stays within viewport
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    position.left = Math.max(8, Math.min(position.left, viewport.width - popoverRect.width - 8));
    position.top = Math.max(8, Math.min(position.top, viewport.height - popoverRect.height - 8));
    
    this._position.set(position);
  }

  /**
   * Sets up event listeners for closing the popover
   */
  private setupEventListeners(): void {
    if (this.mergedCloseOnClickOutside()) {
      this._clickOutsideListener = this.renderer.listen('document', 'click', (event) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.hide();
        }
      });
    }

    this._resizeListener = this.renderer.listen('window', 'resize', () => {
      this.updatePosition();
    });

    this._scrollListener = this.renderer.listen('window', 'scroll', () => {
      this.updatePosition();
    });
  }

  /**
   * Removes event listeners
   */
  private removeEventListeners(): void {
    if (this._clickOutsideListener) {
      this._clickOutsideListener();
      this._clickOutsideListener = undefined;
    }
    if (this._resizeListener) {
      this._resizeListener();
      this._resizeListener = undefined;
    }
    if (this._scrollListener) {
      this._scrollListener();
      this._scrollListener = undefined;
    }
  }

  /**
   * Handles escape key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.mergedCloseOnEscape() && this._isVisible()) {
      this.hide();
    }
  }

  /**
   * Component cleanup
   */
  ngOnDestroy(): void {
    this.removeEventListeners();
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
  }
}
