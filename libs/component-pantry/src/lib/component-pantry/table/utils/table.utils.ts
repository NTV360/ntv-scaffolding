import { TableColumn } from '../table.types';

/**
 * Utility functions for table operations
 * These are pure functions that work independently of component context
 */

/**
 * Gets unique values from a specific field in the data array
 * @param data - Array of data objects
 * @param field - Field name to extract unique values from
 * @returns Sorted array of unique values
 */
export function getUniqueFieldValues(data: any[], field: string): any[] {
  const values = data
    .map((item) => item[field])
    .filter((value) => value !== null && value !== undefined);
  return [...new Set(values)].sort();
}

/**
 * Calculates the expanded content colspan based on table configuration
 * @param visibleColumnsCount - Number of visible columns
 * @param hasCheckBox - Whether table has checkboxes
 * @param hasIndex - Whether table has index column
 * @param hasExpandableRows - Whether table has expandable rows
 * @returns Total colspan value
 */
export function calculateExpandedContentColspan(
  visibleColumnsCount: number,
  hasCheckBox: boolean,
  hasIndex: boolean,
  hasExpandableRows: boolean
): number {
  let colspan = visibleColumnsCount;
  if (hasCheckBox) colspan++;
  if (hasIndex) colspan++;
  if (hasExpandableRows) colspan++;
  return colspan;
}

/**
 * Filters data based on search term and searchable columns
 * @param data - Array of data to filter
 * @param searchTerm - Search term to filter by
 * @param searchableColumns - Columns that can be searched
 * @returns Filtered data array
 */
