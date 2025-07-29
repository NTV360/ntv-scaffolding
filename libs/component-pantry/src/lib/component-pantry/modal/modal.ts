import {
  Component,
  input,
  output,
  computed,
  signal,
  effect,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  ModalConfig,
  ModalSizeVariant,
  ModalVariant,
  ModalPosition,
  ModalBackdrop,
  MODAL_SIZE_PRESETS,
  ModalAlertConfig,
} from './modal.types';

import { FILE_ICONS } from '../../utils';

// Define Lottie animation paths
const LOTTIE_ANIMATIONS = {
  success:
    'https://lottie.host/embed/edfb7c1c-0e19-474c-8a75-9eb838492ee4/Yw3zqGbAy7.lottie',
  error:
    'https://lottie.host/embed/599d70c8-c7be-4b25-a9d4-ec02b6836a8b/nLhUi2h7Qa.lottie',
};

/**
 * Advanced reusable modal component with flexible size variants and content projection support.
 *
 * @description
 * A highly configurable modal component that supports:
 * - Multiple variants (default, form, alert, confirmation)
 * - Flexible sizing (sm, md, lg, xl, custom)
 * - Backdrop customization (blur, dark, none)
 * - Animation and transitions
 * - Accessibility features
 * - Content projection
 * - Alert types with Lottie animations
 *
 * @example
 * ```typescript
 * // Basic usage
 * <ntv-modal [isVisible]="true" size="medium">
 *   <div>Modal content</div>
 * </ntv-modal>
 *
 * // With config object
 * const config: ModalConfig = {
 *   variant: 'form',
 *   size: 'large',
 *   headerTitle: 'Form Modal'
 * };
 * <ntv-modal [config]="config">
 *   <form>...</form>
 * </ntv-modal>
 * ```
 */
@Component({
  selector: 'ntv-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add support for web components
})
/**
 * ModalComponent
 *
 * This component handles the rendering, configuration, and control of a customizable modal dialog.
 * It supports various modal types, positions, animations, and configurations using Angular Signals.
 */
export class ModalComponent implements AfterViewInit, OnDestroy {
  /** Angular zone service */
  private ngZone = inject(NgZone);

  /** DOM sanitizer service for safe resource URLs */
  private sanitizer = inject(DomSanitizer);

  /** Reference to dynamically loaded Lottie animation script */
  private lottieScript?: HTMLScriptElement;

  /** Signal indicating if Lottie script has been loaded */
  protected lottieLoaded = signal<boolean>(false);

  /** Static file icons mapping */
  protected FILE_ICONS = FILE_ICONS;

  // Signal Inputs (Configurable Properties)

  /** Modal size variant */
  size = input<ModalSizeVariant>('medium');

  /** Modal display variant */
  variant = input<ModalVariant>('default');

  /** Modal position */
  position = input<ModalPosition>('center');

  /** Backdrop type */
  backdrop = input<ModalBackdrop>('blur');

  /** Whether the modal is closable */
  closable = input<boolean>(true);

  /** Whether clicking on backdrop closes the modal */
  closeOnBackdrop = input<boolean>(true);

  /** Whether pressing escape key closes the modal */
  closeOnEscape = input<boolean>(true);

  /** Whether modal is displayed in fullscreen */
  fullscreen = input<boolean>(false);

  /** Whether modal content is scrollable */
  scrollable = input<boolean>(false);

  /** Whether modal is centered vertically */
  centered = input<boolean>(true);

  /** Whether to show header section */
  showHeader = input<boolean>(true);

  /** Whether to show footer section */
  showFooter = input<boolean>(false);

  /** Header title text */
  headerTitle = input<string>('');

  /** Header subtitle text */
  headerSubtitle = input<string>('');

  /** Custom class for styling */
  customClass = input<string>('');

  /** Whether modal should have animations */
  animation = input<boolean>(true);

  /** Whether modal closing should be prevented */
  preventClose = input<boolean>(false);

  /** Modal configuration object */
  config = input<ModalConfig>();

  /** Signal controlling modal visibility */
  isVisible = input<boolean>(false);

  // Outputs (Event Emitters)

  /** Event emitted when modal is opened */
  modalOpen = output<void>();

  /** Event emitted when modal is closed */
  modalClose = output<void>();

  /** Event emitted on backdrop click */
  backdropClick = output<void>();

  /** Event emitted when Escape key is pressed */
  escapeKey = output<void>();

  /** Reference to modal content in the template */
  @ViewChild('modalContent') modalContent!: ElementRef;

