import type { Meta, StoryObj } from '@storybook/angular';

import { Table } from './table';
import { Card } from '../card/card';
import { sampleColumns, sampleData } from './table.constants';
import { TruncatePipe } from '../../pipes/index';

// Global utility functions for all stories
const globalHandlers = {
  onEditRow: (rowData: any) => {
    console.log('Edit row:', rowData);
  },

  onDeleteRow: function (item: any) {
    // Show confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to delete ${item.licenseKey}?`
    );

    if (confirmed) {
      console.log('Delete row:', item);
      // Remove item from data array
      const currentData = (this as any)['data'];
      const updatedData = currentData.filter(
        (row: any) => row.licenseKey !== item.licenseKey
      );
      (this as any)['data'] = updatedData;
    }
  },

  displayClass: (display: string) => {
    const base = 'font-bold rounded-md px-2 py-[2px] ';

    if (display === 'ON') {
      return base + 'bg-green-400 text-green-800';
    } else {
      return base + 'bg-red-400 text-red-800';
    }
  },

  getUploadSpeedClass: (speed: number): string => {
    const base = 'font-bold rounded-md px-2 py-[2px] ';

    if (speed < 15) {
      return base + 'bg-purple-100 text-purple-100';
    } else if (speed < 100) {
      return base + 'bg-blue-300 text-blue-600';
    } else {
      return base + 'bg-pink-300 text-pink-600';
    }
  },
};

const meta: Meta<Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Table Component

A highly configurable table component that supports multiple features and customization options.

## Features
 - With Filtering in each column
 - Draggable Columns
 - Expandable Rows
 - Lockable Rows
 - With Checkboxs
 - With Pagination

## Usage

\`\`\`typescript
// Basic usage with template reference
<ntv-table #table [columns]="columns" [data]="data" [tableStyle]="tableStyle"></ntv-table>

// Configuration pattern
<ntv-table>

//Table Head
   <ng-template #header let-column>
      <span>{{ column.header }}</span>
    </ng-template>

//Table Body
       <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-onToggleExpansion="onToggleExpansion"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>
</ntv-table>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    columnDraggable: {
      control: 'boolean',
      description: 'Enable column dragging functionality',
    },
    expandableRows: {
      control: 'boolean',
      description: 'Enable expandable rows functionality',
    },
    hasIndex: {
      control: 'boolean',
      description: 'Show index numbers for rows',
    },
    hasCheckBox: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    maxLockedRows: {
      control: 'number',
      description: 'Maximum number of rows that can be locked',
    },
    showColumnSettings: {
      control: 'boolean',
      description: 'Show column settings button',
    },
    storageKey: {
      control: 'text',
      description:
        'Custom localStorage key for column visibility (default: "ntv-table-columns")',
    },
    tableBGColor: {
      control: 'text',
      description: 'Background color (hex code or Tailwind color class)',
      table: {
        defaultValue: { summary: '#ffffff' },
      },
    },
    tableHeaderBGColor: {
      control: 'text',
      description: 'Header background color (hex code or Tailwind color class)',
      table: {
        defaultValue: { summary: '#f3f4f6' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<Table>;

// 1. Default Table
export const Default: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: true,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: {
      ...args,
      ...globalHandlers,
    },
    moduleMetadata: {
      imports: [Card, TruncatePipe],
    },
    template: `
    <div class="m-4">
      <ntv-card [variant]="'default'" [rounded]="'lg'">
      <div class="p-4">
        <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable" 
        [hasIndex]="hasIndex"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
       >
          <ng-template #header let-column>
            <span>{{ column.header }}</span>
          </ng-template>
          
          <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-onToggleExpansion="onToggleExpansion"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>
      </ntv-table>
      </div>
    </ntv-card>
    </div>
     
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Default table configuration with basic functionality. Shows index numbers and column settings.',
      },
    },
  },
};

