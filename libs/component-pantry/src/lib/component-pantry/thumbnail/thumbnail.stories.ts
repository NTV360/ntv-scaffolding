import type { Meta, StoryObj } from '@storybook/angular';
import { Thumbnail } from './thumbnail';
import { ThumbnailItem } from './thumbnail.types';

// Sample data for different file types
const sampleImages: ThumbnailItem[] = [
  {
    id: '1',
    name: 'vacation-photo.jpg',
    type: 'image',
    src: 'https://picsum.photos/300/300?random=1',
    size: '2048576',
    modified: new Date('2024-01-15'),
    metadata: { dimensions: '1920x1080' },
  },
  {
    id: '2',
    name: 'landscape.png',
    type: 'image',
    src: 'https://picsum.photos/300/300?random=2',
    size: '4194304',
    modified: new Date('2024-01-10'),
    metadata: { dimensions: '2560x1440' },
  },
  {
    id: '3',
    name: 'portrait.jpg',
    type: 'image',
    src: 'https://picsum.photos/300/400?random=3',
    size: '1572864',
    modified: new Date('2024-01-12'),
    metadata: { dimensions: '1080x1350' },
  },
  {
    id: '4',
    name: 'screenshot.png',
    type: 'image',
    src: 'https://picsum.photos/400/300?random=4',
    size: '3145728',
    modified: new Date('2024-01-08'),
    metadata: { dimensions: '1920x1200' },
  },
];

const sampleFiles: ThumbnailItem[] = [
  {
    id: '5',
    name: 'presentation.pptx',
    type: 'document',
    size: '5242880',
    modified: new Date('2024-01-14'),
    metadata: { pages: 24 },
  },
  {
    id: '6',
    name: 'report.pdf',
    type: 'document',
    size: '1048576',
    modified: new Date('2024-01-13'),
    metadata: { pages: 12 },
  },
  {
    id: '7',
    name: 'music-track.mp3',
    type: 'audio',
    size: '8388608',
    modified: new Date('2024-01-11'),
    metadata: { duration: '3:45' },
  },
  {
    id: '8',
    name: 'demo-video.mp4',
    type: 'video',
    src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    size: '15728640',
    modified: new Date('2024-01-09'),
    metadata: { duration: '2:30', dimensions: '1280x720' },
  },
  {
    id: '9',
    name: 'project-files',
    type: 'folder',
    modified: new Date('2024-01-16'),
  },
  {
    id: '10',
    name: 'archive.zip',
    type: 'archive',
    size: '20971520',
    modified: new Date('2024-01-07'),
  },
  {
    id: '11',
    name: 'app.tsx',
    type: 'code',
    size: '4096',
    modified: new Date('2024-01-17'),
  },
  {
    id: '12',
    name: 'unknown-file.xyz',
    type: 'unknown',
    size: '2048',
    modified: new Date('2024-01-05'),
  },
];

const allFiles = [...sampleImages, ...sampleFiles];

const meta: Meta<Thumbnail> = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A versatile thumbnail gallery component with Dropbox-style grid layout.

## Features
- **Grid & List Layouts** - Switch between grid and list view modes
- **File Type Support** - Images, videos, documents, folders, audio, archives, code files
- **Selection System** - Single and multi-selection with keyboard support
- **Responsive Design** - Adapts to different screen sizes
- **Modern Angular** - Built with Angular 20 signals and control flow
- **Accessibility** - Full ARIA support and keyboard navigation
- **Customizable** - Multiple size variants and styling options
- **Metadata Display** - File size, modified date, dimensions, duration
- **Hover Effects** - Smooth animations and visual feedback

## Usage Examples

