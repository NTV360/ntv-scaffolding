import {
  Component,
  input,
  output,
  computed,
  signal,
  inject,
  effect,
  Renderer2,
  DOCUMENT,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ThumbnailItem,
  ThumbnailConfig,
  ThumbnailClickEvent,
  ThumbnailSelectionEvent,
  ThumbnailActionEvent,
  ThumbnailContextMenuEvent,
  ThumbnailAction,
  DEFAULT_THUMBNAIL_CONFIG,
  DEFAULT_THUMBNAIL_ACTIONS,
  FILE_TYPE_ICONS,
  FILE_TYPE_COLORS,
  ThumbnailSize,
  ThumbnailVariant,
  ThumbnailLayout,
} from './thumbnail.types';

/**
 * Advanced thumbnail gallery component with Dropbox-style grid layout
 *
 * @description A highly configurable thumbnail component that supports:
 * - Grid and list layout modes
 * - Multiple file type support (images, videos, documents, folders, etc.)
 * - Single and multi-selection capabilities
 * - Customizable sizing and styling variants
 * - Hover effects and click interactions
 * - File metadata display (size, modified date, dimensions)
 * - Responsive grid layout with configurable columns
 * - Modern Angular 20 features (signals, control flow)
 *
 * @example
 * // Basic grid usage
 * <ntv-thumbnail
 *   [items]="files"
 *   [config]="{ layout: 'grid', selectable: true }"
 *   (itemClick)="onItemClick($event)"
 *   (selectionChange)="onSelectionChange($event)">
 * </ntv-thumbnail>
 *
 * @example
 * // List layout with metadata
 * <ntv-thumbnail
 *   [items]="documents"
 *   [config]="{ layout: 'list', showMetadata: true, showFileSize: true }">
 * </ntv-thumbnail>
 */
@Component({
  selector: 'ntv-thumbnail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thumbnail.html',
  styleUrls: ['./thumbnail.css'],
})
export class Thumbnail {
  // Signal inputs
  items = input<ThumbnailItem[]>([]);
  config = input<ThumbnailConfig>();

  // Individual property inputs (for backward compatibility)
  size = input<ThumbnailSize>('md');
  variant = input<ThumbnailVariant>('default');
  layout = input<ThumbnailLayout>('grid');
  selectable = input<boolean>(false);
  multiSelect = input<boolean>(false);
  showLabels = input<boolean>(true);
  showMetadata = input<boolean>(false);
  showFileSize = input<boolean>(false);
  showModified = input<boolean>(false);
  hoverEffects = input<boolean>(true);
  clickable = input<boolean>(true);
  columns = input<number>(4);
  gap = input<string>('1rem');
  contextMenuActions = input<ThumbnailAction[]>(DEFAULT_THUMBNAIL_ACTIONS);
  showContextMenu = input<boolean>(true);
  showActionButtons = input<boolean>(true);

  // Signal outputs
  itemClick = output<ThumbnailClickEvent>();
  selectionChange = output<ThumbnailSelectionEvent>();
  actionClick = output<ThumbnailActionEvent>();
  contextMenu = output<ThumbnailContextMenuEvent>();

  // Internal state
  private selectedItems = signal<Set<string>>(new Set());
  hoveredItem = signal<ThumbnailItem | null>(null);
  contextMenuVisible = signal<boolean>(false);
  contextMenuPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  contextMenuItem = signal<ThumbnailItem | null>(null);
  activeSubmenu = signal<string | null>(null);

  // Document listeners cleanup functions
  private documentListeners: (() => void)[] = [];

  // Injected services
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  constructor() {
    // Setup document listeners when context menu is visible
    effect(() => {
      if (this.contextMenuVisible()) {
        this.setupDocumentListeners();
      } else {
        this.cleanupDocumentListeners();
      }
    });
  }