// 2. Table with Filtering
export const WithFiltering: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: {
      ...args,
      ...globalHandlers,
    },
    template: `
       <div class="m-4">
        <ntv-card [variant]="'default'" [rounded]="'lg'">
          <div class="p-4">
            <ntv-table 
            [columns]="columns"
            [data]="data"
            [tableStyle]="tableStyle"
            [columnDraggable]="columnDraggable"
            [expandableRows]="expandableRows"
            [hasIndex]="hasIndex"
            [maxLockedRows]="maxLockedRows"
            [lockIdentifierField]="lockIdentifierField"
            [showColumnSettings]="showColumnSettings">
            <ng-template #header let-column>
              <span>{{ column.header }}</span>
            </ng-template>

            <ng-template
              #body
              let-rowData
              let-columns="columns"
              let-isLocked="isLocked"
              let-onLockRow="onLockRow"
              let-onUnlockRow="onUnlockRow"
              let-canLockMoreRows="canLockMoreRows"
              let-hasIndex="hasIndex"
              let-rowIndex="rowIndex"
              let-stickyTop="stickyTop"
              let-expandableRows="expandableRows"
              let-onToggleExpansion="onToggleExpansion"
            >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <span>
                {{ rowData[col.field] }}
              </span>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>
            </ntv-table>
          </div>
       </ntv-card>
       </div>
   
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with filtering enabled. Click the filter icons in column headers to filter data.',
      },
    },
  },
};

// 3. Table with Draggable Columns
export const WithDraggableColumns: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: true,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <div class="m-4">
      <ntv-card [variant]="'default'" [rounded]="'lg'">
      <div class="p-4">
      <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings">
        <ng-template #header let-column>
          <span>{{ column.header }}</span>
        </ng-template>
      </ntv-table>
      </div>
      </ntv-card>
    </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with draggable columns enabled. Drag column headers to reorder them.',
      },
    },
  },
};

// 4. Table with Expandable Rows
export const WithExpandableRows: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: true,
    hasIndex: true,
    hasCheckBox: false,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: {
      ...args,
      ...globalHandlers,
    },
    moduleMetadata: {
      imports: [Card, TruncatePipe],
    },
    template: `
      <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [hasCheckBox]="hasCheckBox"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings">
        <ng-template #header let-column>
          <span>{{ column.header }}</span>
        </ng-template>

         <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-onToggleExpansion="onToggleExpansion"
            let-expandableRows="expandableRows"
            let-isRowExpanded="isRowExpanded"
            let-expandIcon="expandIcon"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
                 @if (expandableRows) {
              <td class="expand-column">
                <button 
                  class="expand-btn" 
                  title="Toggle row expansion"
                  (click)="onToggleExpansion(rowData)"
                  [innerHTML]="expandIcon"
                >
                </button>
              </td>
            }
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>

        <ng-template #expandedContent let-rowData>
          <div class="p-4">
            <h4 class="font-semibold mb-2">Expanded Details for {{ rowData.dealer }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <div><strong>License Key:</strong> {{ rowData.licenseKey }}</div>
              <div><strong>Host:</strong> {{ rowData.host }}</div>
              <div><strong>Last Updated:</strong> {{ rowData.lastUpdated }}</div>
              <div><strong>Installation Date:</strong> {{ rowData.installationDate }}</div>
            </div>
          </div>
        </ng-template>
      </ntv-table>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with expandable rows enabled. Click the expand button in each row to view additional details.',
      },
    },
  },
};

// 5. Table with Checkboxes
export const WithCheckboxes: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: true,
    filterEnabled: false,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: {
      ...args,
      onSelectedRowsChange: (selectedRows: any[]) => {
        console.log('Selected rows:', selectedRows);
        console.log('Selected count:', selectedRows.length);
      },
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Select rows using checkboxes. Check the browser console to see selection events.
        </p>
        <ntv-table 
          [columns]="columns"
          [data]="data"
          [tableStyle]="tableStyle"
          [columnDraggable]="columnDraggable"
          [expandableRows]="expandableRows"
          [hasIndex]="hasIndex"
          [hasCheckBox]="hasCheckBox"
          [maxLockedRows]="maxLockedRows"
          [lockIdentifierField]="lockIdentifierField"
          [showColumnSettings]="showColumnSettings"
          (selectedRowsChange)="onSelectedRowsChange($event)">
          <ng-template #header let-column>
            <span>{{ column.header }}</span>
          </ng-template>
        </ntv-table>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with checkbox selection enabled. Use the header checkbox to select/deselect all rows, or individual row checkboxes for specific selections. Selection events are logged to the console.',
      },
    },
  },
};