### Basic Grid
\`\`\`html
<ntv-thumbnail 
  [items]="files" 
  [config]="{ layout: 'grid', size: 'md' }">
</ntv-thumbnail>
\`\`\`

### Selectable List
\`\`\`html
<ntv-thumbnail 
  [items]="documents"
  [config]="{ 
    layout: 'list', 
    selectable: true, 
    multiSelect: true,
    showFileSize: true 
  }"
  (selectionChange)="onSelectionChange($event)">
</ntv-thumbnail>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'Array of thumbnail items to display',
    },
    config: {
      control: 'object',
      description: 'Configuration object for the thumbnail component',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size variant for thumbnails',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'shadow', 'rounded'],
      description: 'Visual variant for thumbnails',
    },
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list'],
      description: 'Layout mode for thumbnails',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable selection functionality',
    },
    multiSelect: {
      control: { type: 'boolean' },
      description: 'Allow multiple item selection',
    },
    showLabels: {
      control: { type: 'boolean' },
      description: 'Show file names',
    },
    showMetadata: {
      control: { type: 'boolean' },
      description: 'Show file metadata (dimensions, duration, pages)',
    },
    showFileSize: {
      control: { type: 'boolean' },
      description: 'Show file sizes',
    },
    showModified: {
      control: { type: 'boolean' },
      description: 'Show modified dates',
    },
    hoverEffects: {
      control: { type: 'boolean' },
      description: 'Enable hover animations',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Enable click interactions',
    },
    columns: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Number of columns in grid layout',
    },
    gap: {
      control: { type: 'text' },
      description: 'CSS gap value between items',
    },
    itemClick: { action: 'itemClicked' },
    selectionChange: { action: 'selectionChanged' },
  },
  args: {
    items: allFiles,
    size: 'md',
    variant: 'default',
    layout: 'grid',
    selectable: false,
    multiSelect: false,
    showLabels: true,
    showMetadata: false,
    showFileSize: false,
    showModified: false,
    hoverEffects: true,
    clickable: true,
    columns: 4,
    gap: '1rem',
  },
};

export default meta;
type Story = StoryObj<Thumbnail>;

// Default story
export const Default: Story = {
  args: {
    showContextMenu: true,
     showActionButtons: false
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 1rem; background: #f9fafb; min-height: 100vh;">
        <h2 style="margin-bottom: 1rem; color: #111827;">Thumbnail Gallery - Default</h2>
        <ntv-thumbnail 
          [items]="items"
          [size]="size"
          [variant]="variant"
          [layout]="layout"
          [selectable]="selectable"
          [multiSelect]="multiSelect"
          [showLabels]="showLabels"
          [showMetadata]="showMetadata"
          [showFileSize]="showFileSize"
          [showModified]="showModified"
          [hoverEffects]="hoverEffects"
          [clickable]="clickable"
          [columns]="columns"
          [gap]="gap"
          [showContextMenu]="showContextMenu"
          [showActionButtons]="showActionButtons"
          (itemClick)="itemClick($event)"
          (selectionChange)="selectionChange($event)">
        </ntv-thumbnail>
      </div>
    `,
  }),
};

