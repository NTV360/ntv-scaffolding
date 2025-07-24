import { Injectable } from '@angular/core';
import { TableColumn } from '../table.types';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  /**
   * Saves the visibility state of each table column to localStorage.
   * This allows restoring user preferences for column visibility on future visits.
   *
   * @param columns - The array of table columns to persist visibility for.
   * @param storageKey - The key to use for localStorage
   */
  saveColumnVisibilityToStorage(columns: TableColumn[], storageKey: string): void {
    try {
      const visibilityMap: Record<string, boolean> = {};
      columns.forEach((col) => {
        visibilityMap[col.field] = col.visible !== false;
      });
      localStorage.setItem(storageKey, JSON.stringify(visibilityMap));
    } catch (error) {
      console.warn('Failed to save column visibility to localStorage:', error);
    }
  }

  /**
   * Loads column visibility settings from localStorage and applies them to the provided columns.
   *
   * @param columns - The default array of table columns.
   * @param storageKey - The key to use for localStorage
   * @returns The updated array of columns with visibility flags set according to stored preferences.
   */
  loadColumnVisibilityFromStorage(
    columns: TableColumn[],
    storageKey: string
  ): TableColumn[] {
    try {
      const stored = localStorage.getItem(storageKey);
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
   * @param storageKey - The key to use for localStorage
   */
  clearColumnVisibilityFromStorage(storageKey: string): void {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn(
        'Failed to clear column visibility from localStorage:',
        error
      );
    }
  }

  /**
   * Manages row selection state changes
   * @param rowData - The row data object
   * @param selectedRows - Current set of selected rows
   * @param identifierField - Field used as identifier
   * @returns Updated set of selected rows
   */
  toggleRowSelection(
    rowData: any,
    selectedRows: Set<string>,
    identifierField: string
  ): Set<string> {
    const identifier = rowData[identifierField];
    const newSelectedRows = new Set(selectedRows);

    if (newSelectedRows.has(identifier)) {
      newSelectedRows.delete(identifier);
    } else {
      newSelectedRows.add(identifier);
    }

    return newSelectedRows;
  }

  /**
   * Manages select all/deselect all functionality
   * @param currentData - Current page data
   * @param selectedRows - Current set of selected rows
   * @param identifierField - Field used as identifier
   * @param allSelected - Whether all rows are currently selected
   * @returns Updated set of selected rows
   */
  toggleSelectAll(
    currentData: any[],
    selectedRows: Set<string>,
    identifierField: string,
    allSelected: boolean
  ): Set<string> {
    const newSelectedRows = new Set(selectedRows);

    if (allSelected) {
      // Deselect all current page items
      currentData.forEach((row) => {
        const identifier = row[identifierField];
        newSelectedRows.delete(identifier);
      });
    } else {
      // Select all current page items
      currentData.forEach((row) => {
        const identifier = row[identifierField];
        newSelectedRows.add(identifier);
      });
    }

    return newSelectedRows;
  }

  /**
   * Manages row expansion state
   * @param rowData - The row data object
   * @param expandedRows - Current set of expanded rows
   * @param identifierField - Field used as identifier
   * @param allowMultipleExpanded - Whether multiple rows can be expanded
   * @returns Updated set of expanded rows and animation info
   */
  toggleRowExpansion(
    rowData: any,
    expandedRows: Set<string>,
    identifierField: string,
    allowMultipleExpanded: boolean = false
  ): {
    newExpandedRows: Set<string>;
    shouldAnimateCollapse: boolean;
    shouldDelayExpansion: boolean;
  } {
    const identifier = rowData[identifierField];
    const newExpandedRows = new Set(expandedRows);
    let shouldAnimateCollapse = false;
    let shouldDelayExpansion = false;

    if (newExpandedRows.has(identifier)) {
      // Collapse this row
      newExpandedRows.delete(identifier);
      shouldAnimateCollapse = true;
    } else {
      if (!allowMultipleExpanded && newExpandedRows.size > 0) {
        // Collapse existing rows first
        newExpandedRows.clear();
        shouldAnimateCollapse = true;
        shouldDelayExpansion = true;
        // The actual expansion will be handled after animation delay
        setTimeout(() => {
          newExpandedRows.add(identifier);
        }, 300);
      } else {
        // Expand immediately
        newExpandedRows.add(identifier);
      }
    }

    return {
      newExpandedRows,
      shouldAnimateCollapse,
      shouldDelayExpansion
    };
  }

  /**
   * Manages locking/unlocking of rows
   * @param rowData - The row data object
   * @param lockedItems - Current array of locked items
   * @param identifierField - Field used as identifier
   * @param maxLockedItems - Maximum allowed locked items
   * @returns Updated array of locked items or null if action not allowed
   */
  toggleRowLock(
    rowData: any,
    lockedItems: any[],
    identifierField: string,
    maxLockedItems: number
  ): any[] | null {
    const identifier = rowData[identifierField];
    const isCurrentlyLocked = lockedItems.some(
      (item) => item[identifierField] === identifier
    );

    if (isCurrentlyLocked) {
      // Unlock the row
      return lockedItems.filter(
        (item) => item[identifierField] !== identifier
      );
    } else {
      // Check if we can lock more rows
      if (maxLockedItems > 0 && lockedItems.length >= maxLockedItems) {
        return null; // Cannot lock more rows
      }
      // Lock the row
      return [...lockedItems, rowData];
    }
  }

  /**
   * Handles column reordering logic
   * @param columns - Current columns array
   * @param fromIndex - Source index
   * @param toIndex - Target index
   * @returns Reordered columns array
   */
  reorderColumns(
    columns: TableColumn[],
    fromIndex: number,
    toIndex: number
  ): TableColumn[] {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 ||
        fromIndex >= columns.length || toIndex >= columns.length) {
      return columns;
    }

    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    return newColumns;
  }

  /**
   * Handles column visibility changes
   * @param columns - Current columns array
   * @param columnField - Field of the column to toggle
   * @param visible - New visibility state
   * @returns Updated columns array
   */
  updateColumnVisibility(
    columns: TableColumn[],
    columnField: string,
    visible: boolean
  ): TableColumn[] {
    return columns.map((col) =>
      col.field === columnField ? { ...col, visible } : col
    );
  }

  /**
   * Shows all columns
   * @param columns - Current columns array
   * @returns Updated columns array with all columns visible
   */
  showAllColumns(columns: TableColumn[]): TableColumn[] {
    return columns.map((col) => ({ ...col, visible: true }));
  }

  /**
   * Resets column visibility to default state
   * @param originalColumns - Original columns configuration
   * @returns Reset columns array
   */
  resetColumnVisibility(originalColumns: TableColumn[]): TableColumn[] {
    return originalColumns.map((col) => ({
      ...col,
      visible: col.visible !== false // Default to true unless explicitly false
    }));
  }

  /**
   * Manages loading overlay state with timeout
   * @param duration - Duration in milliseconds
   * @param message - Loading message
   * @returns Promise that resolves when loading is complete
   */
  async withLoadingOverlay(
    duration: number = 2000,
    message: string = 'Processing...'
  ): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  /**
   * Handles sorting logic and state updates
   * @param field - Field to sort by
   * @param currentSortField - Current sort field
   * @param currentSortOrder - Current sort order
   * @returns New sort state
   */
  handleSort(
    field: string,
    currentSortField: string | null,
    currentSortOrder: 'asc' | 'desc'
  ): { sortField: string; sortOrder: 'asc' | 'desc' } {
    if (currentSortField === field) {
      // Toggle sort order if same field
      return {
        sortField: field,
        sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc'
      };
    } else {
      // Set new field and default to ascending
      return {
        sortField: field,
        sortOrder: 'asc'
      };
    }
  }

  /**
   * Clears all filters and sorting
   * @returns Reset filter and sort state
   */
  clearFiltersAndSort(): {
    filters: Record<string, any>;
    sortField: string | null;
    sortOrder: 'asc' | 'desc';
  } {
    return {
      filters: {},
      sortField: null,
      sortOrder: 'asc'
    };
  }

  /**
   * Handles pagination logic
   * @param currentPage - Current page number
   * @param action - Pagination action ('next', 'reset', 'showAll')
   * @returns New pagination state
   */
  handlePagination(
    currentPage: number,
    action: 'next' | 'reset' | 'showAll'
  ): { currentPage: number; showAllItems: boolean } {
    switch (action) {
      case 'next':
        return { currentPage: currentPage + 1, showAllItems: false };
      case 'reset':
        return { currentPage: 1, showAllItems: false };
      case 'showAll':
        return { currentPage: 1, showAllItems: true };
      default:
        return { currentPage, showAllItems: false };
    }
  }

  /**
   * Validates table configuration
   * @param columns - Table columns
   * @param data - Table data
   * @returns Validation result with errors if any
   */
  validateTableConfiguration(
    columns: TableColumn[],
    data: any[]
  ): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate columns
    if (!columns || columns.length === 0) {
      errors.push('At least one column is required');
    } else {
      // Check for duplicate field names
      const fieldNames = columns.map(col => col.field);
      const duplicates = fieldNames.filter((field, index) => fieldNames.indexOf(field) !== index);
      if (duplicates.length > 0) {
        errors.push(`Duplicate column fields found: ${duplicates.join(', ')}`);
      }

      // Check for required properties
      columns.forEach((col, index) => {
        if (!col.field) {
          errors.push(`Column at index ${index} is missing required 'field' property`);
        }
        if (!col.header) {
          errors.push(`Column at index ${index} is missing required 'header' property`);
        }
      });
    }

    // Validate data structure
    if (data && data.length > 0 && columns) {
      const dataFields = Object.keys(data[0] || {});
      const columnFields = columns.map(col => col.field);
      const missingFields = columnFields.filter(field => !dataFields.includes(field));
      
      if (missingFields.length > 0) {
        errors.push(`Data is missing fields referenced by columns: ${missingFields.join(', ')}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