// 6. Full Featured Table
export const FullFeatured: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: true,
    expandableRows: true,
    hasIndex: true,
    hasCheckBox: true,
    maxLockedRows: 5,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
  },
  render: (args) => ({
    props: {
      ...args,
      ...globalHandlers,
      onSelectedRowsChange: (selectedRows: any[]) => {
        console.log('Selected rows:', selectedRows);
      },
    },
    moduleMetadata: {
      imports: [Card, TruncatePipe],
    },
    template: `
      <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [hasCheckBox]="hasCheckBox"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings"
        (selectedRowsChange)="onSelectedRowsChange($event)"
        >

        <ng-template #header let-column>
          <span>{{ column.header }}</span>
        </ng-template>

         <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-onToggleExpansion="onToggleExpansion"
            let-expandableRows="expandableRows"
            let-isRowExpanded="isRowExpanded"
            let-expandIcon="expandIcon"
            let-hasCheckBox="hasCheckBox"
            let-isRowSelected="isRowSelected"
            let-onToggleRowSelection="onToggleRowSelection"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
           @if (hasCheckBox) {
              <td class="checkbox-column">
                <input
                  type="checkbox"
                  class="checkbox-input row-checkbox"
                  [checked]="isRowSelected(rowData)"
                  (change)="onToggleRowSelection(rowData)"
                  [title]="isRowSelected(rowData) ? 'Deselect row' : 'Select row'"
                />
              </td>
              }

            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
                 @if (expandableRows) {
              <td class="expand-column">
                <button 
                  class="expand-btn" 
                  title="Toggle row expansion"
                  (click)="onToggleExpansion(rowData)"
                  [innerHTML]="expandIcon"
                >
                </button>
              </td>
            }
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>

        <ng-template #expandedContent let-rowData>
          <div class="p-4">
            <h4 class="font-semibold mb-2">Expanded Details for {{ rowData.dealer }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <div><strong>License Key:</strong> {{ rowData.licenseKey }}</div>
              <div><strong>Host:</strong> {{ rowData.host }}</div>
              <div><strong>Last Updated:</strong> {{ rowData.lastUpdated }}</div>
              <div><strong>Installation Date:</strong> {{ rowData.installationDate }}</div>
            </div>
          </div>
        </ng-template>
      </ntv-table>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with all features enabled: draggable columns, expandable columns, expandable rows, filtering, row locking, and checkbox selection.',
      },
    },
  },
};

// 7. Table with Header
export const WithHeaderTable: Story = {
  render: (args) => {
    const mockData = sampleData();
    const component = {
      ...args,
      ...globalHandlers,
      selectedRows: [] as any[],
      searchTerm: '',
      originalData: [...mockData],
      currentData: [...mockData],

      filterData() {
        if (!this.searchTerm) {
          return [...this.originalData];
        } else {
          return this.originalData.filter((row: any) =>
            Object.values(row).some((value) =>
              String(value)
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            )
          );
        }
      },
      onSearchChange(searchTerm: string) {
        console.log('Search term:', searchTerm);
        this.searchTerm = searchTerm;
        this.currentData = this.filterData();
      },

      onSelectedRowsChange(selected: any[]) {
        this.selectedRows = selected;
      },

      onDeleteMultiple() {
        if (this.selectedRows.length === 0) {
          alert('Please select rows to delete');
          return;
        }

        const selectedIds = this.selectedRows.map((row) => row.licenseKey);
        this.currentData = this.currentData.filter(
          (row) => !selectedIds.includes(row.licenseKey)
        );
        this.originalData = this.originalData.filter(
          (row) => !selectedIds.includes(row.licenseKey)
        );
        this.selectedRows = [];

        console.log(`Deleted ${selectedIds.length} rows`);
        console.log('Remaining data:', this.currentData);
      },

      onDeleteRow1: function (item: any) {
        // Show confirmation dialog
        const confirmed = confirm(
          `Are you sure you want to delete ${item.licenseKey}?`
        );

        if (confirmed) {
          console.log('Delete row:', item);
          // Remove item from data array
          const currentData = (this as any)['currentData'];
          const updatedData = currentData.filter(
            (row: any) => row.licenseKey !== item.licenseKey
          );
          (this as any)['currentData'] = updatedData;
        }
      },
      onExportAll: function () {
        // Get column headers for CSV
        const headers = this.columns.map((col: any) => col.header).join(',');

        // Convert all current data to CSV format
        const csvRows = this.currentData.map((row: any) => {
          return this.columns
            .map((col: any) => {
              const value = row[col.field];
              // Escape commas and quotes in CSV values
              if (
                typeof value === 'string' &&
                (value.includes(',') || value.includes('"'))
              ) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value || '';
            })
            .join(',');
        });

        // Combine headers and data
        const csvContent = [headers, ...csvRows].join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `all_data_export_${new Date().toISOString().split('T')[0]}.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Exported all ${this.currentData.length} rows to CSV`);
      },
    };

    return {
      props: component,
      moduleMetadata: {
        imports: [Card, TruncatePipe],
      },
      template: `
       <div class="m-4">
        <ntv-card [variant]="'default'" [rounded]="'lg'">
        <div class="p-4">
            <div class="flex items-center justify-between">
              <p>Selected Rows: {{ selectedRows.length }}</p>

            <div class="mb-2 flex  items-center justify-end gap-3">
              @if (selectedRows.length > 1) {
              <button 
                class="bg-red-600 p-2 rounded-md text-white font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                [disabled]="selectedRows.length === 0"
                (click)="onDeleteMultiple()"
              >
                Delete Multiple ({{selectedRows.length}})
              </button>
              }

              
              <button 
                class="bg-green-600 p-2 rounded-md text-white font-semibold hover:bg-green-700"
                (click)="onExportAll()"
              >
                Export All Data
              </button>

                <input
                  type="text"
                  placeholder="Search..."
                  class="border px-3 py-2 rounded-lg w-[300px]"
                  (input)="onSearchChange($event.target.value)"
                />
              </div>
            </div>

          <ntv-table 
            [columns]="columns"
            [data]="currentData"
            [tableStyle]="tableStyle"
            [columnDraggable]="columnDraggable"
            [expandableRows]="expandableRows"
            [hasIndex]="hasIndex"
            [hasCheckBox]="hasCheckBox"
            [maxLockedRows]="maxLockedRows"
            [lockIdentifierField]="lockIdentifierField"
            [showColumnSettings]="showColumnSettings"
            [storageKey]="storageKey"
            (selectedRowsChange)="onSelectedRowsChange($event)">

            <ng-template #header let-column>
              <span>{{ column.header }}</span>
            </ng-template>

             <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-expandableRows="expandableRows"
            let-onToggleExpansion="onToggleExpansion"
            let-hasCheckBox="hasCheckBox"
            let-isRowSelected="isRowSelected"
            let-onToggleRowSelection="onToggleRowSelection"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop">
            @if (hasCheckBox) {
              <td class="checkbox-column">
                <input
                  type="checkbox"
                  class="checkbox-input row-checkbox"
                  [checked]="isRowSelected(rowData)"
                  (change)="onToggleRowSelection(rowData)"
                  [title]="isRowSelected(rowData) ? 'Deselect row' : 'Select row'"
                />
              </td>
            }
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow1(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>
          </ntv-table>
        </div>
        </ntv-card>
        </div>
      `,
    };
  },
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: true,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
    storageKey: 'demo-tableHeaders-columns',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with external search functionality. The search box filters the data before passing it to the table component. Column visibility changes are saved to localStorage.',
      },
    },
  },
};

// 8. Custom Style
export const CustomStyle: Story = {
  render: (args) => {
    const mockData = sampleData();
    const component = {
      ...args,
      ...globalHandlers,
      selectedRows: [] as any[],
      searchTerm: '',
      originalData: [...mockData],
      currentData: [...mockData],

      filterData() {
        if (!this.searchTerm) {
          return [...this.originalData];
        } else {
          return this.originalData.filter((row: any) =>
            Object.values(row).some((value) =>
              String(value)
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase())
            )
          );
        }
      },
      onSearchChange(searchTerm: string) {
        console.log('Search term:', searchTerm);
        this.searchTerm = searchTerm;
        this.currentData = this.filterData();
      },

      onSelectedRowsChange(selected: any[]) {
        this.selectedRows = selected;
      },

      onDeleteMultiple() {
        if (this.selectedRows.length === 0) {
          alert('Please select rows to delete');
          return;
        }

        const selectedIds = this.selectedRows.map((row) => row.licenseKey);
        this.currentData = this.currentData.filter(
          (row) => !selectedIds.includes(row.licenseKey)
        );
        this.originalData = this.originalData.filter(
          (row) => !selectedIds.includes(row.licenseKey)
        );
        this.selectedRows = [];

        console.log(`Deleted ${selectedIds.length} rows`);
        console.log('Remaining data:', this.currentData);
      },

      onDeleteRow1: function (item: any) {
        // Show confirmation dialog
        const confirmed = confirm(
          `Are you sure you want to delete ${item.licenseKey}?`
        );

        if (confirmed) {
          console.log('Delete row:', item);
          // Remove item from data array
          const currentData = (this as any)['currentData'];
          const updatedData = currentData.filter(
            (row: any) => row.licenseKey !== item.licenseKey
          );
          (this as any)['currentData'] = updatedData;
        }
      },
      onExportAll: function () {
        // Get column headers for CSV
        const headers = this.columns.map((col: any) => col.header).join(',');

        // Convert all current data to CSV format
        const csvRows = this.currentData.map((row: any) => {
          return this.columns
            .map((col: any) => {
              const value = row[col.field];
              // Escape commas and quotes in CSV values
              if (
                typeof value === 'string' &&
                (value.includes(',') || value.includes('"'))
              ) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value || '';
            })
            .join(',');
        });

        // Combine headers and data
        const csvContent = [headers, ...csvRows].join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], {
          type: 'text/csv;charset=utf-8;',
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `all_data_export_${new Date().toISOString().split('T')[0]}.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Exported all ${this.currentData.length} rows to CSV`);
      },
    };

    return {
      props: component,
      moduleMetadata: {
        imports: [Card, TruncatePipe],
      },
      template: `
       <div class="m-4">
        <ntv-card [variant]="'default'" [rounded]="'lg'">
        <div class="p-4">
            <div class="flex items-center justify-between">
              <p>Selected Rows: {{ selectedRows.length }}</p>

            <div class="mb-2 flex  items-center justify-end gap-3">
              @if (selectedRows.length > 1) {
              <button 
                class="bg-red-600 p-2 rounded-md text-white font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                [disabled]="selectedRows.length === 0"
                (click)="onDeleteMultiple()"
              >
                Delete Multiple ({{selectedRows.length}})
              </button>
              }

              
              <button 
                class="bg-green-600 p-2 rounded-md text-white font-semibold hover:bg-green-700"
                (click)="onExportAll()"
              >
                Export All Data
              </button>

                <input
                  type="text"
                  placeholder="Search..."
                  class="border px-3 py-2 rounded-lg w-[300px]"
                  (input)="onSearchChange($event.target.value)"
                />
              </div>
            </div>

          <ntv-table 
            [columns]="columns"
            [data]="currentData"
            [tableHeaderBGColor]="tableHeaderBGColor"
            [tableStyle]="tableStyle"
            [columnDraggable]="columnDraggable"
            [expandableRows]="expandableRows"
            [hasIndex]="hasIndex"
            [hasCheckBox]="hasCheckBox"
            [maxLockedRows]="maxLockedRows"
            [lockIdentifierField]="lockIdentifierField"
            [showColumnSettings]="showColumnSettings"
            [storageKey]="storageKey"
            (selectedRowsChange)="onSelectedRowsChange($event)">

            <ng-template #header let-column>
              <span >{{ column.header }}</span>
            </ng-template>

             <ng-template
            #body
            let-rowData
            let-columns="columns"
            let-isLocked="isLocked"
            let-onLockRow="onLockRow"
            let-onUnlockRow="onUnlockRow"
            let-canLockMoreRows="canLockMoreRows"
            let-hasIndex="hasIndex"
            let-rowIndex="rowIndex"
            let-stickyTop="stickyTop"
            let-expandableRows="expandableRows"
            let-onToggleExpansion="onToggleExpansion"
            let-hasCheckBox="hasCheckBox"
            let-isRowSelected="isRowSelected"
            let-onToggleRowSelection="onToggleRowSelection"
        >
          <tr [class.locked-row]="isLocked" [style.--sticky-top]="stickyTop" class="text-red-700">
            @if (hasCheckBox) {
              <td class="checkbox-column">
                <input
                  type="checkbox"
                  class="checkbox-input row-checkbox"
                  [checked]="isRowSelected(rowData)"
                  (change)="onToggleRowSelection(rowData)"
                  [title]="isRowSelected(rowData) ? 'Deselect row' : 'Select row'"
                />
              </td>
            }
            @if (hasIndex) {
              <td class="index-column">{{ rowIndex }}</td>
            } 
            @for (col of columns; track col.field) {
            <td>
              @if (col.field === 'licenseKey') {
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>
                  {{ rowData[col.field] | truncate: 15 }}
                </span>
              </div>
              } @else if (col.field === 'display') {
              <span [class]="displayClass(rowData[col.field])">
                {{ rowData[col.field] }} 
              </span>
              } @else if (col.field === 'downloadSpeed') {
              <span>
                {{ rowData[col.field] }} Mbps
              </span>
              }
              @else if (col.field === 'uploadSpeed') {
              <span [class]="getUploadSpeedClass(rowData[col.field])">
                {{ rowData[col.field] }} Mbps
              </span>
              } @else if (col.field === 'action') {
              <div class="action-buttons">
                <button class="edit-btn" title="Edit" (click)="onEditRow(rowData)">
                  ✏️
                </button>
                <button
                  class="delete-btn"
                  title="Delete"
                  (click)="onDeleteRow1(rowData)"
                >
                  🗑️
                </button>
                @if (isLocked) {
                <button
                  class="lock-btn locked"
                  title="Unlock Row"
                  (click)="onUnlockRow(rowData)"
                >
                  🔒
                </button>
                } @else {
                <button
                  class="lock-btn unlocked"
                  title="Lock Row"
                  [disabled]="!canLockMoreRows"
                  (click)="onLockRow(rowData)"
                >
                  🔓
                </button>
                }
                <button class="more-btn" title="More">⋯</button>
              </div>
              } @else {
              <span>
                {{ rowData[col.field] }}
              </span>
              }
            </td>
            }
          </tr>
        </ng-template>
          </ntv-table>
        </div>
        </ntv-card>
        </div>
      `,
    };
  },
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: true,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey',
    showColumnSettings: true,
    storageKey: 'demo-tableHeaders-columns',
    tableHeaderBGColor: '#FAF6FF',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Table with external search functionality. The search box filters the data before passing it to the table component. Column visibility changes are saved to localStorage.',
      },
    },
  },
};