  /** Internal signal to track modal visibility */
  private _isVisible = signal<boolean>(false);

  /** Signal indicating if modal is animating */
  isAnimating = signal<boolean>(false);

  // Computed Properties for Configuration Merging

  readonly mergedSize = computed(() => this.config()?.size ?? this.size());
  readonly mergedVariant = computed(
    () => this.config()?.variant ?? this.variant()
  );
  readonly mergedPosition = computed(
    () => this.config()?.position ?? this.position()
  );
  readonly mergedBackdrop = computed(
    () => this.config()?.backdrop ?? this.backdrop()
  );
  readonly mergedClosable = computed(
    () => this.config()?.closable ?? this.closable()
  );
  readonly mergedCloseOnBackdrop = computed(
    () => this.config()?.closeOnBackdrop ?? this.closeOnBackdrop()
  );
  readonly mergedCloseOnEscape = computed(
    () => this.config()?.closeOnEscape ?? this.closeOnEscape()
  );
  readonly mergedFullscreen = computed(
    () => this.config()?.fullscreen ?? this.fullscreen()
  );
  readonly mergedScrollable = computed(
    () => this.config()?.scrollable ?? this.scrollable()
  );
  readonly mergedCentered = computed(
    () => this.config()?.centered ?? this.centered()
  );
  readonly mergedShowHeader = computed(
    () => this.config()?.showHeader ?? this.showHeader()
  );
  readonly mergedShowFooter = computed(
    () => this.config()?.showFooter ?? this.showFooter()
  );
  readonly mergedHeaderTitle = computed(
    () => this.config()?.headerTitle ?? this.headerTitle()
  );
  readonly mergedHeaderSubtitle = computed(
    () => this.config()?.headerSubtitle ?? this.headerSubtitle()
  );
  readonly mergedCustomClass = computed(
    () => this.config()?.customClass ?? this.customClass()
  );
  readonly mergedAnimation = computed(
    () => this.config()?.animation ?? this.animation()
  );
  readonly mergedPreventClose = computed(
    () => this.config()?.preventClose ?? this.preventClose()
  );
  readonly mergedCustomSize = computed(() => this.config()?.customSize);

  // Computed Properties for Alert Variant Handling

  /** Whether the current variant is an alert */
  readonly isAlertVariant = computed(() => this.mergedVariant() === 'alert');

  /** Type of alert if applicable */
  readonly alertType = computed(
    () => (this.config() as ModalAlertConfig)?.alertType
  );

  /** Whether to display Lottie animation */
  readonly showLottieAnimation = computed(() => {
    return (
      this.isAlertVariant() &&
      (this.alertType() === 'success' || this.alertType() === 'error') &&
      this.lottieLoaded()
    );
  });

