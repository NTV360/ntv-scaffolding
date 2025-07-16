import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';

import { Table } from './table';
import { Card } from '../card/card';
import { TableColumn } from './table.types';

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
    expandableColumn: {
      control: 'boolean',
      description:
        'Enable expandable columns (double-click headers or drag edges to resize)',
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
    filterEnabled: {
      control: 'boolean',
      description: 'Enable column filtering functionality',
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

// Sample data based on the app.component usage
const sampleColumns = signal<TableColumn[]>([
  { field: 'screenshot', header: 'Screenshot', filterType: 'text' },
  { field: 'licenseKey', header: 'License Key', filterType: 'text' },
  { field: 'dealer', header: 'Dealer', filterType: 'select' },
  { field: 'host', header: 'Host', filterType: 'select' },
  { field: 'alias', header: 'Alias', filterType: 'text' },
  { field: 'lastUpdated', header: 'Last Updated', filterType: 'date' },
  { field: 'lastStartup', header: 'Last Startup', filterType: 'date' },
  { field: 'uploadSpeed', header: 'Upload Speed', filterType: 'text' },
  { field: 'downloadSpeed', header: 'Download Speed', filterType: 'text' },
  { field: 'display', header: 'Display', filterType: 'select' },
  { field: 'anydesk', header: 'AnyDesk', filterType: 'text' },
  {
    field: 'installationDate',
    header: 'Installation Date',
    filterType: 'date',
  },
  {
    field: 'installationDateRequest',
    header: 'Installation Date Request',
    filterType: 'date',
  },
  { field: 'action', header: 'Action' },
]);

const sampleData = signal([
  {
    screenshot: 'N/A',
    licenseKey: '6ec28334-0c92-4bff-baa0-b095fac549e2',
    dealer: 'Cammille Anne',
    host: 'Bagel City',
    alias: 'Karen',
    lastUpdated: 'Nov 10, 2024',
    lastStartup: 'Nov 9, 2024',
    uploadSpeed: 100,
    downloadSpeed: 100,
    display: 'OFF',
    anydesk: '1218628435',
    installationDate: 'Dec 13, 2024',
    installationDateRequest: ' Dec 12, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '7fd39445-1d03-5c00-cb11-c106gbd650f3',
    dealer: 'Marcus Rodriguez',
    host: 'Coffee Corner',
    alias: 'Alex',
    lastUpdated: 'Nov 11, 2024',
    lastStartup: 'Nov 10, 2024',
    uploadSpeed: 120,
    downloadSpeed: 95,
    display: 'ON',
    anydesk: '1218628436',
    installationDate: 'Dec 14, 2024',
    installationDateRequest: ' Dec 13, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '8ge40556-2e14-6d11-dc22-d217hce761g4',
    dealer: 'Sarah Johnson',
    host: 'Pizza Palace',
    alias: 'Jordan',
    lastUpdated: 'Nov 12, 2024',
    lastStartup: 'Nov 11, 2024',
    uploadSpeed: 85,
    downloadSpeed: 110,
    display: 'OFF',
    anydesk: '1218628437',
    installationDate: 'Dec 15, 2024',
    installationDateRequest: ' Dec 14, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '9hf51667-3f25-7e22-ed33-e328idf872h5',
    dealer: 'David Chen',
    host: 'Burger Bros',
    alias: 'Taylor',
    lastUpdated: 'Nov 13, 2024',
    lastStartup: 'Nov 12, 2024',
    uploadSpeed: 150,
    downloadSpeed: 80,
    display: 'ON',
    anydesk: '1218628438',
    installationDate: 'Dec 16, 2024',
    installationDateRequest: ' Dec 15, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '0ig62778-4g36-8f33-fe44-f439jeg983i6',
    dealer: 'Lisa Thompson',
    host: 'Taco Town',
    alias: 'Morgan',
    lastUpdated: 'Nov 14, 2024',
    lastStartup: 'Nov 13, 2024',
    uploadSpeed: 90,
    downloadSpeed: 105,
    display: 'OFF',
    anydesk: '1218628439',
    installationDate: 'Dec 17, 2024',
    installationDateRequest: ' Dec 16, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '1jh73889-5h47-9g44-gf55-g540kfh094j7',
    dealer: 'Robert Williams',
    host: 'Sushi Spot',
    alias: 'Casey',
    lastUpdated: 'Nov 15, 2024',
    lastStartup: 'Nov 14, 2024',
    uploadSpeed: 110,
    downloadSpeed: 115,
    display: 'ON',
    anydesk: '1218628440',
    installationDate: 'Dec 18, 2024',
    installationDateRequest: ' Dec 17, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '2ki8499a-6i58-0h55-hg66-h651lgi105k8',
    dealer: 'Cammille Anne',
    host: 'Bagel City',
    alias: 'River',
    lastUpdated: 'Nov 16, 2024',
    lastStartup: 'Nov 15, 2024',
    uploadSpeed: 95,
    downloadSpeed: 90,
    display: 'OFF',
    anydesk: '1218628441',
    installationDate: 'Dec 19, 2024',
    installationDateRequest: ' Dec 18, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '3lj950ab-7j69-1i66-ih77-i762mhj216l9',
    dealer: 'Marcus Rodriguez',
    host: 'Coffee Corner',
    alias: 'Sage',
    lastUpdated: 'Nov 17, 2024',
    lastStartup: 'Nov 16, 2024',
    uploadSpeed: 130,
    downloadSpeed: 125,
    display: 'ON',
    anydesk: '1218628442',
    installationDate: 'Dec 20, 2024',
    installationDateRequest: ' Dec 19, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '4mk061bc-8k70-2j77-ji88-j873nik327m0',
    dealer: 'Sarah Johnson',
    host: 'Pizza Palace',
    alias: 'Quinn',
    lastUpdated: 'Nov 18, 2024',
    lastStartup: 'Nov 17, 2024',
    uploadSpeed: 75,
    downloadSpeed: 135,
    display: 'OFF',
    anydesk: '1218628443',
    installationDate: 'Dec 21, 2024',
    installationDateRequest: ' Dec 20, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '5nl172cd-9l81-3k88-kj99-k984ojl438n1',
    dealer: 'David Chen',
    host: 'Burger Bros',
    alias: 'Rowan',
    lastUpdated: 'Nov 19, 2024',
    lastStartup: 'Nov 18, 2024',
    uploadSpeed: 160,
    downloadSpeed: 70,
    display: 'ON',
    anydesk: '1218628444',
    installationDate: 'Dec 22, 2024',
    installationDateRequest: ' Dec 21, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '6om283de-0m92-4l99-lk00-l095pkm549o2',
    dealer: 'Lisa Thompson',
    host: 'Taco Town',
    alias: 'Finley',
    lastUpdated: 'Nov 20, 2024',
    lastStartup: 'Nov 19, 2024',
    uploadSpeed: 85,
    downloadSpeed: 100,
    display: 'OFF',
    anydesk: '1218628445',
    installationDate: 'Dec 23, 2024',
    installationDateRequest: ' Dec 22, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '7pn394ef-1n03-5m00-ml11-m106qln650p3',
    dealer: 'Robert Williams',
    host: 'Sushi Spot',
    alias: 'Avery',
    lastUpdated: 'Nov 21, 2024',
    lastStartup: 'Nov 20, 2024',
    uploadSpeed: 115,
    downloadSpeed: 120,
    display: 'ON',
    anydesk: '1218628446',
    installationDate: 'Dec 24, 2024',
    installationDateRequest: ' Dec 23, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '8qo405fg-2o14-6n11-nm22-n217rmo761q4',
    dealer: 'Cammille Anne',
    host: 'Bagel City',
    alias: 'Blake',
    lastUpdated: 'Nov 22, 2024',
    lastStartup: 'Nov 21, 2024',
    uploadSpeed: 100,
    downloadSpeed: 95,
    display: 'OFF',
    anydesk: '1218628447',
    installationDate: 'Dec 25, 2024',
    installationDateRequest: ' Dec 24, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '9rp516gh-3p25-7o22-on33-o328snp872r5',
    dealer: 'Marcus Rodriguez',
    host: 'Coffee Corner',
    alias: 'Drew',
    lastUpdated: 'Nov 23, 2024',
    lastStartup: 'Nov 22, 2024',
    uploadSpeed: 140,
    downloadSpeed: 85,
    display: 'ON',
    anydesk: '1218628448',
    installationDate: 'Dec 26, 2024',
    installationDateRequest: ' Dec 25, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '0sq627hi-4q36-8p33-po44-p439toq983s6',
    dealer: 'Sarah Johnson',
    host: 'Pizza Palace',
    alias: 'Emery',
    lastUpdated: 'Nov 24, 2024',
    lastStartup: 'Nov 23, 2024',
    uploadSpeed: 80,
    downloadSpeed: 110,
    display: 'OFF',
    anydesk: '1218628449',
    installationDate: 'Dec 27, 2024',
    installationDateRequest: ' Dec 26, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '1tr738ij-5r47-9q44-qp55-q540upr094t7',
    dealer: 'David Chen',
    host: 'Burger Bros',
    alias: 'Hayden',
    lastUpdated: 'Nov 25, 2024',
    lastStartup: 'Nov 24, 2024',
    uploadSpeed: 155,
    downloadSpeed: 75,
    display: 'ON',
    anydesk: '1218628450',
    installationDate: 'Dec 28, 2024',
    installationDateRequest: ' Dec 27, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '2us849jk-6s58-0r55-rq66-r651vqs105u8',
    dealer: 'Lisa Thompson',
    host: 'Taco Town',
    alias: 'Kendall',
    lastUpdated: 'Nov 26, 2024',
    lastStartup: 'Nov 25, 2024',
    uploadSpeed: 90,
    downloadSpeed: 105,
    display: 'OFF',
    anydesk: '1218628451',
    installationDate: 'Dec 29, 2024',
    installationDateRequest: ' Dec 28, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '3vt950kl-7t69-1s66-sr77-s762wrt216v9',
    dealer: 'Robert Williams',
    host: 'Sushi Spot',
    alias: 'Logan',
    lastUpdated: 'Nov 27, 2024',
    lastStartup: 'Nov 26, 2024',
    uploadSpeed: 125,
    downloadSpeed: 115,
    display: 'ON',
    anydesk: '1218628452',
    installationDate: 'Dec 30, 2024',
    installationDateRequest: ' Dec 29, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '4wu061lm-8u70-2t77-ts88-t873xsu327w0',
    dealer: 'Cammille Anne',
    host: 'Bagel City',
    alias: 'Peyton',
    lastUpdated: 'Nov 28, 2024',
    lastStartup: 'Nov 27, 2024',
    uploadSpeed: 105,
    downloadSpeed: 90,
    display: 'OFF',
    anydesk: '1218628453',
    installationDate: 'Dec 31, 2024',
    installationDateRequest: ' Dec 30, 2024',
  },
  {
    screenshot: 'N/A',
    licenseKey: '5xv172mn-9v81-3u88-ut99-u984ytv438x1',
    dealer: 'Marcus Rodriguez',
    host: 'Coffee Corner',
    alias: 'Reese',
    lastUpdated: 'Nov 29, 2024',
    lastStartup: 'Nov 28, 2024',
    uploadSpeed: 135,
    downloadSpeed: 80,
    display: 'ON',
    anydesk: '1218628454',
    installationDate: 'Jan 25, 2025',
    installationDateRequest: ' Jan 24, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '0wu627lm-4u36-8t33-ts44-t439xsu983w6',
    dealer: 'Sarah Johnson',
    host: 'Pizza Palace',
    alias: 'Lane',
    lastUpdated: 'Dec 24, 2024',
    lastStartup: 'Dec 23, 2024',
    uploadSpeed: 100,
    downloadSpeed: 95,
    display: 'OFF',
    anydesk: '1218628479',
    installationDate: 'Jan 26, 2025',
    installationDateRequest: ' Jan 25, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '1xv738mn-5v47-9u44-ut55-u540ytv094x7',
    dealer: 'David Chen',
    host: 'Burger Bros',
    alias: 'Marley',
    lastUpdated: 'Dec 25, 2024',
    lastStartup: 'Dec 24, 2024',
    uploadSpeed: 175,
    downloadSpeed: 50,
    display: 'ON',
    anydesk: '1218628480',
    installationDate: 'Jan 27, 2025',
    installationDateRequest: ' Jan 26, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '2yw849no-6w58-0v55-vu66-v651zuw105y8',
    dealer: 'Lisa Thompson',
    host: 'Taco Town',
    alias: 'Navy',
    lastUpdated: 'Dec 26, 2024',
    lastStartup: 'Dec 25, 2024',
    uploadSpeed: 115,
    downloadSpeed: 80,
    display: 'OFF',
    anydesk: '1218628481',
    installationDate: 'Jan 28, 2025',
    installationDateRequest: ' Jan 27, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '3zx950op-7x69-1w66-wv77-w762avx216z9',
    dealer: 'Robert Williams',
    host: 'Sushi Spot',
    alias: 'Ocean',
    lastUpdated: 'Dec 27, 2024',
    lastStartup: 'Dec 26, 2024',
    uploadSpeed: 140,
    downloadSpeed: 100,
    display: 'ON',
    anydesk: '1218628482',
    installationDate: 'Jan 29, 2025',
    installationDateRequest: ' Jan 28, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '4ay061pq-8y70-2x77-xw88-x873bwy327a0',
    dealer: 'Cammille Anne',
    host: 'Bagel City',
    alias: 'Palmer',
    lastUpdated: 'Dec 28, 2024',
    lastStartup: 'Dec 27, 2024',
    uploadSpeed: 130,
    downloadSpeed: 65,
    display: 'OFF',
    anydesk: '1218628483',
    installationDate: 'Jan 30, 2025',
    installationDateRequest: ' Jan 29, 2025',
  },
  {
    screenshot: 'N/A',
    licenseKey: '5bz172qr-9z81-3y88-yx99-y984cxz438b1',
    dealer: 'Marcus Rodriguez',
    host: 'Coffee Corner',
    alias: 'Quinn',
    lastUpdated: 'Dec 29, 2024',
    lastStartup: 'Dec 28, 2024',
    uploadSpeed: 160,
    downloadSpeed: 60,
    display: 'ON',
    anydesk: '1218628484',
    installationDate: 'Jan 31, 2025',
    installationDateRequest: ' Jan 30, 2025',
  },
]);

// 1. Default Table
export const Default: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableColumn: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    filterEnabled: false,
    maxLockedRows: 3,
    lockIdentifierField: 'licenseKey', //column name
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
        [filterEnabled]="filterEnabled"
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
    expandableColumn: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    filterEnabled: true,
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
        [filterEnabled]="filterEnabled"
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
    expandableColumn: false,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    filterEnabled: false,
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
        [filterEnabled]="filterEnabled"
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

// 4. Table with Expandable Columns
export const WithExpandableColumns: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableColumn: true,
    expandableRows: false,
    hasIndex: true,
    hasCheckBox: false,
    filterEnabled: false,
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
        [filterEnabled]="filterEnabled"
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
          'Table with expandable columns. Double-click column headers or drag edges to resize columns.',
      },
    },
  },
};

// 5. Table with Expandable Rows
export const WithExpandableRows: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableColumn: false,
    expandableRows: true,
    hasIndex: true,
    hasCheckBox: false,
    filterEnabled: false,
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
        [filterEnabled]="filterEnabled"
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

// 6. Table with Checkboxes
export const WithCheckboxes: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: false,
    expandableColumn: false,
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
          [filterEnabled]="filterEnabled"
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

// 7. Full Featured Table
export const FullFeatured: Story = {
  args: {
    columns: sampleColumns(),
    data: sampleData(),
    tableStyle: { 'min-width': '50rem' },
    columnDraggable: true,
    expandableColumn: true,
    expandableRows: true,
    hasIndex: true,
    hasCheckBox: true,
    filterEnabled: true,
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
        [filterEnabled]="filterEnabled"
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
