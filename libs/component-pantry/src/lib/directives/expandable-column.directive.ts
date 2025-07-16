import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[ntvExpandableColumn]',
  standalone: true,
})
export class ExpandableColumnDirective implements OnInit, OnChanges {
  expandableColumn = input<boolean>(false);
  minWidth = input<number>(100);
  maxWidth = input<number>(400);

  private isExpanded = false;
  private originalWidth = '';
  private expandedWidth = '';
  private resizeHandle: HTMLElement | null = null;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    if (this.expandableColumn()) this.setupExpandableColumn();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expandableColumn']) {
      if (this.expandableColumn()) this.setupExpandableColumn();
      else this.cleanupExpandableColumn();
    }

    if (changes['minWidth'] || changes['maxWidth']) {
      if (this.expandableColumn()) this.updateWidthConstraints();
    }
  }

  private setupExpandableColumn() {
    // Avoid duplicate setup
    if (this.resizeHandle) return;

    // Store original width
    const computedStyle = window.getComputedStyle(this.el.nativeElement);
    this.originalWidth = computedStyle.width || `${this.minWidth()}px`;
    this.expandedWidth = `${this.maxWidth()}px`;

    // Add expandable class
    this.renderer.addClass(this.el.nativeElement, 'expandable-column');

    // Create resize handle
    this.createResizeHandle();

    // Set initial width
    this.renderer.setStyle(this.el.nativeElement, 'width', this.originalWidth);
    this.renderer.setStyle(
      this.el.nativeElement,
      'min-width',
      `${this.minWidth()}px`
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'max-width',
      `${this.maxWidth()}px`
    );
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'width 0.3s ease'
    );
  }

  private cleanupExpandableColumn() {
    // Remove expandable class
    this.renderer.removeClass(this.el.nativeElement, 'expandable-column');
    this.renderer.removeClass(this.el.nativeElement, 'expanded');

    // Remove resize handle
    if (this.resizeHandle && this.resizeHandle.parentNode) {
      this.renderer.removeChild(this.el.nativeElement, this.resizeHandle);
      this.resizeHandle = null;
    }

    // Reset styles
    this.renderer.removeStyle(this.el.nativeElement, 'width');
    this.renderer.removeStyle(this.el.nativeElement, 'min-width');
    this.renderer.removeStyle(this.el.nativeElement, 'max-width');
    this.renderer.removeStyle(this.el.nativeElement, 'position');
    this.renderer.removeStyle(this.el.nativeElement, 'transition');

    // Reset state
    this.isExpanded = false;
  }

  private updateWidthConstraints() {
    this.expandedWidth = `${this.maxWidth()}px`;

    // Update CSS constraints
    this.renderer.setStyle(
      this.el.nativeElement,
      'min-width',
      `${this.minWidth()}px`
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'max-width',
      `${this.maxWidth()}px`
    );

    // If currently expanded, adjust to new max width
    if (this.isExpanded) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'width',
        this.expandedWidth
      );
    }
  }

  private createResizeHandle() {
    this.resizeHandle = this.renderer.createElement('div');
    this.renderer.addClass(this.resizeHandle, 'resize-handle');

    // Style the resize handle
    this.renderer.setStyle(this.resizeHandle, 'position', 'absolute');
    this.renderer.setStyle(this.resizeHandle, 'right', '0');
    this.renderer.setStyle(this.resizeHandle, 'top', '0');
    this.renderer.setStyle(this.resizeHandle, 'bottom', '0');
    this.renderer.setStyle(this.resizeHandle, 'width', '4px');
    this.renderer.setStyle(this.resizeHandle, 'background', 'transparent');
    this.renderer.setStyle(this.resizeHandle, 'cursor', 'col-resize');
    this.renderer.setStyle(this.resizeHandle, 'z-index', '10');

    // Add hover effect
    this.renderer.listen(this.resizeHandle, 'mouseenter', () => {
      this.renderer.setStyle(this.resizeHandle, 'background', '#007bff');
    });

    this.renderer.listen(this.resizeHandle, 'mouseleave', () => {
      this.renderer.setStyle(this.resizeHandle, 'background', 'transparent');
    });

    // Add resize functionality
    this.addResizeListeners();

    this.renderer.appendChild(this.el.nativeElement, this.resizeHandle);
  }

  private addResizeListeners() {
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    this.renderer.listen(this.resizeHandle, 'mousedown', (e: MouseEvent) => {
      isResizing = true;
      startX = e.clientX;
      startWidth = this.el.nativeElement.offsetWidth;

      this.renderer.addClass(document.body, 'resizing');
      e.preventDefault();
    });

    this.renderer.listen(document, 'mousemove', (e: MouseEvent) => {
      if (!isResizing) return;

      const width = startWidth + (e.clientX - startX);
      const constrainedWidth = Math.max(
        this.minWidth(),
        Math.min(this.maxWidth(), width)
      );

      this.renderer.setStyle(
        this.el.nativeElement,
        'width',
        `${constrainedWidth}px`
      );
    });

    this.renderer.listen(document, 'mouseup', () => {
      if (isResizing) {
        isResizing = false;
        this.renderer.removeClass(document.body, 'resizing');
      }
    });
  }

  @HostListener('dblclick')
  onDoubleClick() {
    if (!this.expandableColumn()) return;

    this.toggleExpansion();
  }

  private toggleExpansion() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'width',
        this.expandedWidth
      );
      this.renderer.addClass(this.el.nativeElement, 'expanded');
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        'width',
        this.originalWidth
      );
      this.renderer.removeClass(this.el.nativeElement, 'expanded');
    }
  }

  public expandColumn() {
    if (!this.isExpanded) this.toggleExpansion();
  }

  public collapseColumn() {
    if (this.isExpanded) this.toggleExpansion();
  }
}
