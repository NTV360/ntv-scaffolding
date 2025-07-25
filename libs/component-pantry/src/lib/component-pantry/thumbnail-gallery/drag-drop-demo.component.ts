import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailGalleryComponent } from './thumbnail-gallery';
import { ThumbnailItem } from './thumbnail.types';

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

@Component({
  selector: 'ntv-drag-drop-demo',
  standalone: true,
  imports: [CommonModule, ThumbnailGalleryComponent],
  template: `
    <div>
      <p style="margin-bottom: 16px; color: #666; font-size: 14px;">
        💡 Drag and drop the thumbnails to reorder them. The order will persist!
      </p>
      <ntv-thumbnail-gallery
        [items]="items()"
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
    </div>
  `,
})
export class DragDropDemoComponent {
  items = signal<ThumbnailItem[]>([...sampleItems]);
  
  // Props that can be configured
  size = 'md';
  variant = 'default';
  layout = 'grid';
  columns = 4;
  selectable = false;
  multiSelect = false;
  showActionButtons = false;
  showLabels = true;
  showMetadata = false;
  showFileSize = false;
  showModified = false;
  hoverEffects = true;
  clickable = true;
  gap = '1rem';
  draggable = true;

  onItemClick(event: any) {
    console.log('Item clicked:', event);
  }

  onSelectionChange(event: any) {
    console.log('Selection changed:', event);
  }

  onActionClick(event: any) {
    console.log('Action clicked:', event);
  }

  onContextMenu(event: any) {
    console.log('Context menu:', event);
  }

  onItemsReorder(reorderedItems: ThumbnailItem[]) {
    console.log('Items reordered:', reorderedItems);
    this.items.set([...reorderedItems]);
  }
}