// Dropbox-style story
export const DropboxStyle: Story = {
  args: {
    items: sampleFiles,
    size: 'lg',
    variant: 'shadow',
    layout: 'grid',
    selectable: true,
    multiSelect: true,
    showLabels: true,
    showMetadata: true,
    showFileSize: true,
    showModified: true,
    hoverEffects: true,
    columns: 4,
    contextMenuActions: [
      { type: 'copy-link', label: 'Copy link', icon: '🔗' },
      { type: 'copy', label: 'Duplicate', icon: '📋' },
      { type: 'delete', label: 'Delete', icon: '🗑️' },
      { type: 'file-info', label: 'File info', icon: 'ℹ️' }
    ],
    showContextMenu: true,
     showActionButtons: false
  },
  render: (args) => ({
    props: {
      ...args,
      onActionClick: (event: any) => {
        console.log('Action clicked:', event);
        alert(`Action: ${event.action} on ${event.item.name}`);
      },
      onContextMenu: (event: any) => {
        console.log('Context menu:', event);
      }
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb; min-height: 100vh;">
        <h2 style="margin-bottom: 1rem; color: #111827;">Dropbox-Style Gallery</h2>
        <ntv-thumbnail 
          [items]="items"
          [size]="size"
          [variant]="variant"
          [layout]="layout"
          [selectable]="selectable"
          [multiSelect]="multiSelect"
          [showLabels]="showLabels"
          [showMetadata]="showMetadata"
          [showFileSize]="showFileSize"
          [showModified]="showModified"
          [hoverEffects]="hoverEffects"
          [columns]="columns"
          [showContextMenu]="showContextMenu"
          [showActionButtons]="showActionButtons"
          (actionClick)="onActionClick($event)"
          (contextMenu)="onContextMenu($event)">
        </ntv-thumbnail>
      </div>
    `
  })
};

// Custom actions story
export const WithCustomActions: Story = {
  args: {
    items: sampleImages.slice(0, 6),
    size: 'md',
    variant: 'bordered',
    layout: 'grid',
    showLabels: true,
    columns: 3,
    contextMenuActions: [
      { type: 'copy-link', label: 'Copy link', icon: '🔗' },
      { type: 'copy', label: 'Duplicate', icon: '📋' },
      { type: 'delete', label: 'Delete', icon: '🗑️' },
      { type: 'file-info', label: 'File info', icon: 'ℹ️' }
    ],
    showContextMenu: true,
    showActionButtons: false
  },
  render: (args) => ({
    props: {
      ...args,
      onActionClick: (event: any) => {
        console.log('Action clicked:', event);
      }
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb; min-height: 100vh;">
        <h2 style="margin-bottom: 1rem; color: #111827;">Custom Actions Gallery</h2>
        <ntv-thumbnail 
          [items]="items"
          [size]="size"
          [variant]="variant"
          [layout]="layout"
          [showLabels]="showLabels"
          [columns]="columns"
          [contextMenuActions]="contextMenuActions"
          [showContextMenu]="showContextMenu"
          [showActionButtons]="showActionButtons"
          (actionClick)="onActionClick($event)">
        </ntv-thumbnail>
      </div>
    `
  })
};

// Grid layouts with different sizes
export const GridSizes: Story = {
  render: () => ({
    props: {
      files: allFiles.slice(0, 8),
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Small (sm)</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ size: 'sm', layout: 'grid', columns: 6, showLabels: true }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Medium (md)</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ size: 'md', layout: 'grid', columns: 4, showLabels: true }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Large (lg)</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ size: 'lg', layout: 'grid', columns: 3, showLabels: true }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Extra Large (xl)</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ size: 'xl', layout: 'grid', columns: 2, showLabels: true }">
            </ntv-thumbnail>
          </div>
          
        </div>
      </div>
    `,
  }),
};

// Layout comparison
export const LayoutComparison: Story = {
  render: () => ({
    props: {
      files: allFiles.slice(0, 6),
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Grid Layout</h3>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; background: white;">
              <ntv-thumbnail 
                [items]="files"
                [config]="{ 
                  layout: 'grid', 
                  size: 'md', 
                  columns: 3,
                  showLabels: true,
                  showFileSize: true,
                  variant: 'shadow'
                }">
              </ntv-thumbnail>
            </div>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">List Layout</h3>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; background: white;">
              <ntv-thumbnail 
                [items]="files"
                [config]="{ 
                  layout: 'list', 
                  size: 'md',
                  showLabels: true,
                  showFileSize: true,
                  showModified: true,
                  variant: 'bordered'
                }">
              </ntv-thumbnail>
            </div>
          </div>
          
        </div>
      </div>
    `,
  }),
};

