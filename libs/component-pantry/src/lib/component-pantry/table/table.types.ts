import { SafeHtml } from '@angular/platform-browser';

export interface TableColumn {
  field: string;
  header: string;
  visible?: boolean;
  filter?: boolean; // Whether this column has filtering enabled
  filterType?: 'text' | 'number' | 'date' | 'select';
  filterOptions?: string[]; // For select type filters
  width?: string; // Column width (e.g., '150px', '20%')
  minWidth?: string; // Minimum column width
  maxWidth?: string; // Maximum column width
  shrunk?: boolean; // Whether the column is in shrunk state
}

export interface LockContext<T = any> {
  isLocked: boolean;
  onLockRow: (item: T) => void;
  onUnlockRow: (item: T) => void;
  canLockMoreRows: boolean;
}

export interface RowTemplateContext<T = any> {
  $implicit: T;
  columns: TableColumn[];
  lockContext: LockContext<T>;
  isExpanded?: boolean;
  onToggleExpansion?: (item: T) => void;
  expandIcon?: SafeHtml;
}

export interface CompleteRowContext<T = any> {
  rowData: T;
  columns: TableColumn[];
  lockContext: LockContext<T>;
  isExpanded?: boolean;
  onToggleExpansion?: (item: T) => void;
  expandIcon?: SafeHtml;
}

// Modern type for column reorder event
export interface ColumnReorderEvent {
  from: number;
  to: number;
}

// Type for table style configuration
export type TableStyle = Record<string, string | number>;
