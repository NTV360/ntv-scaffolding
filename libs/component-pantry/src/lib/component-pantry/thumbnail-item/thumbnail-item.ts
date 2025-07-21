import {
  Component,
  input,
  output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ThumbnailItem,
  ThumbnailSize,
  ThumbnailVariant,
  ThumbnailLayout,
  ThumbnailClickEvent,
  FILE_TYPE_ICONS,
  FILE_TYPE_COLORS,
} from '../thumbnail-gallery/thumbnail.types';

@Component({
  selector: 'ntv-thumbnail-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thumbnail-item.html',
  styleUrls: ['./thumbnail-item.css'],
})
export class ThumbnailItemComponent {
  // Signal inputs
  item = input.required<ThumbnailItem>();
  index = input<number>(0);
  size = input<ThumbnailSize>('md');
  variant = input<ThumbnailVariant>('default');
  layout = input<ThumbnailLayout>('grid');
  selectable = input<boolean>(false);
  showLabels = input<boolean>(true);
  showMetadata = input<boolean>(false);
  showFileSize = input<boolean>(false);
  showModified = input<boolean>(false);
  hoverEffects = input<boolean>(true);
  clickable = input<boolean>(true);
  showActionButtons = input<boolean>(true);

  // Signal outputs
  itemClick = output<ThumbnailClickEvent>();
  selectionToggle = output<ThumbnailItem>();
  contextMenuRequest = output<{item: ThumbnailItem, event: Event}>();
  mouseEnter = output<ThumbnailItem>();
  mouseLeave = output<void>();

  // Internal state
  isHovered = signal<boolean>(false);

  readonly itemClasses = computed(() => {
    const classes = ['thumbnail-item'];
    
    // Layout
    classes.push(`thumbnail-item--${this.layout()}`);
    
    // Size
    if (this.layout() === 'grid') {
      classes.push(`thumbnail-container--${this.size()}`);
    }
    
    // Variant
    if (this.variant() !== 'default') {
      classes.push(`thumbnail-item--${this.variant()}`);
    }
    
    // Selection
    if (this.item().selected) {
      classes.push('thumbnail-item--selected');
    }
    
    // Clickable
    if (this.clickable()) {
      classes.push('thumbnail-item--clickable');
    }
    
    // Hover effects
    if (this.hoverEffects()) {
      classes.push('thumbnail-item--hover');
    }
    
    return classes.join(' ');
  });

  onItemClick(event: Event): void {
    if (!this.clickable()) return;
    
    const thumbnailEvent: ThumbnailClickEvent = {
      item: this.item(),
      index: this.index(),
      event
    };
    
    this.itemClick.emit(thumbnailEvent);
  }

  onCheckboxClick(event: Event): void {
    event.stopPropagation();
    if (this.selectable()) {
      this.selectionToggle.emit(this.item());
    }
  }

  onContextMenu(event: Event): void {
    event.preventDefault();
    this.contextMenuRequest.emit({item: this.item(), event});
  }

  onMoreOptionsClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.contextMenuRequest.emit({item: this.item(), event});
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    this.mouseEnter.emit(this.item());
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    this.mouseLeave.emit();
  }

  getFileIcon(): string {
    const item = this.item();
    return item.icon || FILE_TYPE_ICONS[item.type] || FILE_TYPE_ICONS.unknown;
  }

  getFileTypeColor(): string {
    return FILE_TYPE_COLORS[this.item().type] || FILE_TYPE_COLORS.unknown;
  }

  formatFileSize(size: string | undefined): string {
    if (!size) return '';
    
    // Simple formatting for common file size formats
    if (/^\d+(\.\d+)?\s*(KB|MB|GB|TB)$/i.test(size)) {
      return size;
    }
    
    // Try to parse as number of bytes
    const bytes = parseInt(size, 10);
    if (isNaN(bytes)) return size;
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let value = bytes;
    
    while (value >= 1024 && i < units.length - 1) {
      value /= 1024;
      i++;
    }
    
    return `${value.toFixed(1)} ${units[i]}`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    
    // Check if it's already a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';
    
    // Format: MMM DD, YYYY
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}