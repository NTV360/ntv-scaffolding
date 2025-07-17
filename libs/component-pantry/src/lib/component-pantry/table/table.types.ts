export interface TableColumn {
  field: string;
  header: string;
  visible?: boolean;
  filterType?: 'text' | 'number' | 'date' | 'select';
  filterOptions?: string[]; // For select type filters
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
  expandIcon?: string;
}

export interface CompleteRowContext<T = any> {
  rowData: T;
  columns: TableColumn[];
  lockContext: LockContext<T>;
  isExpanded?: boolean;
  onToggleExpansion?: (item: T) => void;
  expandIcon?: string;
}

// Modern type for column reorder event
export interface ColumnReorderEvent {
  from: number;
  to: number;
}

// Type for table style configuration
export type TableStyle = Record<string, string | number>;