export function filterDataBySearchTerm(
  data: any[],
  searchTerm: string,
  searchableColumns: TableColumn[]
): any[] {
  if (!searchTerm.trim()) {
    return data;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  return data.filter((item) =>
    searchableColumns.some((column) => {
      const value = item[column.field];
      if (value === null || value === undefined) {
        return false;
      }
      return String(value).toLowerCase().includes(lowerSearchTerm);
    })
  );
}

/**
 * Filters data based on column filters
 * @param data - Array of data to filter
 * @param filters - Object containing filter values by field
 * @param columns - Array of table columns
 * @param filterEnabled - Whether filtering is globally enabled
 * @returns Filtered data array
 */
export function filterData(
  data: any[],
  filters: Record<string, any>,
  columns: TableColumn[],
  filterEnabled: boolean
): any[] {
  // Check if any column has filtering enabled
  const hasFilterEnabledColumns = columns.some(
    (col) => col.filter === true
  );
  if (!hasFilterEnabledColumns && !filterEnabled) {
    return data;
  }

  return data.filter((item) => {
    return Object.keys(filters).every((field) => {
      const filterValue = filters[field];
      if (!filterValue || filterValue === '') return true;

      const itemValue = item[field];
      const column = columns.find((col) => col.field === field);

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
}

/**
 * Sorts data by a specific column
 * @param data - Array of data to sort
 * @param sortField - Field to sort by
 * @param sortDirection - Sort direction ('asc' or 'desc')
 * @param columns - Optional array of columns for type detection
 * @returns Sorted data array
 */
export function sortDataByField(
  data: any[],
  sortField: string,
  sortDirection: 'asc' | 'desc',
  columns?: TableColumn[]
): any[] {
  if (!sortField) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return sortDirection === 'asc' ? -1 : 1;
    }

    // Use column type if available
    const column = columns?.find((col) => col.field === sortField);
    if (column?.filterType === 'date') {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      const comparison = aDate.getTime() - bDate.getTime();
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    if (column?.filterType === 'number') {
      const comparison = Number(aValue) - Number(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    // Handle different data types
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    // Default string comparison
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
    }
  });
}

/**
 * Paginates data array
 * @param data - Array of data to paginate
 * @param currentPage - Current page number (1-based)
 * @param itemsPerPage - Number of items per page
 * @returns Paginated data array
 */
export function paginateData(
  data: any[],
  currentPage: number,
  itemsPerPage: number
): any[] {
  if (itemsPerPage <= 0) {
    return data;
  }
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(0, endIndex);
}

/**
 * Calculates pagination information
 * @param totalItems - Total number of items
 * @param currentPage - Current page number
 * @param itemsPerPage - Items per page
 * @returns Pagination info object
 */
export function calculatePaginationInfo(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): {
  totalPages: number;
  currentlyShowing: number;
  hasMoreItems: boolean;
  startIndex: number;
  endIndex: number;
} {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const currentlyShowing = Math.min(currentPage * itemsPerPage, totalItems);
  const hasMoreItems = currentlyShowing < totalItems;

  return {
    totalPages,
    currentlyShowing,
    hasMoreItems,
    startIndex,
    endIndex
  };
}

/**
 * Validates if a row can be locked based on current locked count and max limit
 * @param currentLockedCount - Current number of locked items
 * @param maxLockedItems - Maximum allowed locked items
 * @returns Whether more rows can be locked
 */
export function canLockMoreRows(
  currentLockedCount: number,
  maxLockedItems: number
): boolean {
  return maxLockedItems === 0 || currentLockedCount < maxLockedItems;
}

/**
 * Checks if a row is locked based on identifier
 * @param rowData - Row data object
 * @param lockedItems - Array of locked items
 * @param identifierField - Field used as identifier
 * @returns Whether the row is locked
 */
export function isRowLocked(
  rowData: any,
  lockedItems: any[],
  identifierField: string
): boolean {
  const identifier = rowData[identifierField];
  return lockedItems.some(
    (lockedItem) => lockedItem[identifierField] === identifier
  );
}

/**
 * Gets the index of a row in the data array
 * @param rowData - Row data object
 * @param data - Complete data array
 * @param identifierField - Field used as identifier
 * @returns Index of the row (0-based) or -1 if not found
 */
export function getRowIndex(
  rowData: any,
  data: any[],
  identifierField: string
): number {
  const identifier = rowData[identifierField];
  return data.findIndex((item) => item[identifierField] === identifier);
}

/**
 * Calculates sticky top position for locked rows
 * @param index - Index of the locked row
 * @param rowHeight - Height of each row in pixels
 * @param headerHeight - Height of the header in pixels
 * @returns Sticky top position in pixels
 */
export function calculateLockedRowStickyTop(
  index: number,
  rowHeight: number,
  headerHeight: number
): number {
  return headerHeight + index * rowHeight;
}

/**
 * Syncs locked items with current data to ensure consistency
 * @param lockedItems - Current locked items
 * @param currentData - Current data array
 * @param identifierField - Field used as identifier
 * @returns Updated locked items array
 */
export function syncLockedItemsWithData(
  lockedItems: any[],
  currentData: any[],
  identifierField: string
): any[] {
  return lockedItems
    .map((lockedItem) => {
      const updatedItem = currentData.find(
        (dataItem) =>
          dataItem[identifierField] === lockedItem[identifierField]
      );
      return updatedItem || lockedItem; // Use updated item if found, otherwise keep original
    })
    .filter((item) =>
      // Remove locked items that no longer exist in the data
      currentData.some(
        (dataItem) => dataItem[identifierField] === item[identifierField]
      )
    );
}

/**
 * Gets selected rows data based on selected identifiers
 * @param selectedIdentifiers - Set of selected identifiers
 * @param allData - Complete data array
 * @param identifierField - Field used as identifier
 * @returns Array of selected row data
 */
export function getSelectedRowsData(
  selectedIdentifiers: Set<string>,
  allData: any[],
  identifierField: string
): any[] {
  return allData.filter((row) => {
    const identifier = row[identifierField];
    return selectedIdentifiers.has(identifier);
  });
}

/**
 * Checks if a row is selected
 * @param rowData - Row data object
 * @param selectedRows - Set of selected row identifiers
 * @param identifierField - Field used as identifier
 * @returns Whether the row is selected
 */
export function isRowSelected(
  rowData: any,
  selectedRows: Set<string>,
  identifierField: string
): boolean {
  const identifier = rowData[identifierField];
  return selectedRows.has(identifier);
}

/**
 * Checks if a row is expanded
 * @param rowData - Row data object
 * @param expandedRows - Set of expanded row identifiers
 * @param identifierField - Field used as identifier
 * @returns Whether the row is expanded
 */
export function isRowExpanded(
  rowData: any,
  expandedRows: Set<string>,
  identifierField: string
): boolean {
  const identifier = rowData[identifierField];
  return expandedRows.has(identifier);
}

/**
 * Gets the sticky top position for a locked row
 * @param rowData - Row data object
 * @param lockedRows - Array of locked rows
 * @param identifierField - Field used as identifier
 * @param headerHeight - Height of the header in pixels
 * @param rowHeight - Height of each row in pixels
 * @returns Sticky top position as CSS string
 */
export function getLockedRowStickyTop(
  rowData: any,
  lockedRows: any[],
  identifierField: string,
  headerHeight: number,
  rowHeight: number
): string {
  const identifier = rowData[identifierField];
  const index = lockedRows.findIndex(
    (lockedRow) => lockedRow[identifierField] === identifier
  );
  
  if (index === -1) {
    return '0px';
  }
  
  const stickyTop = calculateLockedRowStickyTop(index, rowHeight, headerHeight);
  return `${stickyTop}px`;
}

/**
 * Gets unique values from a specific field in the data array
 * @param data - Data array to extract values from
 * @param field - Field name to extract values from
 * @returns Array of unique values sorted alphabetically
 */
export function getUniqueValues(data: any[], field: string): string[] {
  const values = data
    .map((item) => item[field])
    .filter((value) => value !== null && value !== undefined);
  return [...new Set(values)].sort();
}

/**
 * Gets the appropriate sort icon based on current sort state
 * @param field - Field to check sort state for
 * @param currentSortField - Currently active sort field
 * @param currentSortOrder - Current sort order
 * @returns Sort icon string
 */
export function getSortIcon(
  field: string,
  currentSortField: string | null,
  currentSortOrder: 'asc' | 'desc'
): string {
  if (currentSortField !== field) return '↕️';
  return currentSortOrder === 'asc' ? '↑' : '↓';
}

/**
 * Checks if a filter has an active value
 * @param filterValue - The filter value to check
 * @returns Whether the filter is active
 */
export function hasActiveFilter(filterValue: any): boolean {
  return (
    filterValue !== undefined && filterValue !== null && filterValue !== ''
  );
}