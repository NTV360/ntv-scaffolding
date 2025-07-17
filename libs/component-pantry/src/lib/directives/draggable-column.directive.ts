import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  input,
  output,
  inject,
} from '@angular/core';

// Modern interface for column reorder event
export interface ColumnReorderEvent {
  from: number;
  to: number;
}

@Directive({
  selector: '[ntvDraggableColumn]',
  standalone: true,
})
export class DraggableColumnDirective {
  // Modern Angular signals
  dragData = input<any>();
  dragIndex = input<number>(0);
  columnField = input<string>(''); // Add column field for better tracking
  columnReorder = output<ColumnReorderEvent>();

  private isDragging = false;

  private placeholder: HTMLElement | null = null;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
    this.renderer.addClass(this.el.nativeElement, 'draggable-column');
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    this.isDragging = true;

    // Set drag data using signal values
    if (event.dataTransfer) {
      const dragIndex = this.dragIndex();
      const columnField = this.columnField();
      event.dataTransfer.setData('text/plain', dragIndex.toString());
      event.dataTransfer.setData(
        'application/json',
        JSON.stringify({ index: dragIndex, field: columnField })
      );
      event.dataTransfer.effectAllowed = 'move';
    }

    // Add dragging class for visual feedback
    this.renderer.addClass(this.el.nativeElement, 'dragging');

    // Create placeholder
    this.createPlaceholder();
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    this.isDragging = false;
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
    this.removePlaceholder();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    if (!this.isDragging) {
      this.renderer.addClass(this.el.nativeElement, 'drag-over');
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    // Only remove class if we're actually leaving the element
    const rect = this.el.nativeElement.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      this.renderer.removeClass(this.el.nativeElement, 'drag-over');
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.renderer.removeClass(this.el.nativeElement, 'drag-over');

    if (event.dataTransfer) {
      const fromIndex = parseInt(event.dataTransfer.getData('text/plain'));
      const toIndex = this.dragIndex();

      // Additional validation using JSON data if available
      try {
        const dragData = event.dataTransfer.getData('application/json');
        if (dragData) {
          const parsedData = JSON.parse(dragData);
          console.log('Drag operation:', {
            from: parsedData.index,
            to: toIndex,
            fromField: parsedData.field,
            toField: this.columnField(),
          });
        }
      } catch (e) {
        // Fallback to basic drag operation
      }

      if (fromIndex !== toIndex && fromIndex >= 0 && toIndex >= 0) {
        this.columnReorder.emit({ from: fromIndex, to: toIndex });
      }
    }
  }

  private createPlaceholder(): void {
    // Instead of creating a new DOM element that disrupts table layout,
    // we'll just add visual feedback to the original element
    // The placeholder creation is commented out to prevent layout issues

    // Add visual feedback to indicate dragging state
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotate(2deg)');
  }

  private removePlaceholder(): void {
    // Remove the visual feedback styles
    this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');

    // Clean up any existing placeholder if it exists
    if (this.placeholder && this.placeholder.parentNode) {
      this.renderer.removeChild(this.placeholder.parentNode, this.placeholder);
      this.placeholder = null;
    }
  }
}
