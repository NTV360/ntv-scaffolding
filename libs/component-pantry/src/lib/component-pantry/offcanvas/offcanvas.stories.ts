import { Meta, StoryObj } from '@storybook/angular';
import { OffcanvasComponent } from './offcanvas';

const meta: Meta<OffcanvasComponent> = {
  title: 'Components/Offcanvas',
  component: OffcanvasComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'left', 'bottom', 'right'],
      description: 'Determines the position of the offcanvas',
      defaultValue: 'left',
    },
    header: {
      control: 'text',
      description: 'Header text displayed in the drawer',
    },
    visible: {
      control: 'boolean',
      description: 'Controls visibility of the drawer',
    },
  },
};

export default meta;
type Story = StoryObj<OffcanvasComponent>;

export const AllPositions: Story = {
  render: () => ({
    template: `
      <div class="flex gap-2 justify-center p-4">
        <button type="button" (click)="visibleLeft = true" class="px-4 py-2 bg-blue-500 text-white rounded">
          Left Drawer
        </button>
        <button type="button" (click)="visibleRight = true" class="px-4 py-2 bg-blue-500 text-white rounded">
          Right Drawer
        </button>
        <button type="button" (click)="visibleTop = true" class="px-4 py-2 bg-blue-500 text-white rounded">
          Top Drawer
        </button>
        <button type="button" (click)="visibleBottom = true" class="px-4 py-2 bg-blue-500 text-white rounded">
          Bottom Drawer
        </button>
      </div>

      <ntv-offcanvas [(visible)]="visibleLeft" position="left" header="Left Drawer">
        <ng-container offcanvas>
          <p>This is content for the left drawer.</p>
          <p>You can put any content here.</p>
        </ng-container>
      </ntv-offcanvas>
      
      <ntv-offcanvas [(visible)]="visibleRight" position="right" header="Right Drawer">
        <ng-container offcanvas>
          <p>This is content for the right drawer.</p>
          <p>You can put any content here.</p>
        </ng-container>
      </ntv-offcanvas>
      
      <ntv-offcanvas [(visible)]="visibleTop" position="top" header="Top Drawer">
        <ng-container offcanvas>
          <p>This is content for the top drawer.</p>
          <p>You can put any content here.</p>
        </ng-container>
      </ntv-offcanvas>
      
      <ntv-offcanvas [(visible)]="visibleBottom" position="bottom" header="Bottom Drawer">
        <ng-container offcanvas>
          <p>This is content for the bottom drawer.</p>
          <p>You can put any content here.</p>
        </ng-container>
      </ntv-offcanvas>
    `,
    props: {
      visibleLeft: false,
      visibleRight: false,
      visibleTop: false,
      visibleBottom: false,
    },
  }),
};

export const LeftDrawer: Story = {
  args: {
    position: 'left',
    header: 'Left Drawer',
    visible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <ntv-offcanvas [position]="position" [header]="header" [(visible)]="visible">
        <ng-container offcanvas>
          <p>This is the left drawer content.</p>
          <p>You can close it by clicking the backdrop or the close button.</p>
        </ng-container>
      </ntv-offcanvas>
      
      <div class="p-4">
        <button type="button" (click)="visible = true" class="px-4 py-2 bg-blue-500 text-white rounded">
          Open Drawer
        </button>
      </div>
    `,
  }),
};
