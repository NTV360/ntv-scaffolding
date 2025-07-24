import {
  Component,
  ContentChild,
  TemplateRef,
  viewChild,
  viewChildren,
  ElementRef,
  computed,
  signal,
  input,
  output,
  effect,
  untracked,
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
import { TableService } from './services/table.service';
import * as TableUtils from './utils/table.utils';

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
export class Table {
  // 🛡️ Services & DOM References
  /** Used to sanitize potentially unsafe HTML content for safe binding */
  private sanitizer = inject(DomSanitizer);

  /** Reference to the component's root element */
  private el = inject(ElementRef);

  /** Table service for state management and complex operations */
  private tableService = inject(TableService);

  /** Reference to the table header element for dynamic layout calculation */
  public tableHeader =
    viewChild<ElementRef<HTMLTableSectionElement>>('tableHeader');

  /** References to all popover components for closing on scroll */
  public popovers = viewChildren(Popover);

  /** Content projection slot for custom header template */
  @ContentChild('header')
  public headerTemplate!: TemplateRef<any>;

  /** Content projection slot for custom body template */
  @ContentChild('body')
  public bodyTemplate!: TemplateRef<any>;

  /** Content projection slot for custom expanded row template */
  @ContentChild('expandedContent')
  public expandedContentTemplate!: TemplateRef<any>;

  // 🟩 INPUTS

  /** Array of table column definitions */
  public columns = input<TableColumn[]>([]);

  /** Original unmodified input data */
  public value = input<any[]>([]);

  /** Working input data (can change internally) */
  public data = input<any[]>([]);

  /** Optional table styling configuration */
  public tableStyle = input<TableStyle>({});

  /** Enables dragging and reordering of columns */
  public columnDraggable = input<boolean>(false);

  /** Enables expandable rows with custom content */
  public expandableRows = input<boolean>(false);

  /** Default minimum column width (px) */
  public defaultMinWidth = input<number>(100);

  /** Default maximum column width (px) */
  public defaultMaxWidth = input<number>(400);

  /** Toggle to show or hide the column settings icon */
  public showColumnSettings = input<boolean>(true);

  /** Maximum number of rows that can be locked */
  public maxLockedRows = input<number>(3);

  /** Field used to uniquely identify each row for locking or selection */
  public lockIdentifierField = input<string>('licenseKey');

  /** Shows a row index as the first column */
  public hasIndex = input<boolean>(false);

  /** Enables external column management (reordering/visibility) */
  public externalColumnControl = input<boolean>(false);

  /** Enables filter input and logic in header cells */
  public filterEnabled = input<boolean>(false);

  /** Enables checkbox selection of rows */
  public hasCheckBox = input<boolean>(false);

  /** Custom localStorage key for storing column visibility */
  public storageKey = input<string>('ntv-table-columns');

  /** Sets the background color of the table body */
  public readonly tableBGColor = input<string>('#ffffff');

  /** Sets the background color of the table header */
  public readonly tableHeaderBGColor = input<string>('#F9FAFB');

  // 🟦 OUTPUTS

  /** Emits whenever internal data changes */
  public dataChange = output<any[]>();

  /** Emits whenever locked items change */
  public lockedItemsChange = output<any[]>();

  /** Emits when a column is reordered */
  public columnReorder = output<ColumnReorderEvent>();

  /** Emits when column visibility is toggled */
  public columnVisibilityChange = output<{
    column: TableColumn;
    visible: boolean;
  }>();

  /** Emits when internal column configuration changes */
  public columnsChange = output<TableColumn[]>();

  /** Emits when row selection changes via checkbox */
  public selectedRowsChange = output<any[]>();

  // 📦 Internal Constants & Flags

  /** Flag to always persist column visibility in localStorage */
  private readonly persistColumnVisibility = true;

  /** Default table header height fallback */
  private headerHeight = signal<number>(49);

  // 📡 Signals — Internal State

  /** Internal column state for managing column modifications */
  private _internalColumnState = signal<TableColumn[]>([]);

  /** Internal column configuration computed from input columns with localStorage persistence */
  private _columns = computed(() => {
    const inputColumns = this.columns();
    const internalState = this._internalColumnState();

    // If using external control, return empty array (displayColumns will use columns() directly)
    if (this.externalColumnControl()) {
      return [];
    }

    // If no input columns, return empty array
    if (inputColumns.length === 0) {
      return [];
    }

    // If we have internal state modifications, use them
    if (internalState.length > 0) {
      return internalState;
    }

    // Otherwise, apply localStorage persistence if enabled
    return this.persistColumnVisibility
      ? this.tableService.loadColumnVisibilityFromStorage(
          [...inputColumns],
          this.storageKey()
        )
      : [...inputColumns];
  });

  /** Internal computed signal for working table data */
  private _data = computed(() => [...this.data()]);

  /** Internal signal for currently locked rows */
  private _lockedItems = signal<any[]>([]);

  /** Active filters for each column */
  private _filters = signal<Record<string, any>>({});

  /** Active sort field name */
  private _sortField = signal<string | null>(null);

  /** Active sort direction */
  public _sortOrder = signal<'asc' | 'desc'>('asc');

  /** Set of expanded row identifiers */
  private _expandedRows = signal<Set<any>>(new Set());

  /** Number of items shown per page */
  private _itemsPerPage = signal<number>(15);

  /** Currently active page index */
  private _currentPage = signal<number>(1);

  /** Show all rows at once without pagination */
  private _showAllItems = signal<boolean>(false);

  /** Whether to show a loading overlay */
  private _isProcessing = signal<boolean>(false);

  /** Message shown inside the loading overlay */
  private _loadingMessage = signal<string>('Loading...');

  /** Set of selected row identifiers (for checkbox selection) */
  private _selectedRows = signal<Set<any>>(new Set());

  /** Whether the select-all checkbox is currently checked - computed from selected rows */
  private _selectAllComputed = computed(() => {
    const currentData = this.sortedData();
    const selectedRows = this._selectedRows();
    return (
      currentData.length > 0 &&
      currentData.every((row) =>
        selectedRows.has(row[this.lockIdentifierField()])
      )
    );
  });

  /** Current search keyword for column filtering */
  private _columnSearchTerm = signal<string>('');

  /** Whether columns are currently shrunk */
  private _columnsShrunk = signal<boolean>(false);

  // 🧠 Computed Signals — Public

  /** Whether the component is currently processing */
  public isProcessing = computed(() => this._isProcessing());

  /** Message to show in the overlay while processing */
  public loadingMessage = computed(() => this._loadingMessage());

  /** Returns selected rows as an array */
  public selectedRows = computed(() => Array.from(this._selectedRows()));

  /** Whether all visible rows are selected */
  public selectAll = computed(() => this._selectAllComputed());

  /** Whether the selection checkbox is in an indeterminate state */
  public isIndeterminate = computed(() => {
    const selected = this._selectedRows().size;
    const total = this.sortedData().length;
    return selected > 0 && selected < total;
  });

  /** Returns either the external or internal column config */
  public displayColumns = computed(() =>
    this.externalColumnControl() ? this.columns() : this._columns()
  );

  /** Table data after internal transformations */
  public displayData = computed(() => this._data());

  /** Currently locked rows */
  public lockedItems = computed(() => this._lockedItems());

  /** Whether any rows are currently locked */
  public hasLockedRows = computed(() => this.lockedItems().length > 0);

  /** Whether the user can still lock more rows */
  public canLockAnyRows = computed(
    () => this.lockedItems().length < this.maxLockedRows()
  );

  /** Count of locked rows */
  public lockedRowsCount = computed(() => this.lockedItems().length);

  /** Active filter state */
  public filters = computed(() => this._filters());

  /** Currently selected sort field */
  public sortField = computed(() => this._sortField());

  /** Currently selected sort order */
  public get sortOrder() {
    return this._sortOrder();
  }

  // 🖼️ SVG ICONS
  /** SVG icon for column settings */
  public readonly settingsIcon: SafeHtml;

  /** SVG icon for filter button */
  public readonly filtersIcon: SafeHtml;

  /** SVG icon for right-facing arrow (expand row) */
  public readonly rightArrow: SafeHtml;

  /** SVG icon for downward-facing arrow (collapse row) */
  public readonly downArrow: SafeHtml;

  // COMPUTED

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

  constructor() {
    /** START SVG ICONS */
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
    /** END SVG ICONS */

    /**
     * Syncs locked items when data changes to ensure they stay up-to-date.
     * This effect only handles the side effect of updating locked items.
     */
    effect(() => {
      const currentData = this.data();
      this.syncLockedItemsWithData(currentData);
    });

    /**
     * Emits column changes when internal column signal updates.
     * Only emits when external column control is disabled.
     */
    effect(() => {
      if (!this.externalColumnControl()) {
        const cols = this._columns();
        if (cols.length > 0) {
          // Only emit if there are listeners (optional feature)
          this.columnsChange.emit([...cols]);
        }
      }
    });

    /**
     * Emits locked items when the locked items signal updates.
     * Keeps external consumers in sync with internal state.
     */
    effect(() => {
      const locked = this._lockedItems();
      this.lockedItemsChange.emit([...locked]);
    });

    /**
     * Emits selected row data when the selection state changes.
     */
    effect(() => {
      const selectedData = this.getSelectedRowsData();
      this.selectedRowsChange.emit([...selectedData]);
    });

    /**
     * Recalculates table header height when displayed or locked data changes.
     * Uses a timeout to wait for DOM updates before recalculating.
     * Uses untracked() to avoid unnecessary re-runs when calling updateHeaderHeight.
     */
    effect(() => {
      const data = this.displayData();
      const locked = this.lockedItems();
      // Recalculate heights after data changes (with a small delay for DOM updates)
      if (data.length > 0 || locked.length > 0) {
        setTimeout(() => untracked(() => this.updateHeaderHeight()), 100);
      }
    });

    /**
     * Resets pagination when internal data signal changes.
     */
    effect(
      () => {
        const data = this._data();
        // Reset pagination when data changes
        this.resetPagination();
      },
      { allowSignalWrites: true }
    );

    /**
     * Applies dynamic table styles from theme signals (e.g., background colors).
     */
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

    /**
     * Shows a brief loading overlay when external `data()` changes after the initial load.
     * Skips the overlay during the first data initialization to avoid unnecessary UI flicker.
     */
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

    /**
     * Updates header height when the tableHeader viewChild signal changes.
     * Replaces the need for ngAfterViewInit lifecycle hook.
     */
    effect(() => {
      const header = this.tableHeader();
      if (header?.nativeElement) {
        const height = header.nativeElement.offsetHeight;
        this.headerHeight.set(height);
      }
    });
  }
  /**
   * Updates the header height by calculating the current height of the table header element.
   * Sets the calculated height in the `headerHeight` signal for dynamic layout adjustments.
   */
  private updateHeaderHeight(): void {
    const header = this.tableHeader();
    if (header?.nativeElement) {
      const height = header.nativeElement.offsetHeight;
      this.headerHeight.set(height);
    }
  }

  public onColumnReorder(event: ColumnReorderEvent): void {
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
        this.columnReorder.emit(reorderEvent);
      } else {
        // Handle internally
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
    const newColumns = this.tableService.reorderColumns(
      currentColumns,
      event.from,
      event.to
    );

    // Update internal state
    this._internalColumnState.set(newColumns);

    // Save to localStorage if persistence is enabled
    if (this.persistColumnVisibility) {
      this.tableService.saveColumnVisibilityToStorage(
        newColumns,
        this.storageKey()
      );
    }
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
    const newColumns = this.tableService.updateColumnVisibility(
      currentColumns,
      event.column.field,
      event.visible
    );

    // Update internal state
    this._internalColumnState.set(newColumns);

    // Save to localStorage if persistence is enabled
    if (this.persistColumnVisibility) {
      this.tableService.saveColumnVisibilityToStorage(
        newColumns,
        this.storageKey()
      );
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
      this._internalColumnState.set(newColumns);
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
      const newColumns = this.tableService.showAllColumns(currentColumns);
      this._internalColumnState.set(newColumns);

      // Save to localStorage if persistence is enabled
      if (this.persistColumnVisibility) {
        this.tableService.saveColumnVisibilityToStorage(
          newColumns,
          this.storageKey()
        );
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
      this._internalColumnState.set([]);

      // Clear localStorage if persistence is enabled
      if (this.persistColumnVisibility) {
        this.tableService.clearColumnVisibilityFromStorage(this.storageKey());
      }
    }
    // Clear search term and reset shrunk state
    this._columnSearchTerm.set('');
    this._columnsShrunk.set(false);
  }

  lockedRows = computed(() => {
    return this.lockedItems().slice(0, this.maxLockedRows());
  });

  // Filtered data based on current filters
  filteredData = computed(() => {
    return TableUtils.filterData(
      this._data(),
      this._filters(),
      this.displayColumns(),
      this.filterEnabled()
    );
  });

  // Sorted data based on current sort settings
  sortedFilteredData = computed(() => {
    const data = this.filteredData();
    const sortField = this._sortField();
    const sortOrder = this._sortOrder();

    if (!sortField) return data;

    return TableUtils.sortDataByField(
      data,
      sortField,
      sortOrder,
      this.displayColumns()
    );
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
    return TableUtils.isRowLocked(
      item,
      this.lockedItems(),
      this.lockIdentifierField()
    );
  }

  canLockMoreRows(): boolean {
    return TableUtils.canLockMoreRows(
      this.lockedItems().length,
      this.maxLockedRows()
    );
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
    return TableUtils.getRowIndex(
      rowData,
      this.sortedData(),
      this.lockIdentifierField()
    );
  }

  getLockedRowStickyTop(rowData: any): string {
    return TableUtils.getLockedRowStickyTop(
      rowData,
      this.lockedRows(),
      this.lockIdentifierField(),
      this.headerHeight(),
      this.getEstimatedRowHeight()
    );
  }

  private getEstimatedRowHeight(): number {
    // Try to get actual row height from DOM, fallback to estimated value
    const header = this.tableHeader();
    if (header?.nativeElement) {
      const tbody = header.nativeElement.parentElement?.querySelector('tbody');
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

  // Handle scroll events on the table wrapper
  onTableScroll(event: Event): void {
    const target = event.target as HTMLElement;

    // Close all open popovers when scrolling
    this.closeAllPopovers();

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

  // Close all open popovers
  private closeAllPopovers(): void {
    const popoverList = this.popovers();
    if (popoverList) {
      popoverList.forEach((popover) => {
        if (popover.isVisible()) {
          popover.hide();
        }
      });
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

    const newSortState = this.tableService.handleSort(
      field,
      currentSortField,
      currentSortOrder
    );

    this._sortField.set(newSortState.sortField);
    this._sortOrder.set(newSortState.sortOrder);
  }

  clearFilters(): void {
    const resetState = this.tableService.clearFiltersAndSort();
    this._filters.set(resetState.filters);
    this._sortField.set(resetState.sortField);
    this._sortOrder.set(resetState.sortOrder);
  }

  getFilterValue(field: string): any {
    return this._filters()[field] || '';
  }

  hasActiveFilter(field: string): boolean {
    const filterValue = this._filters()[field];
    return TableUtils.hasActiveFilter(filterValue);
  }

  getSortIcon(field: string): string {
    const sortField = this._sortField();
    const sortOrder = this._sortOrder();
    return TableUtils.getSortIcon(field, sortField, sortOrder);
  }

  getUniqueValues(field: string): string[] {
    const data = this._data();
    return TableUtils.getUniqueValues(data, field);
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
    return TableUtils.calculateExpandedContentColspan(
      this.visibleColumns().length,
      this.hasCheckBox(),
      this.hasIndex(),
      this.expandableRows()
    );
  }

  getTotalColumnCount(): number {
    let count = this.visibleColumns().length;
    if (this.hasCheckBox()) count++;
    if (this.hasIndex()) count++;
    if (this.expandableRows()) count++;
    return count;
  }

  // Pagination methods
  showMore(): void {
    const newState = this.tableService.handlePagination(
      this._currentPage(),
      'next'
    );
    this._currentPage.set(newState.currentPage);
    this._showAllItems.set(newState.showAllItems);
  }

  resetPagination(): void {
    const newState = this.tableService.handlePagination(
      this._currentPage(),
      'reset'
    );
    this._currentPage.set(newState.currentPage);
    this._showAllItems.set(newState.showAllItems);
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
    return TableUtils.isRowSelected(
      rowData,
      this._selectedRows(),
      this.lockIdentifierField()
    );
  }

  toggleRowSelection(rowData: any): void {
    const newSelectedRows = this.tableService.toggleRowSelection(
      rowData,
      this._selectedRows(),
      this.lockIdentifierField()
    );
    this._selectedRows.set(newSelectedRows);
  }

  /**
   * Toggles the selection state of all rows on the current page.
   * If all rows are currently selected, they will be deselected; otherwise, all will be selected.
   */
  public toggleSelectAll(): void {
    const currentData = this.sortedData();
    const allSelected = this._selectAllComputed();

    const newSelectedRows = this.tableService.toggleSelectAll(
      currentData,
      this._selectedRows(),
      this.lockIdentifierField(),
      allSelected
    );

    this._selectedRows.set(newSelectedRows);
  }

  /**
   * Retrieves the data for rows that are currently selected.
   *
   * @returns An array of selected row data objects.
   */
  private getSelectedRowsData(): any[] {
    return TableUtils.getSelectedRowsData(
      this._selectedRows(),
      this._data(),
      this.lockIdentifierField()
    );
  }

  /**
   * Syncs locked items with current data to ensure they stay up-to-date.
   * This method handles updating locked items when the data changes.
   */
  private syncLockedItemsWithData(currentData: any[]): void {
    const currentLocked = this._lockedItems();
    const updatedLocked = TableUtils.syncLockedItemsWithData(
      currentLocked,
      currentData,
      this.lockIdentifierField()
    );

    // Only update if there are actual changes
    if (JSON.stringify(currentLocked) !== JSON.stringify(updatedLocked)) {
      this._lockedItems.set(updatedLocked);
    }
  }
}
