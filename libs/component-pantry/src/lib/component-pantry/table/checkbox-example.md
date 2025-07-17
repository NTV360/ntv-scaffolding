# Table Checkbox Feature Usage

## Basic Usage

```html
<ntv-table
  [hasCheckBox]="true"
  [data]="tableData"
  [columns]="tableColumns"
  (selectedRowsChange)="onSelectionChange($event)"
>
</ntv-table>
```

## Component Methods

### Selection State
- `selectedRows()` - Get currently selected row identifiers (Set)
- `selectAll()` - Check if all visible rows are selected
- `isIndeterminate()` - Check if selection is in indeterminate state
- `isRowSelected(rowData)` - Check if specific row is selected

### Selection Actions
- `toggleRowSelection(rowData)` - Toggle selection of specific row
- `toggleSelectAll()` - Toggle selection of all visible rows
- `clearSelection()` - Clear all selections
- `getSelectedRowsData()` - Get actual data objects of selected rows

## Event Handling

```typescript
export class MyComponent {
  onSelectionChange(selectedRows: Set<any>) {
    console.log('Selected rows:', selectedRows);
    console.log('Selected data:', this.tableComponent.getSelectedRowsData());
  }
}
```

## Features
- Header checkbox for select all/none functionality
- Individual row checkboxes
- Indeterminate state when partially selected
- Emits `selectedRowsChange` event when selection changes
- Works with pagination, filtering, and sorting
- Maintains selection state across data updates