  /** Path to the Lottie animation file */
  readonly lottieAnimationPath = computed<SafeResourceUrl | string>(() =>
    this.showLottieAnimation()
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          LOTTIE_ANIMATIONS[this.alertType()]
        )
      : ''
  );

  // Computed to sync input with internal signal
  readonly isVisibleSignal = computed(() => this._isVisible());

  // Effect to sync input with internal signal
  constructor() {
    effect(() => {
      this._isVisible.set(this.isVisible());
    });
  }

  // Compute the final size configuration
  readonly sizeConfig = computed(() => {
    return (
      this.mergedCustomSize() ??
      MODAL_SIZE_PRESETS[
        this.mergedSize() as keyof typeof MODAL_SIZE_PRESETS
      ] ??
      (typeof this.mergedSize() === 'string' &&
      (this.mergedSize().includes('px') ||
        this.mergedSize().includes('vw') ||
        this.mergedSize().includes('vh') ||
        this.mergedSize().includes('%'))
        ? { width: this.mergedSize(), maxWidth: this.mergedSize() }
        : MODAL_SIZE_PRESETS['medium'])
    );
  });

  readonly modalClasses = computed(() =>
    [
      'modal',
      `modal--${this.mergedSize()}`,
      `modal--${this.mergedVariant()}`,
      `modal--${this.mergedPosition()}`,
      `modal--backdrop-${this.mergedBackdrop()}`,
      this.mergedFullscreen() && 'modal--fullscreen',
      this.mergedScrollable() && 'modal--scrollable',
      this.mergedCentered() && 'modal--centered',
      this.mergedAnimation() && 'modal--animated',
      this.isVisibleSignal() && 'modal--visible',
      this.isAnimating() && 'modal--animating',
      this.mergedCustomClass(),
    ]
      .filter(Boolean)
      .join(' ')
  );

  readonly modalContentClasses = computed(() =>
    [
      'modal__content',
      `modal__content--${this.mergedSize()}`,
      `modal__content--${this.mergedVariant()}`,
      this.mergedFullscreen() && 'modal__content--fullscreen',
    ]
      .filter(Boolean)
      .join(' ')
  );

  readonly modalBackdropClasses = computed(() =>
    [
      'modal__backdrop',
      `modal__backdrop--${this.mergedBackdrop()}`,
      this.isVisibleSignal() && 'modal__backdrop--visible',
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Compute inline style for modal content based on size configuration
  readonly modalContentStyle = computed(() => {
    const sizeConfig = this.sizeConfig();

    return (
      [
        'width',
        'height',
        'maxWidth',
        'maxHeight',
        'minWidth',
        'minHeight',
      ] as const
    ).reduce((style, prop) => {
      const value = sizeConfig[prop];
      if (value) {
        style[prop] = value;
      }
      return style;
    }, {} as Record<string, unknown>);
  });

  // --- Lifecycle hooks ---
  ngAfterViewInit(): void {
    if (this.isVisibleSignal() && this.modalContent?.nativeElement) {
      this.modalContent.nativeElement.focus();
    }

    if (
      this.isAlertVariant() &&
      ['success', 'error'].includes(this.alertType())
    ) {
      this.loadLottieScript();
    }
  }

  /**
   * Loads the Lottie player script if not already loaded
   */
  private loadLottieScript(): void {
    if (this.lottieLoaded()) return;

    this.ngZone.runOutsideAngular(() => {
      const script = document.createElement('script');
      script.src =
        'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
      script.async = true;
      script.onload = () => this.ngZone.run(() => this.lottieLoaded.set(true));
      document.body.appendChild(script);
      this.lottieScript = script;
    });
  }

  ngOnDestroy(): void {
    if (this.lottieScript && document.body.contains(this.lottieScript)) {
      document.body.removeChild(this.lottieScript);
    }
  }

  // --- Modal logic ---
  /**
   * Opens the modal with animation.
   * Emits modalOpen event after animation completes.
   */
  public open(): void {
    if (this.isVisibleSignal()) return;

    this.isAnimating.set(true);
    this._isVisible.set(true);

    setTimeout(() => {
      this.modalOpen.emit();
      this.isAnimating.set(false);
    }, 50);
  }

  /**
   * Closes the modal with animation if not prevented.
   * Emits modalClose event after animation completes.
   */
  public close(): void {
    if (!this.isVisibleSignal() || this.mergedPreventClose()) return;

    this.isAnimating.set(true);
    this._isVisible.set(false);

    setTimeout(() => {
      this.modalClose.emit();
      this.isAnimating.set(false);
    }, 300);
  }

  /**
   * Handles backdrop click events.
   * Closes modal if click target is backdrop and closeOnBackdrop is true.
   * @param event - The click event
   */
  public onBackdropClick = (event: Event): void => {
    if (event.target === event.currentTarget && this.mergedCloseOnBackdrop()) {
      this.backdropClick.emit();
      this.close();
    }
  };

  /**
   * Handles escape key press.
   * Closes modal if visible, closeOnEscape is true, and preventClose is false.
   */
  @HostListener('document:keydown.escape')
  public onEscapeKey = (): void => {
    if (
      this.isVisibleSignal() &&
      this.mergedCloseOnEscape() &&
      !this.mergedPreventClose()
    ) {
      this.escapeKey.emit();
      this.close();
    }
  };

  // --- Template helpers ---
  /**
   * Gets the merged showHeader value from config or input.
   * @returns {boolean} Whether to show the header
   */
  public getShowHeader(): boolean {
    return this.mergedShowHeader();
  }
  /**
   * Gets the merged headerTitle value from config or input.
   * @returns {string} The header title text
   */
  public getHeaderTitle(): string {
    return this.mergedHeaderTitle();
  }
  /**
   * Gets the merged headerSubtitle value from config or input.
   * @returns {string} The header subtitle text
   */
  public getHeaderSubtitle(): string {
    return this.mergedHeaderSubtitle();
  }
  /**
   * Gets the merged closable value from config or input.
   * @returns {boolean} Whether the modal is closable
   */
  public getClosable(): boolean {
    return this.mergedClosable();
  }
  /**
   * Gets the merged showFooter value from config or input.
   * @returns {boolean} Whether to show the footer
   */
  public getShowFooter(): boolean {
    return this.mergedShowFooter();
  }
}