  // Computed properties using config merging pattern
  readonly mergedConfig = computed(() => {
    const configValue = this.config();
    return {
      ...DEFAULT_THUMBNAIL_CONFIG,
      ...configValue,
      size: configValue?.size ?? this.size(),
      variant: configValue?.variant ?? this.variant(),
      layout: configValue?.layout ?? this.layout(),
      selectable: configValue?.selectable ?? this.selectable(),
      multiSelect: configValue?.multiSelect ?? this.multiSelect(),
      showLabels: configValue?.showLabels ?? this.showLabels(),
      showMetadata: configValue?.showMetadata ?? this.showMetadata(),
      showFileSize: configValue?.showFileSize ?? this.showFileSize(),
      showModified: configValue?.showModified ?? this.showModified(),
      hoverEffects: configValue?.hoverEffects ?? this.hoverEffects(),
      clickable: configValue?.clickable ?? this.clickable(),
      columns: configValue?.columns ?? this.columns(),
      gap: configValue?.gap ?? this.gap(),
    };
  });

  readonly containerClasses = computed(() => {
    const config = this.mergedConfig();
    return [
      'thumbnail-container',
      `thumbnail-container--${config.layout}`,
      `thumbnail-container--${config.size}`,
      `thumbnail-container--${config.variant}`,
      config.selectable ? 'thumbnail-container--selectable' : '',
      config.hoverEffects ? 'thumbnail-container--hover-effects' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly containerStyles = computed(() => {
    const config = this.mergedConfig();
    if (config.layout === 'grid') {
      return {
        display: 'grid',
        'grid-template-columns': `repeat(${config.columns}, 1fr)`,
        gap: config.gap,
      };
    }
    return {
      display: 'flex',
      'flex-direction': 'column',
      gap: config.gap,
    };
  });

  readonly itemsWithSelection = computed(() => {
    const selectedSet = this.selectedItems();
    return this.items().map((item) => ({
      ...item,
      selected: selectedSet.has(item.id),
    }));
  });

  // Methods
  onItemClick(item: ThumbnailItem, index: number, event: Event): void {
    const config = this.mergedConfig();

    if (!config.clickable) return;

    // Handle selection
    if (config.selectable) {
      this.toggleSelection(item, event);
    }

    // Emit click event
    this.itemClick.emit({ item, index, event });
  }

  onContextMenu(item: ThumbnailItem, event: Event): void {
    if (!this.showContextMenu()) return;

    event.preventDefault();
    event.stopPropagation();

    // Prevent default for space key to avoid page scrolling
    if (event instanceof KeyboardEvent && event.key === ' ') {
      event.preventDefault();
    }

    let x = 0,
      y = 0;

    if (event instanceof MouseEvent) {
      x = event.clientX;
      y = event.clientY;
    } else if (event instanceof KeyboardEvent) {
      // For keyboard events, position near the target element
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.bottom;
    }

    this.contextMenuItem.set(item);
    this.contextMenuPosition.set({ x, y });
    this.contextMenuVisible.set(true);
    this.activeSubmenu.set(null);

    this.contextMenu.emit({ item, x, y, event });
  }

  onActionClick(
    action: ThumbnailAction,
    item: ThumbnailItem,
    event: Event
  ): void {
    event.stopPropagation();

    // Prevent default for space key to avoid page scrolling
    if (event instanceof KeyboardEvent && event.key === ' ') {
      event.preventDefault();
    }

    const selectedItemsArray = this.items().filter((i) =>
      this.selectedItems().has(i.id)
    );
    const items = selectedItemsArray.length > 0 ? selectedItemsArray : [item];

    this.actionClick.emit({
      action: action.type,
      item,
      items: items.length > 1 ? items : undefined,
      event,
    });

    this.hideContextMenu();
  }

  hideContextMenu(): void {
    this.contextMenuVisible.set(false);
    this.contextMenuItem.set(null);
    this.activeSubmenu.set(null);
  }

  toggleSubmenu(actionType: string, event?: Event): void {
    // Prevent default for space key to avoid page scrolling
    if (event instanceof KeyboardEvent && event.key === ' ') {
      event.preventDefault();
    }

    this.activeSubmenu.set(
      this.activeSubmenu() === actionType ? null : actionType
    );
  }

  onMouseEnter(item: ThumbnailItem): void {
    this.hoveredItem.set(item);
  }

  onMouseLeave(): void {
    this.hoveredItem.set(null);
  }

  private setupDocumentListeners(): void {
    // Cleanup existing listeners first
    this.cleanupDocumentListeners();

    // Add click listener
    const clickListener = this.renderer.listen(
      this.document,
      'click',
      (event: Event) => {
        this.hideContextMenu();
      }
    );

    // Add escape key listener
    const keyListener = this.renderer.listen(
      this.document,
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.hideContextMenu();
        }
      }
    );

    this.documentListeners = [clickListener, keyListener];
  }

  private cleanupDocumentListeners(): void {
    this.documentListeners.forEach((cleanup) => cleanup());
    this.documentListeners = [];
  }

  private toggleSelection(item: ThumbnailItem, event: Event): void {
    const config = this.mergedConfig();
    const currentSelected = new Set(this.selectedItems());

    if (config.multiSelect && (event as KeyboardEvent).ctrlKey) {
      // Multi-select with Ctrl key
      if (currentSelected.has(item.id)) {
        currentSelected.delete(item.id);
      } else {
        currentSelected.add(item.id);
      }
    } else if (config.multiSelect && (event as KeyboardEvent).shiftKey) {
      // Range selection with Shift key (simplified)
      currentSelected.add(item.id);
    } else {
      // Single selection or toggle
      if (config.multiSelect) {
        // In multi-select mode, allow toggling
        if (currentSelected.has(item.id)) {
          currentSelected.delete(item.id);
        } else {
          currentSelected.add(item.id);
        }
      } else {
        // In single-select mode, allow toggling selection
        if (currentSelected.has(item.id)) {
          currentSelected.delete(item.id);
        } else {
          currentSelected.clear();
          currentSelected.add(item.id);
        }
      }
    }

    this.selectedItems.set(currentSelected);

    // Emit selection change
    const selectedItems = this.items().filter((i) => currentSelected.has(i.id));
    this.selectionChange.emit({
      selectedItems,
      item,
      selected: currentSelected.has(item.id),
    });
  }

  getItemClasses(item: ThumbnailItem): string {
    const config = this.mergedConfig();
    const isSelected = this.selectedItems().has(item.id);

    return [
      'thumbnail-item',
      `thumbnail-item--${config.layout}`,
      `thumbnail-item--${config.size}`,
      `thumbnail-item--${config.variant}`,
      `thumbnail-item--${item.type}`,
      isSelected ? 'thumbnail-item--selected' : '',
      config.clickable ? 'thumbnail-item--clickable' : '',
      config.hoverEffects ? 'thumbnail-item--hover' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  getFileIcon(item: ThumbnailItem): string {
    return item.icon || FILE_TYPE_ICONS[item.type] || FILE_TYPE_ICONS.unknown;
  }

  getFileTypeColor(item: ThumbnailItem): string {
    return FILE_TYPE_COLORS[item.type] || FILE_TYPE_COLORS.unknown;
  }

  formatFileSize(size: string | undefined): string {
    if (!size) return '';

    // If size is already formatted, return as is
    if (isNaN(Number(size))) return size;

    // Convert bytes to human readable format
    const bytes = Number(size);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let fileSize = bytes;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  }

  // Public API methods
  clearSelection(): void {
    this.selectedItems.set(new Set());
    this.selectionChange.emit({
      selectedItems: [],
      item: this.items()[0], // placeholder
      selected: false,
    });
  }

  selectAll(): void {
    const allIds = new Set(this.items().map((item) => item.id));
    this.selectedItems.set(allIds);
    this.selectionChange.emit({
      selectedItems: this.items(),
      item: this.items()[0], // placeholder
      selected: true,
    });
  }

  getSelectedItems(): ThumbnailItem[] {
    const selectedSet = this.selectedItems();
    return this.items().filter((item) => selectedSet.has(item.id));
  }
}
