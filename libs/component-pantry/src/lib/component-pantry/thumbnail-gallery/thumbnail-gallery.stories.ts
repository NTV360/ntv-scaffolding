import type { Meta, StoryObj } from '@storybook/angular';
import { ThumbnailGalleryComponent } from './thumbnail-gallery';
import { DragDropDemoComponent } from './drag-drop-demo.component';
import { ThumbnailItem } from './thumbnail.types';

// Sample data for different file types
const sampleItems: ThumbnailItem[] = [
  {
    id: '1',
    name: 'vacation-photo.jpg',
    type: 'image',
    src: 'https://picsum.photos/200/150?random=1',
    size: '2.4 MB',
    modified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'presentation.pdf',
    type: 'document',
    size: '1.8 MB',
    modified: new Date('2024-01-14'),
  },
  {
    id: '3',
    name: 'music-track.mp3',
    type: 'audio',
    size: '4.2 MB',
    modified: new Date('2024-01-13'),
  },
  {
    id: '4',
    name: 'demo-video.mp4',
    type: 'video',
    size: '15.6 MB',
    modified: new Date('2024-01-12'),
  },
  {
    id: '5',
    name: 'project-folder',
    type: 'folder',
    size: '125 MB',
    modified: new Date('2024-01-11'),
  },
  {
    id: '6',
    name: 'archive.zip',
    type: 'archive',
    size: '8.9 MB',
    modified: new Date('2024-01-10'),
  },
  {
    id: '7',
    name: 'script.js',
    type: 'code',
    size: '12 KB',
    modified: new Date('2024-01-09'),
  },
  {
    id: '8',
    name: 'unknown-file.xyz',
    type: 'unknown',
    size: '500 KB',
    modified: new Date('2024-01-08'),
  },
];

const meta: Meta<ThumbnailGalleryComponent> = {
  title: 'Components/Thumbnail Gallery',
  component: ThumbnailGalleryComponent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'shadow', 'rounded'],
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list'],
    },
    columns: {
      control: { type: 'range', min: 1, max: 8, step: 1 },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    multiSelect: {
      control: { type: 'boolean' },
    },
    showActionButtons: {
      control: { type: 'boolean' },
    },
    showLabels: {
      control: { type: 'boolean' },
    },
    showMetadata: {
      control: { type: 'boolean' },
    },
    showFileSize: {
      control: { type: 'boolean' },
    },
    showModified: {
      control: { type: 'boolean' },
    },
    hoverEffects: {
      control: { type: 'boolean' },
    },
    draggable: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<ThumbnailGalleryComponent>;

// Template for rendering the component
const Template = {
  render: (args: any) => ({
    props: {
      ...args,
      onItemClick: (event: any) => console.log('Item clicked:', event),
      onSelectionChange: (event: any) => console.log('Selection changed:', event),
      onActionClick: (event: any) => console.log('Action clicked:', event),
      onContextMenu: (event: any) => console.log('Context menu:', event),
      onItemsReorder: (event: any) => console.log('Items reordered:', event),
    },
    template: `
      <ntv-thumbnail-gallery
        [items]="items"
        [size]="size"
        [variant]="variant"
        [layout]="layout"
        [columns]="columns"
        [selectable]="selectable"
        [multiSelect]="multiSelect"
        [showActionButtons]="showActionButtons"
        [showLabels]="showLabels"
        [showMetadata]="showMetadata"
        [showFileSize]="showFileSize"
        [showModified]="showModified"
        [hoverEffects]="hoverEffects"
        [clickable]="clickable"
        [gap]="gap"
        [draggable]="draggable"
        (itemClick)="onItemClick($event)"
        (selectionChange)="onSelectionChange($event)"
        (actionClick)="onActionClick($event)"
        (contextMenu)="onContextMenu($event)"
        (itemsReorder)="onItemsReorder($event)">
      </ntv-thumbnail-gallery>
    `,
  }),
};

export const Default: Story = {
  ...Template,
  args: {
    items: sampleItems,
    size: 'md',
    variant: 'default',
    layout: 'grid',
    columns: 4,
    selectable: false,
    multiSelect: false,
    showActionButtons: true,
    showLabels: true,
    showMetadata: false,
    showFileSize: false,
    showModified: false,
    hoverEffects: true,
    clickable: true,
    gap: '1rem',
    draggable: false,
  },
};

export const WithSelection: Story = {
  ...Template,
  args: {
    ...Default.args,
    selectable: true,
    multiSelect: true,
  },
};

export const WithActionButtons: Story = {
  ...Template,
  args: {
    ...Default.args,
    showActionButtons: true,
    selectable: true,
  },
};

export const GridSizes: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: 'lg',
  },
};



export const WithMetadata: Story = {
  ...Template,
  args: {
    ...Default.args,
    showMetadata: true,
    showFileSize: true,
    showModified: true,
  },
};

export const ListLayout: Story = {
  ...Template,
  args: {
    ...Default.args,
    layout: 'list',
    showMetadata: true,
    showFileSize: true,
    showModified: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'List layout displays items in a vertical list format, showing more details for each item.'
      }
    }
  }
};

export const DraggableList: Story = {
  ...Template,
  args: {
    ...Default.args,
    layout: 'list',
    draggable: true,
    showMetadata: true,
    showFileSize: true,
    showModified: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Draggable list allows users to reorder items by dragging and dropping them.'
      }
    }
  }
};

export const BorderedVariant: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: 'bordered',
  },
};

export const ShadowVariant: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: 'shadow',
  },
};

export const RoundedVariant: Story = {
  ...Template,
  args: {
    ...Default.args,
    variant: 'rounded',
  },
};

export const SmallSize: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: 'sm',
    columns: 6,
  },
};

export const LargeSize: Story = {
  ...Template,
  args: {
    ...Default.args,
    size: 'xl',
    columns: 3,
  },
};

export const Interactive: Story = {
  ...Template,
  args: {
    ...Default.args,
    selectable: true,
    multiSelect: true,
    showActionButtons: true,
    showMetadata: true,
    showFileSize: true,
    showModified: true,
    hoverEffects: true,
  },
};

export const DragAndDrop: Story = {
  render: (args: any) => ({
    template: '<ntv-drag-drop-demo></ntv-drag-drop-demo>',
    moduleMetadata: {
      imports: [DragDropDemoComponent]
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive drag-and-drop demo with persistent reordering using Angular signals.'
      }
    }
  }
};

export const StaticGallery: Story = {
  ...Template,
  args: {
    ...Default.args,
    draggable: false,
  },
};