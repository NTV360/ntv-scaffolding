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
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThumbnailItemComponent } from '../thumbnail-item/thumbnail-item';
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
  ThumbnailSize,
  ThumbnailVariant,
  ThumbnailLayout,
} from './thumbnail.types';

@Component({
  selector: 'ntv-thumbnail-gallery',
  standalone: true,
  imports: [CommonModule, ThumbnailItemComponent, CdkDropList, CdkDrag],
  templateUrl: './thumbnail-gallery.html',
  styleUrls: ['./thumbnail-gallery.css'],
})
export class ThumbnailGalleryComponent {
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
  draggable = input<boolean>(false);

  // Signal outputs
  itemClick = output<ThumbnailClickEvent>();
  selectionChange = output<ThumbnailSelectionEvent>();
  actionClick = output<ThumbnailActionEvent>();
  contextMenu = output<ThumbnailContextMenuEvent>();
  itemsReorder = output<ThumbnailItem[]>();

  // Internal state
  private selectedItems = signal<Set<string>>(new Set());
  hoveredItem = signal<ThumbnailItem | null>(null);
  contextMenuVisible = signal<boolean>(false);
  contextMenuPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  contextMenuItem = signal<ThumbnailItem | null>(null);
  activeSubmenu = signal<string | null>(null);

  // Dependencies
  private documentListeners: (() => void)[] = [];
  private destroyRef = inject(DestroyRef);
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

  // Computed properties
  readonly mergedConfig = computed(() => {
    const baseConfig = { ...DEFAULT_THUMBNAIL_CONFIG };
    const inputConfig = this.config();
    
    return {
      ...baseConfig,
      ...inputConfig,
      size: inputConfig?.size || this.size(),
      variant: inputConfig?.variant || this.variant(),
      layout: inputConfig?.layout || this.layout(),
      selectable: inputConfig?.selectable ?? this.selectable(),
      multiSelect: inputConfig?.multiSelect ?? this.multiSelect(),
      showLabels: inputConfig?.showLabels ?? this.showLabels(),
      showMetadata: inputConfig?.showMetadata ?? this.showMetadata(),
      showFileSize: inputConfig?.showFileSize ?? this.showFileSize(),
      showModified: inputConfig?.showModified ?? this.showModified(),
      hoverEffects: inputConfig?.hoverEffects ?? this.hoverEffects(),
      clickable: inputConfig?.clickable ?? this.clickable(),
      columns: inputConfig?.columns || this.columns(),
      gap: inputConfig?.gap || this.gap(),
      showActionButtons: inputConfig?.showActionButtons ?? this.showActionButtons(),
    };
  });

  readonly containerClasses = computed(() => {
    const classes = ['thumbnail-gallery'];
    const config = this.mergedConfig();
    
    // Layout
    classes.push(`thumbnail-gallery--${config.layout}`);
    
    // Size
    classes.push(`thumbnail-gallery--${config.size}`);
    
    return classes.join(' ');
  });

  readonly containerStyles = computed(() => {
    const config = this.mergedConfig();
    const styles: { [key: string]: string } = {};
    
    if (config.layout === 'grid') {
      styles['--columns'] = config.columns?.toString() || '4';
      styles['--gap'] = config.gap || '1rem';
    }
    
    return styles;
  });

  readonly itemsWithSelection = computed(() => {
    const selectedSet = this.selectedItems();
    return this.items().map(item => ({
      ...item,
      selected: selectedSet.has(item.id)
    }));
  });

  // Event handlers
  onItemClick(event: ThumbnailClickEvent): void {
    // Emit click event
    this.itemClick.emit(event);
    
    // Handle selection if not handled by item component
    if (this.mergedConfig().selectable) {
      this.toggleSelection(event.item, event.event);
    }
  }

  onSelectionToggle(item: ThumbnailItem): void {
    this.toggleSelection(item, new Event('click'));
  }

  onContextMenuRequest(data: {item: ThumbnailItem, event: Event}): void {
    if (!this.showContextMenu()) return;
    
    const event = data.event as MouseEvent;
    event.preventDefault();
    
    this.contextMenuItem.set(data.item);
    this.contextMenuPosition.set({ x: event.clientX, y: event.clientY });
    this.contextMenuVisible.set(true);
    
    this.contextMenu.emit({
      item: data.item,
      x: event.clientX,
      y: event.clientY,
      event
    });
  }

  onMouseEnter(item: ThumbnailItem): void {
    this.hoveredItem.set(item);
  }

  onMouseLeave(): void {
    this.hoveredItem.set(null);
  }

  onActionClick(action: ThumbnailAction, item: ThumbnailItem, event: Event): void {
    this.actionClick.emit({
      action: action.type,
      item,
      items: action.type.includes('bulk') ? this.getSelectedItems() : undefined,
      event
    });
    
    // Hide context menu after action
    this.hideContextMenu();
  }

  hideContextMenu(): void {
    this.contextMenuVisible.set(false);
    this.activeSubmenu.set(null);
  }

  toggleSubmenu(actionType: string, event?: Event): void {
    if (this.activeSubmenu() === actionType) {
      this.activeSubmenu.set(null);
    } else {
      this.activeSubmenu.set(actionType);
    }
  }

  // Private methods
  private setupDocumentListeners(): void {
    this.cleanupDocumentListeners();
    
    const clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.contextMenuVisible()) return;
      
      const target = event.target as Element;
      const contextMenu = this.document.querySelector('.thumbnail-context-menu');
      
      if (contextMenu && !contextMenu.contains(target)) {
        this.hideContextMenu();
      }
    });
    
    const keyListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.contextMenuVisible()) {
        this.hideContextMenu();
      }
    });
    
    this.documentListeners.push(clickListener, keyListener);
  }

  private cleanupDocumentListeners(): void {
    this.documentListeners.forEach(cleanup => cleanup());
    this.documentListeners = [];
  }

  private toggleSelection(item: ThumbnailItem, event: Event): void {
    const config = this.mergedConfig();
    const currentSelection = new Set(this.selectedItems());
    
    if (config.multiSelect) {
      // Multi-select mode
      if (currentSelection.has(item.id)) {
        currentSelection.delete(item.id);
      } else {
        currentSelection.add(item.id);
      }
    } else {
      // Single-select mode
      if (currentSelection.has(item.id)) {
        // Deselect if already selected
        currentSelection.clear();
      } else {
        // Select this item and deselect others
        currentSelection.clear();
        currentSelection.add(item.id);
      }
    }
    
    this.selectedItems.set(currentSelection);
    
    // Emit selection change
    const selectedItemsList = this.items().filter(i => currentSelection.has(i.id));
    this.selectionChange.emit({
      selectedItems: selectedItemsList,
      item,
      selected: currentSelection.has(item.id),
      event
    });
  }

  // Public methods
  clearSelection(): void {
    this.selectedItems.set(new Set());
    this.selectionChange.emit({
      selectedItems: [],
      item: null,
      selected: false,
      event: new Event('clear')
    });
  }

  selectAll(): void {
    const allIds = new Set(this.items().map(item => item.id));
    this.selectedItems.set(allIds);
    this.selectionChange.emit({
      selectedItems: this.items(),
      item: null,
      selected: true,
      event: new Event('selectAll')
    });
  }

  getSelectedItems(): ThumbnailItem[] {
    const selectedSet = this.selectedItems();
    return this.items().filter(item => selectedSet.has(item.id));
  }

  onDrop(event: CdkDragDrop<ThumbnailItem[]>) {
    const items = [...this.items()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    // Emit the reordered items to the parent component
    this.itemsReorder.emit(items);
  }
}