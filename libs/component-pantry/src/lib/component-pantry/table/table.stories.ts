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
- 8 placement options (top, bottom, left, right with start/end variants)
- Click, hover, and manual trigger modes
- Customizable arrow indicator
- Click outside and escape key closing
- Responsive design with viewport boundary detection
- Dark mode support
- Accessibility features

## Usage

\`\`\`typescript
// Basic usage with template reference
<ntv-table #table [columns]="columns" [data]="data" [tableStyle]="tableStyle"></ntv-table>

// Configuration pattern
<ntv-table [config]="{ placement: 'bottom-start', arrow: false }">
  Custom content
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
    persistColumnVisibility: {
      control: 'boolean',
      description: 'Enable localStorage persistence for column visibility',
    },
    storageKey: {
      control: 'text',
      description:
        'Custom localStorage key for column visibility (default: "ntv-table-columns")',
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
    <div class="m-4">
      <ntv-card [variant]="'default'" [rounded]="'lg'">
      <div class="p-4">
        <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable" 
        [expandableColumn]="expandableColumn"
        [expandableRows]="expandableRows"
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
            [expandableColumn]="expandableColumn"
            [expandableRows]="expandableRows"
            [hasIndex]="hasIndex"
            
            [maxLockedRows]="maxLockedRows"
            [lockIdentifierField]="lockIdentifierField"
            [showColumnSettings]="showColumnSettings">
            <ng-template #header let-column>
              {{ column.header }}
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
        [expandableColumn]="expandableColumn"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings">
        <ng-template #header let-column>
          {{ column.header }}
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
    props: args,
    template: `
      <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable"
        [expandableColumn]="expandableColumn"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [hasCheckBox]="hasCheckBox"
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings">
        <ng-template #header let-column>
          {{ column.header }}
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
      onSelectedRowsChange: (selectedRows: Set<any>) => {
        console.log('Selected rows:', selectedRows);
        console.log('Selected count:', selectedRows.size);
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
          [expandableColumn]="expandableColumn"
          [expandableRows]="expandableRows"
          [hasIndex]="hasIndex"
          [hasCheckBox]="hasCheckBox"
          [maxLockedRows]="maxLockedRows"
          [lockIdentifierField]="lockIdentifierField"
          [showColumnSettings]="showColumnSettings"
          (selectedRowsChange)="onSelectedRowsChange($event)">
          <ng-template #header let-column>
            {{ column.header }}
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
      onSelectedRowsChange: (selectedRows: Set<any>) => {
        console.log('Selected rows:', selectedRows);
      },
    },
    template: `

    <div class="m-4">
      <ntv-card [variant]="'elevated'" [rounded]="'lg'">
      <div class="p-4">
      <ntv-table 
        [columns]="columns"
        [data]="data"
        [tableStyle]="tableStyle"
        [columnDraggable]="columnDraggable"
        [expandableColumn]="expandableColumn"
        [expandableRows]="expandableRows"
        [hasIndex]="hasIndex"
        [hasCheckBox]="hasCheckBox"
        
        [maxLockedRows]="maxLockedRows"
        [lockIdentifierField]="lockIdentifierField"
        [showColumnSettings]="showColumnSettings"
        (selectedRowsChange)="onSelectedRowsChange($event)">
        <ng-template #header let-column>
          {{ column.header }}
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
          'Table with all features enabled: draggable columns, expandable columns, expandable rows, filtering, row locking, and checkbox selection.',
      },
    },
  },
};

// 7. Table with LocalStorage Persistence
export const WithLocalStoragePersistence: Story = {
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
    persistColumnVisibility: true,
    storageKey: 'demo-table-columns',
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 class="font-semibold mb-2 text-blue-800 dark:text-blue-200">LocalStorage Persistence Demo</h4>
          <p class="text-sm text-blue-700 dark:text-blue-300 mb-2">
            This table saves column visibility to localStorage with key: <code class="bg-blue-100 dark:bg-blue-800 px-1 rounded">{{ storageKey }}</code>
          </p>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Try hiding/showing columns using the column settings, then refresh the page to see the state persist.
          </p>
        </div>
        <ntv-table 
          [columns]="columns"
          [data]="data"
          [tableStyle]="tableStyle"
          [columnDraggable]="columnDraggable"
          [expandableColumn]="expandableColumn"
          [expandableRows]="expandableRows"
          [hasIndex]="hasIndex"
          [hasCheckBox]="hasCheckBox"
          [maxLockedRows]="maxLockedRows"
          [lockIdentifierField]="lockIdentifierField"
          [showColumnSettings]="showColumnSettings"
          [persistColumnVisibility]="persistColumnVisibility"
          [storageKey]="storageKey">
          <ng-template #header let-column>
            {{ column.header }}
          </ng-template>
        </ntv-table>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with localStorage persistence enabled. Column visibility changes are automatically saved to localStorage and restored on page refresh. Use a custom storage key to avoid conflicts with other tables.',
      },
    },
  },
};

// 8. Table with Header
export const WithHeaderTable: Story = {
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
    persistColumnVisibility: true,
    storageKey: 'demo-tableHeaders-columns',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="outline outline-1 outline-gray-400 rounded-lg p-4 m-4">
     <div class="">
     - searchbar here

    - when multiple items selected show the multiple delete here
     
     </div>
      
        <ntv-table 
          [columns]="columns"
          [data]="data"
          [tableStyle]="tableStyle"
          [columnDraggable]="columnDraggable"
          [expandableColumn]="expandableColumn"
          [expandableRows]="expandableRows"
          [hasIndex]="hasIndex"
          [hasCheckBox]="hasCheckBox"
          [maxLockedRows]="maxLockedRows"
          [lockIdentifierField]="lockIdentifierField"
          [showColumnSettings]="showColumnSettings"
          [persistColumnVisibility]="persistColumnVisibility"
          [storageKey]="storageKey">
          <ng-template #header let-column>
            {{ column.header }}
          </ng-template>
        </ntv-table>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Table with localStorage persistence enabled. Column visibility changes are automatically saved to localStorage and restored on page refresh. Use a custom storage key to avoid conflicts with other tables.',
      },
    },
  },
};
