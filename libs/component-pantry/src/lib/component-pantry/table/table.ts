import {
  Component,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  computed,
  signal,
  input,
  output,
  effect,
  HostListener,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

//Local Imports
import { Popover } from '../popover/popover';
import { Button } from '../button/button';
import { ColumnFilter } from './components/column-filter/column-filter';
import {
  DraggableColumnDirective,
  ExpandableColumnDirective,
} from '../../directives';
import { FILE_ICONS } from '../../utils';
import {
  ColumnReorderEvent,
  CompleteRowContext,
  RowTemplateContext,
  TableColumn,
  TableStyle,
} from './table.types';

//Components
const components = [Button, ColumnFilter, Popover];

@Component({
  selector: 'ntv-table',
  standalone: true,
  imports: [
    CommonModule,
    DraggableColumnDirective,
    ExpandableColumnDirective,
    components,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
})
export class Table implements AfterViewInit {
  // Used to sanitize potentially unsafe HTML content for safe binding
  private sanitizer = inject(DomSanitizer);
  private el = inject(ElementRef);

  // Modern Angular inputs using input() function with better typing
  columns = input<TableColumn[]>([]);
  value = input<any[]>([]);
  data = input<any[]>([]);
  tableStyle = input<TableStyle>({});
  columnDraggable = input<boolean>(false);
  expandableRows = input<boolean>(false);
  defaultMinWidth = input<number>(100);
  defaultMaxWidth = input<number>(400);
  showColumnSettings = input<boolean>(true);
  maxLockedRows = input<number>(3);
  lockIdentifierField = input<string>('licenseKey');
  hasIndex = input<boolean>(false);
  // Optional: Allow external control of column management
  externalColumnControl = input<boolean>(false);
  filterEnabled = input<boolean>(false);
  // Optional: Enable checkbox selection
  hasCheckBox = input<boolean>(false);
  // localStorage persistence for column visibility is always enabled
  private persistColumnVisibility = true;
  // Optional: Custom localStorage key for column visibility
  storageKey = input<string>('ntv-table-columns');

  // Modern Angular outputs using output() function with better typing
  dataChange = output<any[]>();
  lockedItemsChange = output<any[]>();
  // Optional outputs for external column management
  columnReorder = output<ColumnReorderEvent>();
  columnVisibilityChange = output<{ column: TableColumn; visible: boolean }>();
  // New output for when columns change internally
  columnsChange = output<TableColumn[]>();
  // Checkbox selection outputs
  selectedRowsChange = output<any[]>();

  // Sets the background color of the table body
  public readonly tableBGColor = input<string>('#ffffff');

  // Sets the background color of the table header
  public readonly tableHeaderBGColor = input<string>('#F9FAFB');

  // Internal state management using signals
  private _columns = signal<TableColumn[]>([]);
  private _data = signal<any[]>([]);
  private _lockedItems = signal<any[]>([]);
  showColumnSelector = signal<boolean>(false);

  // Filter state management
  private _filters = signal<Record<string, any>>({});
  private _sortField = signal<string | null>(null);
  public _sortOrder = signal<'asc' | 'desc'>('asc');

  // Expandable rows state management
  private _expandedRows = signal<Set<any>>(new Set());

  // Pagination state management
  private _itemsPerPage = signal<number>(15);
  private _currentPage = signal<number>(1);
  private _showAllItems = signal<boolean>(false);

  // Loading overlay state management
  private _isProcessing = signal<boolean>(false);
  private _loadingMessage = signal<string>('Loading...');

  // Checkbox selection state management
  private _selectedRows = signal<Set<any>>(new Set());
  private _selectAll = signal<boolean>(false);

  // Column search state management
  private _columnSearchTerm = signal<string>('');

  // Column expand/shrink state management
  private _columnsShrunk = signal<boolean>(false);

  // Public getter for sort order
  get sortOrder() {
    return this._sortOrder();
  }
  private _activeFilterPopup = signal<string | null>(null);

  // Public getters for loading state
  isProcessing = computed(() => this._isProcessing());
  loadingMessage = computed(() => this._loadingMessage());

  // Public getters for checkbox selection
  selectedRows = computed(() => Array.from(this._selectedRows()));
  selectAll = computed(() => this._selectAll());
  isIndeterminate = computed(() => {
    const selected = this._selectedRows().size;
    const total = this.sortedData().length;
    return selected > 0 && selected < total;
  });

  // Computed properties for internal state
  displayColumns = computed(() => {
    return this.externalColumnControl() ? this.columns() : this._columns();
  });

  displayData = computed(() => this._data());
  lockedItems = computed(() => this._lockedItems());

  // Computed signals for better performance
  hasLockedRows = computed(() => this.lockedItems().length > 0);
  canLockAnyRows = computed(
    () => this.lockedItems().length < this.maxLockedRows()
  );
  lockedRowsCount = computed(() => this.lockedItems().length);

  // Filter and sort computed signals
  filters = computed(() => this._filters());
  sortField = computed(() => this._sortField());

  /** SVG */
  public readonly settingsIcon: SafeHtml;
  public readonly filtersIcon: SafeHtml;
  public readonly rightArrow: SafeHtml;
  public readonly downArrow: SafeHtml;

  constructor() {
    this.filtersIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['FILTER']
    );

    this.settingsIcon = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['SETTINGS']
    );

    this.rightArrow = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['RIGHT_ARROW']
    );

    this.downArrow = this.sanitizer.bypassSecurityTrustHtml(
      FILE_ICONS['DOWN_ARROW']
    );

    // Initialize internal columns from input - only run once during initialization
    effect(
      () => {
        const initialCols = this.columns();
        const currentCols = this._columns();

        // Only initialize if we don't have internal columns yet and we're not using external control
        if (
          initialCols.length > 0 &&
          currentCols.length === 0 &&
          !this.externalColumnControl()
        ) {
          // Load column visibility from localStorage if enabled
          const columnsWithVisibility = this.persistColumnVisibility
            ? this.loadColumnVisibilityFromStorage([...initialCols])
            : [...initialCols];
          this._columns.set(columnsWithVisibility);
        }
      },
      { allowSignalWrites: true }
    );

    // Initialize internal data from input
    effect(
      () => {
        const initialData = this.data();

        // Always update internal data when input changes
        // This ensures the table reflects external data changes
        this._data.set([...initialData]);

        // Update locked items to reflect changes in the data
        // This ensures locked items stay in sync with updated data
        const currentLocked = this._lockedItems();
        const updatedLocked = currentLocked
          .map((lockedItem) => {
            const updatedItem = initialData.find(
              (dataItem) =>
                dataItem[this.lockIdentifierField()] ===
                lockedItem[this.lockIdentifierField()]
            );
            return updatedItem || lockedItem; // Use updated item if found, otherwise keep original
          })
          .filter((item) =>
            // Remove locked items that no longer exist in the data
            initialData.some(
              (dataItem) =>
                dataItem[this.lockIdentifierField()] ===
                item[this.lockIdentifierField()]
            )
          );

        // Only update if there are actual changes
        if (JSON.stringify(currentLocked) !== JSON.stringify(updatedLocked)) {
          this._lockedItems.set(updatedLocked);
        }
      },
      { allowSignalWrites: true }
    );

    // Effect to emit column changes when internal columns change (optional for external tracking)
    effect(() => {
      if (!this.externalColumnControl()) {
        const cols = this._columns();
        if (cols.length > 0) {
          // Only emit if there are listeners (optional feature)
          this.columnsChange.emit([...cols]);
        }
      }
    });

    // Note: Removed automatic data change emission to prevent circular dependency
    // Data changes should be emitted only when user actions modify the data
    // (like locking/unlocking rows), not when external data updates flow in

    // Effect to emit locked items changes
    effect(() => {
      const locked = this._lockedItems();
      this.lockedItemsChange.emit([...locked]);
    });

    // Effect to emit selected rows changes
    effect(() => {
      const selectedData = this.getSelectedRowsData();
      this.selectedRowsChange.emit([...selectedData]);
    });

    // Effect to log when locked items change (for debugging)
    effect(() => {
      const locked = this.lockedItems();
      console.log(`Locked rows count: ${locked.length}`, locked);
    });

    // Effect to recalculate heights when data changes
    effect(() => {
      const data = this.displayData();
      const locked = this.lockedItems();
      // Recalculate heights after data changes (with a small delay for DOM updates)
      if (data.length > 0 || locked.length > 0) {
        setTimeout(() => this.updateHeaderHeight(), 100);
      }
    });

    // Effect to reset pagination when data changes
    effect(
      () => {
        const data = this._data();
        // Reset pagination when data changes
        this.resetPagination();
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.el.nativeElement.style.setProperty(
        '--header-bg-color',
        this.tableHeaderBGColor()
      );

      this.el.nativeElement.style.setProperty(
        '--body-bg-color',
        this.tableBGColor()
      );
    });

    // Track if this is the initial data load
    let isInitialLoad = true;

    // Effect to show loading overlay when data changes (but not on initial load)
    effect(
      () => {
        const data = this.data();
        // Skip loading overlay on initial data load
        if (isInitialLoad) {
          isInitialLoad = false;
          return;
        }
        // Show loading overlay briefly when external data changes after initial load
        if (data.length > 0) {
          this.withLoadingOverlay('Updating data...', 800);
        }
      },
      { allowSignalWrites: true }
    );

    // Effect to keep _selectAll in sync with selected rows
    effect(() => {
      const currentData = this.sortedData();
      const selectedRows = this._selectedRows();
      const allSelected =
        currentData.length > 0 &&
        currentData.every((row) =>
          selectedRows.has(row[this.lockIdentifierField()])
        );
      this._selectAll.set(allSelected);
    });

    // Effect to automatically enable expandable columns when columns are shrunk
    effect(() => {
      const shrunkState = this._columnsShrunk();
      // When columns are shrunk, expandable columns should be automatically enabled
      // This effect just tracks the state - the template will use shouldAutoEnableExpandableColumns()
      console.log('Columns shrunk state changed:', shrunkState);
    });
  }

  ngAfterViewInit(): void {
    // Calculate header height after view initialization
    this.updateHeaderHeight();
  }

  private updateHeaderHeight(): void {
    if (this.tableHeader?.nativeElement) {
      const height = this.tableHeader.nativeElement.offsetHeight;
      this.headerHeight.set(height);
      console.log('Dynamic header height calculated:', height);
    }
  }

  @ContentChild('header') headerTemplate!: TemplateRef<any>;
  @ContentChild('body') bodyTemplate!: TemplateRef<any>;
  @ContentChild('expandedContent') expandedContentTemplate!: TemplateRef<any>;
  @ViewChild('tableHeader', { static: false })
  tableHeader!: ElementRef<HTMLTableSectionElement>;

  // Signal to store dynamic header height
  private headerHeight = signal<number>(49); // Default fallback

  onColumnReorder(event: ColumnReorderEvent): void {
    console.log('Column reorder event received:', event);

    const visibleCols = this.visibleColumns();
    const currentColumns = this._columns(); // Use internal columns signal

    // Validate indices
    if (
      event.from < 0 ||
      event.from >= visibleCols.length ||
      event.to < 0 ||
      event.to >= visibleCols.length
    ) {
      console.warn('Invalid drag indices:', event);
      return;
    }

    const fromColumn = visibleCols[event.from];
    const toColumn = visibleCols[event.to];

    console.log('Reordering columns:', {
      from: { index: event.from, column: fromColumn },
      to: { index: event.to, column: toColumn },
    });

    // Find the actual indices in the full columns array
    const fromIndex = currentColumns.findIndex((col) => col === fromColumn);
    const toIndex = currentColumns.findIndex((col) => col === toColumn);

    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      const reorderEvent: ColumnReorderEvent = {
        from: fromIndex,
        to: toIndex,
      };

      if (this.externalColumnControl()) {
        // Emit event for external handling
        console.log(
          'Emitting column reorder for external handling:',
          reorderEvent
        );
        this.columnReorder.emit(reorderEvent);
      } else {
        // Handle internally
        console.log('Handling column reorder internally:', reorderEvent);
        this.handleColumnReorderInternal(reorderEvent);
      }
    } else {
      console.warn('Could not find column indices or same column drag:', {
        fromIndex,
        toIndex,
        fromColumn,
        toColumn,
      });
    }
  }

  private handleColumnReorderInternal(event: ColumnReorderEvent): void {
    const currentColumns = this._columns();
    const newColumns = [...currentColumns];
    const [movedColumn] = newColumns.splice(event.from, 1);
    newColumns.splice(event.to, 0, movedColumn);
    this._columns.set(newColumns);
  }

  // Computed signals for reactive derived state
  visibleColumns = computed(() => {
    return this._columns().filter((col) => col.visible !== false);
  });

  // Filtered columns based on search term
  filteredColumns = computed(() => {
    const searchTerm = this._columnSearchTerm().toLowerCase();
    if (!searchTerm) {
      return this._columns();
    }
    return this._columns().filter((col) =>
      col.header.toLowerCase().includes(searchTerm)
    );
  });

  // Visible column count for display
  visibleColumnCount = computed(() => {
    return this._columns().filter((col) => col.visible !== false).length;
  });

  // Total column count for display
  totalColumnCount = computed(() => {
    return this._columns().length;
  });

  // Public getter for column search term
  columnSearchTerm = computed(() => this._columnSearchTerm());

  // Public getter for columns shrunk state
  columnsShrunk = computed(() => this._columnsShrunk());

  toggleColumnSelector(): void {
    this.showColumnSelector.update((value) => !value);
  }

  toggleColumnVisibility(column: TableColumn): void {
    const newVisibility = column.visible !== false ? false : true;

    if (this.externalColumnControl()) {
      // Emit event for external handling
      this.columnVisibilityChange.emit({ column, visible: newVisibility });
    } else {
      // Handle internally
      this.handleColumnVisibilityChangeInternal({
        column,
        visible: newVisibility,
      });
    }
  }

  private handleColumnVisibilityChangeInternal(event: {
    column: TableColumn;
    visible: boolean;
  }): void {
    const currentColumns = this._columns();
    const newColumns = currentColumns.map((col) =>
      col.field === event.column.field
        ? { ...col, visible: event.visible }
        : col
    );
    this._columns.set(newColumns);

    // Save to localStorage if persistence is enabled
    if (this.persistColumnVisibility) {
      this.saveColumnVisibilityToStorage(newColumns);
    }
  }

  // Column search functionality
  onColumnSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._columnSearchTerm.set(target.value);
  }

  // Toggle expand/shrink columns
  toggleExpandShrinkColumns(): void {
    const currentShrunkState = this._columnsShrunk();
    this._columnsShrunk.set(!currentShrunkState);

    if (this.externalColumnControl()) {
      // For external control, emit events for each column
      this._columns().forEach((column) => {
        const updatedColumn = {
          ...column,
          shrunk: !currentShrunkState,
        };
        this.columnVisibilityChange.emit({
          column: updatedColumn,
          visible: column.visible !== false,
        });
      });
    } else {
      // Handle internally
      const currentColumns = this._columns();
      const newColumns = currentColumns.map((col) => ({
        ...col,
        shrunk: !currentShrunkState,
      }));
      this._columns.set(newColumns);
    }
  }

  // Get column width based on shrunk state
  getColumnWidth(column: TableColumn): string {
    if (this._columnsShrunk() || column.shrunk) {
      // Calculate dynamic width based on table width and column count
      const visibleCols = this.visibleColumns();
      const dataColumns = visibleCols.filter(
        (col) => !this.isSpecialColumn(col.field)
      );

      // Set a fixed table width and divide by number of data columns
      const tableWidth = 800; // Fixed table width in pixels
      const specialColumnsWidth = this.calculateSpecialColumnsWidth();
      const availableWidth = tableWidth - specialColumnsWidth;
      const columnWidth = Math.floor(availableWidth / dataColumns.length);

      return `${Math.max(columnWidth, 60)}px`; // Minimum 60px per column
    }
    return column.width || '100px'; // Use better default width when expanded
  }

  private isSpecialColumn(field: string): boolean {
    // Check if this is a special column (checkbox, index, expand, actions)
    return (
      field === 'checkbox' ||
      field === 'index' ||
      field === 'expand' ||
      field === 'actions'
    );
  }

  private calculateSpecialColumnsWidth(): number {
    let width = 0;
    if (this.hasCheckBox()) width += 60; // Checkbox column
    if (this.hasIndex()) width += 60; // Index column
    if (this.expandableRows()) width += 50; // Expand column
    // Add action column width if present
    const hasActionColumn = this.visibleColumns().some(
      (col) => col.field === 'actions'
    );
    if (hasActionColumn) width += 100; // Action column
    return width;
  }

  // Check if expandable columns should be automatically enabled
  shouldAutoEnableExpandableColumns(): boolean {
    return this._columnsShrunk();
  }

  // Show all columns
  showAllColumns(): void {
    if (this.externalColumnControl()) {
      // Emit events for external handling
      this._columns().forEach((column) => {
        if (column.visible === false) {
          this.columnVisibilityChange.emit({ column, visible: true });
        }
      });
    } else {
      // Handle internally
      const currentColumns = this._columns();
      const newColumns = currentColumns.map((col) => ({
        ...col,
        visible: true,
      }));
      this._columns.set(newColumns);

      // Save to localStorage if persistence is enabled
      if (this.persistColumnVisibility) {
        this.saveColumnVisibilityToStorage(newColumns);
      }
    }
  }

  // Reset columns to original state
  resetColumns(): void {
    if (this.externalColumnControl()) {
      // For external control, emit events to reset to original columns
      const originalColumns = this.columns();
      originalColumns.forEach((column) => {
        this.columnVisibilityChange.emit({
          column,
          visible: column.visible !== false,
        });
      });
    } else {
      // Handle internally - reset to original columns from input
      const originalColumns = this.columns();
      this._columns.set([...originalColumns]);

      // Clear localStorage if persistence is enabled
      if (this.persistColumnVisibility) {
        this.clearColumnVisibilityFromStorage();
      }
    }
    // Clear search term and reset shrunk state
    this._columnSearchTerm.set('');
    this._columnsShrunk.set(false);
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.column-settings')) {
      this.showColumnSelector.set(false);
    }
    // Close filter popup when clicking outside the filter popup and filter icon
    if (
      !target.closest('.filter-popup') &&
      !target.closest('.filter-icon-btn')
    ) {
      this.closeFilterPopup();
    }
  }

  lockedRows = computed(() => {
    return this.lockedItems().slice(0, this.maxLockedRows());
  });

  // Filtered data based on current filters
  filteredData = computed(() => {
    // Check if any column has filtering enabled
    const hasFilterEnabledColumns = this.displayColumns().some(
      (col) => col.filter === true
    );
    if (!hasFilterEnabledColumns && !this.filterEnabled()) {
      return this._data();
    }

    const data = this._data();
    const filters = this._filters();

    return data.filter((item) => {
      return Object.keys(filters).every((field) => {
        const filterValue = filters[field];
        if (!filterValue || filterValue === '') return true;

        const itemValue = item[field];
        const column = this.displayColumns().find((col) => col.field === field);

        if (!column || !column.filter) return true;

        switch (column.filterType) {
          case 'text':
            return String(itemValue || '')
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
          case 'number':
            return Number(itemValue) === Number(filterValue);
          case 'date':
            // For date filters, we don't filter here as it's handled by sorting
            return true;
          case 'select':
            return itemValue === filterValue;
          default:
            return String(itemValue || '')
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
        }
      });
    });
  });

  // Sorted data based on current sort settings
  sortedFilteredData = computed(() => {
    const data = this.filteredData();
    const sortField = this._sortField();
    const sortOrder = this._sortOrder();

    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle date sorting
      const column = this.displayColumns().find(
        (col) => col.field === sortField
      );
      if (column?.filterType === 'date') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        const comparison = aDate.getTime() - bDate.getTime();
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      // Handle number sorting
      if (column?.filterType === 'number') {
        const comparison = Number(aValue) - Number(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      // Handle text sorting
      const comparison = String(aValue || '').localeCompare(
        String(bValue || '')
      );
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  });

  unlockedRows = computed(() => {
    return this.sortedFilteredData().filter((item) => !this.isRowLocked(item));
  });

  sortedData = computed(() => {
    const allData = [...this.lockedRows(), ...this.unlockedRows()];

    // If showing all items or data is less than items per page, return all data
    if (this._showAllItems() || allData.length <= this._itemsPerPage()) {
      return allData;
    }

    // Calculate how many items to show based on current page
    const itemsToShow = this._currentPage() * this._itemsPerPage();
    return allData.slice(0, itemsToShow);
  });

  // Pagination computed signals
  totalItems = computed(() => {
    return [...this.lockedRows(), ...this.unlockedRows()].length;
  });

  currentlyShowing = computed(() => {
    const total = this.totalItems();
    const showing = this.sortedData().length;
    return Math.min(showing, total);
  });

  hasMoreItems = computed(() => {
    return this.currentlyShowing() < this.totalItems();
  });

  getRowContext<T = any>(rowData: T): RowTemplateContext<T> {
    return {
      $implicit: rowData,
      columns: this.visibleColumns(),
      lockContext: {
        isLocked: this.isRowLocked(rowData),
        onLockRow: this.onLockRow.bind(this),
        onUnlockRow: this.onUnlockRow.bind(this),
        canLockMoreRows: this.canLockMoreRows(),
      },
      isExpanded: this.expandableRows()
        ? this.isRowExpanded(rowData)
        : undefined,
      onToggleExpansion: this.expandableRows()
        ? this.toggleRowExpansion.bind(this)
        : undefined,
      expandIcon: this.expandableRows()
        ? this.getExpandIcon(rowData)
        : undefined,
    };
  }

  getCompleteRowContext<T = any>(
    rowData: T
  ): { $implicit: CompleteRowContext<T> } {
    return {
      $implicit: {
        rowData: rowData,
        columns: this.visibleColumns(),
        lockContext: {
          isLocked: this.isRowLocked(rowData),
          onLockRow: this.onLockRow.bind(this),
          onUnlockRow: this.onUnlockRow.bind(this),
          canLockMoreRows: this.canLockMoreRows(),
        },
        isExpanded: this.expandableRows()
          ? this.isRowExpanded(rowData)
          : undefined,
        onToggleExpansion: this.expandableRows()
          ? this.toggleRowExpansion.bind(this)
          : undefined,
        expandIcon: this.expandableRows()
          ? this.getExpandIcon(rowData)
          : undefined,
      },
    };
  }

  isRowLocked(item: any): boolean {
    return this.lockedItems().some(
      (lockedItem) =>
        lockedItem[this.lockIdentifierField()] ===
        item[this.lockIdentifierField()]
    );
  }

  canLockMoreRows(): boolean {
    return this.lockedItems().length < this.maxLockedRows();
  }

  onLockRow(item: any): void {
    if (!this.isRowLocked(item) && this.canLockMoreRows()) {
      const currentLocked = this._lockedItems();
      this._lockedItems.set([...currentLocked, item]);
      // Emit data change when user action modifies the data order
      this.dataChange.emit([...this._data()]);
    }
  }

  onUnlockRow(item: any): void {
    if (this.isRowLocked(item)) {
      const currentLocked = this._lockedItems();
      this._lockedItems.set(
        currentLocked.filter(
          (locked) =>
            locked[this.lockIdentifierField()] !==
            item[this.lockIdentifierField()]
        )
      );
      // Emit data change when user action modifies the data order
      this.dataChange.emit([...this._data()]);
    }
  }

  getRowIndex(rowData: any): number {
    return this.sortedData().indexOf(rowData) + 1;
  }

  getLockedRowStickyTop(rowData: any): string {
    const lockedRows = this.lockedRows();
    const lockedIndex = lockedRows.findIndex(
      (item) =>
        item[this.lockIdentifierField()] === rowData[this.lockIdentifierField()]
    );

    if (lockedIndex === -1) return `${this.headerHeight()}px`; // Dynamic header height

    // Dynamic header height + (locked row index * estimated row height)
    const headerHeight = this.headerHeight();
    const rowHeight = this.getEstimatedRowHeight();
    const stickyTop = headerHeight + lockedIndex * rowHeight;

    return `${stickyTop}px`;
  }

  private getEstimatedRowHeight(): number {
    // Try to get actual row height from DOM, fallback to estimated value
    if (this.tableHeader?.nativeElement) {
      const tbody =
        this.tableHeader.nativeElement.parentElement?.querySelector('tbody');
      const firstRow = tbody?.querySelector('tr');
      if (firstRow) {
        return firstRow.offsetHeight;
      }
    }
    return 49; // Fallback estimated row height
  }

  // Filter and sort methods
  onFilterChange(field: string, value: any): void {
    const currentFilters = this._filters();
    if (value === '' || value === null || value === undefined) {
      // Remove filter if value is empty
      const { [field]: removed, ...newFilters } = currentFilters;
      this._filters.set(newFilters);
    } else {
      this._filters.set({ ...currentFilters, [field]: value });
    }
  }

  onFilterInputChange(field: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onFilterChange(field, target.value);
  }

  onFilterSelectChange(field: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.onFilterChange(field, target.value);
  }

  toggleFilterPopup(field: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const currentPopup = this._activeFilterPopup();
    this._activeFilterPopup.set(currentPopup === field ? null : field);

    // Position the popup if opening
    if (currentPopup !== field && event) {
      setTimeout(
        () => this.positionFilterPopup(event.target as HTMLElement),
        0
      );
    }
  }

  private positionFilterPopup(triggerElement: HTMLElement): void {
    const popup = document.querySelector('.filter-popup') as HTMLElement;
    if (!popup || !triggerElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate initial position (below the trigger)
    let top = triggerRect.bottom + 4;
    let left = triggerRect.left;

    // Adjust if popup would go off the right edge
    if (left + popupRect.width > viewportWidth) {
      left = triggerRect.right - popupRect.width;
    }

    // Adjust if popup would go off the bottom edge
    if (top + popupRect.height > viewportHeight) {
      top = triggerRect.top - popupRect.height - 4;
    }

    // Ensure popup doesn't go off the left edge
    if (left < 8) {
      left = 8;
    }

    // Ensure popup doesn't go off the top edge
    if (top < 8) {
      top = triggerRect.bottom + 4;
    }

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
  }

  closeFilterPopup(): void {
    this._activeFilterPopup.set(null);
  }

  isFilterPopupOpen(field: string): boolean {
    return this._activeFilterPopup() === field;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close filter popup when clicking outside
    if (this._activeFilterPopup()) this.closeFilterPopup();
  }

  // Handle scroll events on the table wrapper
  onTableScroll(event: Event): void {
    const target = event.target as HTMLElement;

    // Close filter popup when scrolling
    this.closeFilterPopup();

    if (target && this.expandableRows()) {
      // Check if any locked rows have expanded content
      const lockedRows = this.lockedRows();
      const expandedRows = this._expandedRows();

      // Find if any locked row is currently expanded
      const hasExpandedLockedRow = lockedRows.some((row) => {
        const identifier = row[this.lockIdentifierField()];
        return expandedRows.has(identifier);
      });

      // If there's an expanded locked row, animate collapse before closing
      if (hasExpandedLockedRow) {
        this.animateCollapseExpandedRows();
      }
    }
  }

  // Animate collapse of expanded rows with smooth transition
  private animateCollapseExpandedRows(): void {
    // Find all expanded content rows and add collapsing animation
    const expandedRows = document.querySelectorAll('.expanded-content-row');
    const expandedWrappers = document.querySelectorAll(
      '.expanded-content-wrapper'
    );

    // Add fade-out class to wrappers for content animation
    expandedWrappers.forEach((wrapper) => {
      wrapper.classList.add('fade-out');
    });

    // Add collapsing class to rows for height animation
    expandedRows.forEach((row) => {
      row.classList.add('collapsing');
    });

    // Wait for animation to complete before actually removing the expanded state
    setTimeout(() => {
      this._expandedRows.set(new Set());

      // Clean up animation classes after state change
      setTimeout(() => {
        expandedRows.forEach((row) => {
          row.classList.remove('collapsing');
        });
        expandedWrappers.forEach((wrapper) => {
          wrapper.classList.remove('fade-out');
        });
      }, 50);
    }, 300); // Match the CSS animation duration
  }

  onSort(field: string): void {
    const currentSortField = this._sortField();
    const currentSortOrder = this._sortOrder();

    if (currentSortField === field) {
      // Toggle sort order if same field
      this._sortOrder.set(currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      this._sortField.set(field);
      this._sortOrder.set('asc');
    }
  }

  clearFilters(): void {
    this._filters.set({});
    this._sortField.set(null);
    this._sortOrder.set('asc');
  }

  getFilterValue(field: string): any {
    return this._filters()[field] || '';
  }

  hasActiveFilter(field: string): boolean {
    const filterValue = this._filters()[field];
    return (
      filterValue !== undefined && filterValue !== null && filterValue !== ''
    );
  }

  getSortIcon(field: string): string {
    const sortField = this._sortField();
    const sortOrder = this._sortOrder();

    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  }

  getUniqueValues(field: string): string[] {
    const data = this._data();
    const values = data
      .map((item) => item[field])
      .filter((value) => value !== null && value !== undefined);
    return [...new Set(values)].sort();
  }

  // Expandable rows methods
  isRowExpanded(rowData: any): boolean {
    const expandedRows = this._expandedRows();
    const identifier = rowData[this.lockIdentifierField()];
    return expandedRows.has(identifier);
  }

  toggleRowExpansion(rowData: any): void {
    const expandedRows = this._expandedRows();
    const identifier = rowData[this.lockIdentifierField()];

    if (expandedRows.has(identifier)) {
      // If this row is already expanded, animate collapse
      this.animateCollapseSpecificRow(identifier);
    } else {
      // First collapse any currently expanded rows with animation
      if (expandedRows.size > 0) {
        this.animateCollapseExpandedRows();
        // Wait for collapse animation before expanding new row
        setTimeout(() => {
          this._expandedRows.set(new Set([identifier]));
        }, 300);
      } else {
        // No rows expanded, expand immediately
        this._expandedRows.set(new Set([identifier]));
      }
    }
  }

  // Animate collapse of a specific row
  private animateCollapseSpecificRow(identifier: string): void {
    // Use the same approach as animateCollapseExpandedRows for consistency
    // This avoids complex DOM traversal and type issues
    this.animateCollapseExpandedRows();
  }

  getExpandIcon(rowData: any): SafeHtml {
    return this.isRowExpanded(rowData) ? this.downArrow : this.rightArrow;
  }

  getExpandedContentColspan(): number {
    let colspan = this.visibleColumns().length;
    if (this.hasCheckBox()) colspan++;
    if (this.hasIndex()) colspan++;
    if (this.expandableRows()) colspan++;
    return colspan;
  }

  // Pagination methods
  showMore(): void {
    this._currentPage.update((page) => page + 1);
  }

  resetPagination(): void {
    this._currentPage.set(1);
    this._showAllItems.set(false);
  }

  /**
   * Show loading overlay with custom message
   */
  public showLoadingOverlay(message = 'Loading...'): void {
    this._loadingMessage.set(message);
    this._isProcessing.set(true);
  }

  /**
   * Hide loading overlay
   */
  public hideLoadingOverlay(): void {
    this._isProcessing.set(false);
  }

  /**
   * Show loading overlay for a specific duration with custom message
   */
  public withLoadingOverlay(message = 'Processing...', duration = 2000): void {
    this.showLoadingOverlay(message);
    setTimeout(() => {
      this.hideLoadingOverlay();
    }, duration);
  }

  // Checkbox selection methods
  isRowSelected(rowData: any): boolean {
    const identifier = rowData[this.lockIdentifierField()];
    return this._selectedRows().has(identifier);
  }

  toggleRowSelection(rowData: any): void {
    const identifier = rowData[this.lockIdentifierField()];
    const selectedRows = new Set(this._selectedRows());

    if (selectedRows.has(identifier)) {
      selectedRows.delete(identifier);
    } else {
      selectedRows.add(identifier);
    }

    this._selectedRows.set(selectedRows);
  }

  /**
   * Toggles the selection state of all rows on the current page.
   * If all rows are currently selected, they will be deselected; otherwise, all will be selected.
   */
  public toggleSelectAll(): void {
    const currentData = this.sortedData();
    const selectedRows = new Set(this._selectedRows());
    const allSelected = this._selectAll();

    if (allSelected) {
      // Deselect all current page items
      currentData.forEach((row) => {
        const identifier = row[this.lockIdentifierField()];
        selectedRows.delete(identifier);
      });
    } else {
      // Select all current page items
      currentData.forEach((row) => {
        const identifier = row[this.lockIdentifierField()];
        selectedRows.add(identifier);
      });
    }

    this._selectedRows.set(selectedRows);
  }

  /**
   * Retrieves the data for rows that are currently selected.
   *
   * @returns An array of selected row data objects.
   */
  private getSelectedRowsData(): any[] {
    const selectedIdentifiers = this._selectedRows();
    const allData = this._data();
    return allData.filter((row) => {
      const identifier = row[this.lockIdentifierField()];
      return selectedIdentifiers.has(identifier);
    });
  }

  /**
   * Saves the visibility state of each table column to localStorage.
   * This allows restoring user preferences for column visibility on future visits.
   *
   * @param columns - The array of table columns to persist visibility for.
   * @private
   */
  private saveColumnVisibilityToStorage(columns: TableColumn[]): void {
    try {
      const visibilityMap: Record<string, boolean> = {};
      columns.forEach((col) => {
        visibilityMap[col.field] = col.visible !== false;
      });
      localStorage.setItem(this.storageKey(), JSON.stringify(visibilityMap));
    } catch (error) {
      console.warn('Failed to save column visibility to localStorage:', error);
    }
  }

  /**
   * Loads column visibility settings from localStorage and applies them to the provided columns.
   *
   * @param columns - The default array of table columns.
   * @returns The updated array of columns with visibility flags set according to stored preferences.
   * @private
   */
  private loadColumnVisibilityFromStorage(
    columns: TableColumn[]
  ): TableColumn[] {
    try {
      const stored = localStorage.getItem(this.storageKey());
      if (!stored) {
        return columns;
      }

      const visibilityMap: Record<string, boolean> = JSON.parse(stored);
      return columns.map((col) => ({
        ...col,
        visible: Object.prototype.hasOwnProperty.call(visibilityMap, col.field)
          ? visibilityMap[col.field]
          : col.visible !== false,
      }));
    } catch (error) {
      console.warn(
        'Failed to load column visibility from localStorage:',
        error
      );
      return columns;
    }
  }

  /**
   * Clears the saved column visibility settings from localStorage.
   * Useful when resetting table view preferences to default.
   *
   * @private
   */
  private clearColumnVisibilityFromStorage(): void {
    try {
      localStorage.removeItem(this.storageKey());
    } catch (error) {
      console.warn(
        'Failed to clear column visibility from localStorage:',
        error
      );
    }
  }
}