// Selection functionality
export const SelectionDemo: Story = {
  render: () => ({
    props: {
      files: allFiles.slice(0, 8),
      selectedCount: 0,
      onSelectionChange: (event: any) => {
        console.log('Selection changed:', event);
      },
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb;">
        <div style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h3 style="margin: 0 0 0.5rem 0; color: #111827;">Selection Demo</h3>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">
            Click items to select them. Use Ctrl+Click for multi-selection.
          </p>
        </div>
        
        <ntv-thumbnail 
          [items]="files"
          [config]="{ 
            layout: 'grid', 
            size: 'md',
            columns: 4,
            selectable: true,
            multiSelect: true,
            showLabels: true,
            showFileSize: true,
            variant: 'shadow',
            hoverEffects: true
          }"
          (selectionChange)="onSelectionChange($event)">
        </ntv-thumbnail>
      </div>
    `,
  }),
};

// File type showcase
export const FileTypes: Story = {
  render: () => ({
    props: {
      imageFiles: sampleImages,
      documentFiles: sampleFiles.filter((f) => f.type === 'document'),
      mediaFiles: sampleFiles.filter(
        (f) => f.type === 'video' || f.type === 'audio'
      ),
      otherFiles: sampleFiles.filter(
        (f) => !['document', 'video', 'audio'].includes(f.type)
      ),
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb;">
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827; display: flex; align-items: center; gap: 0.5rem;">
              🖼️ Images
            </h3>
            <ntv-thumbnail 
              [items]="imageFiles"
              [config]="{ 
                layout: 'grid', 
                size: 'lg',
                columns: 4,
                showLabels: true,
                showMetadata: true,
                showFileSize: true,
                variant: 'rounded'
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827; display: flex; align-items: center; gap: 0.5rem;">
              📄 Documents
            </h3>
            <ntv-thumbnail 
              [items]="documentFiles"
              [config]="{ 
                layout: 'list', 
                size: 'md',
                showLabels: true,
                showMetadata: true,
                showFileSize: true,
                showModified: true,
                variant: 'bordered'
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827; display: flex; align-items: center; gap: 0.5rem;">
              🎵 Media Files
            </h3>
            <ntv-thumbnail 
              [items]="mediaFiles"
              [config]="{ 
                layout: 'grid', 
                size: 'md',
                columns: 3,
                showLabels: true,
                showMetadata: true,
                showFileSize: true,
                variant: 'shadow'
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827; display: flex; align-items: center; gap: 0.5rem;">
              📁 Other Files
            </h3>
            <ntv-thumbnail 
              [items]="otherFiles"
              [config]="{ 
                layout: 'grid', 
                size: 'sm',
                columns: 5,
                showLabels: true,
                showFileSize: true,
                variant: 'default'
              }">
            </ntv-thumbnail>
          </div>
          
        </div>
      </div>
    `,
  }),
};

// Variants showcase
export const Variants: Story = {
  render: () => ({
    props: {
      files: allFiles.slice(0, 4),
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Default</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ 
                layout: 'grid', 
                size: 'md',
                columns: 2,
                variant: 'default',
                showLabels: true
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Bordered</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ 
                layout: 'grid', 
                size: 'md',
                columns: 2,
                variant: 'bordered',
                showLabels: true
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Shadow</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ 
                layout: 'grid', 
                size: 'md',
                columns: 2,
                variant: 'shadow',
                showLabels: true
              }">
            </ntv-thumbnail>
          </div>
          
          <div>
            <h3 style="margin-bottom: 1rem; color: #111827;">Rounded</h3>
            <ntv-thumbnail 
              [items]="files"
              [config]="{ 
                layout: 'grid', 
                size: 'md',
                columns: 2,
                variant: 'rounded',
                showLabels: true
              }">
            </ntv-thumbnail>
          </div>
          
        </div>
      </div>
    `,
  }),
};

// Empty state
export const EmptyState: Story = {
  render: () => ({
    props: {
      emptyFiles: [],
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb; min-height: 400px;">
        <h3 style="margin-bottom: 1rem; color: #111827;">Empty State</h3>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; background: white; min-height: 300px;">
          <ntv-thumbnail 
            [items]="emptyFiles"
            [config]="{ 
              layout: 'grid', 
              size: 'md',
              showLabels: true
            }">
          </ntv-thumbnail>
        </div>
      </div>
    `,
  }),
};

// Interactive playground
export const Interactive: Story = {
  args: {
    items: allFiles,
    config: {
      layout: 'grid',
      size: 'md',
      variant: 'default',
      selectable: true,
      multiSelect: true,
      showLabels: true,
      showFileSize: true,
      showModified: false,
      showMetadata: false,
      hoverEffects: true,
      clickable: true,
      columns: 4,
      gap: '1rem',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      handleItemClick: (event: any) => {
        console.log('Item clicked:', event);
      },
      handleSelectionChange: (event: any) => {
        console.log('Selection changed:', event);
      },
    },
    template: `
      <div style="padding: 1rem; background: #f9fafb; min-height: 100vh;">
        <div style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h2 style="margin: 0 0 0.5rem 0; color: #111827;">Interactive Thumbnail Gallery</h2>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">
            Use the controls panel to customize the gallery appearance and behavior.
          </p>
        </div>
        
        <ntv-thumbnail 
          [items]="items"
          [config]="config"
          (itemClick)="handleItemClick($event)"
          (selectionChange)="handleSelectionChange($event)">
        </ntv-thumbnail>
      </div>
    `,
  }),
};
