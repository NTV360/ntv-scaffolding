import type { Meta, StoryObj } from '@storybook/angular';

import { Table } from './table';
import { Card } from '../card/card';
import { sampleColumns, sampleData } from './table.constants';

const meta: Meta<Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
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
      displayClass: (display: string) => {
        const base = 'font-bold rounded-md px-2 py-[2px] ';

        if (display === 'ON') {
          return base + 'bg-green-400 text-green-800';
        } else {
          return base + 'bg-red-400 text-red-800';
        }
      },
      getUploadSpeedClass(speed: number): string {
        const base = 'font-bold rounded-md px-2 py-[2px] ';

        if (speed < 15) {
          return base + 'bg-purple-100 text-purple-100';
        } else if (speed < 100) {
          return base + 'bg-blue-300 text-blue-600';
        } else {
          return base + 'bg-pink-300 text-pink-600';
        }
      },
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
          const currentData = this['data'];
          const updatedData = currentData.filter(
            (row: any) => row.licenseKey !== item.licenseKey
          );
          this['data'] = updatedData;
        }
      },
    },
    moduleMetadata: {
      imports: [Card],
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
      displayClass: (display: string) => {
        const base = 'font-bold rounded-md px-2 py-[2px] ';

        if (display === 'ON') {
          return base + 'bg-green-400 text-green-800';
        } else {
          return base + 'bg-red-400 text-red-800';
        }
      },
      getUploadSpeedClass(speed: number): string {
        const base = 'font-bold rounded-md px-2 py-[2px] ';

        if (speed < 15) {
          return base + 'bg-purple-100 text-purple-100';
        } else if (speed < 100) {
          return base + 'bg-blue-300 text-blue-600';
        } else {
          return base + 'bg-pink-300 text-pink-600';
        }
      },
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
          const currentData = this['data'];
          const updatedData = currentData.filter(
            (row: any) => row.licenseKey !== item.licenseKey
          );
          this['data'] = updatedData;
        }
      },
    },
    template: `
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
