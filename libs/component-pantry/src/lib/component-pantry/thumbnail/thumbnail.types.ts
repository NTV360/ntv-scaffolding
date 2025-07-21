export type ThumbnailSize = 'sm' | 'md' | 'lg' | 'xl';
export type ThumbnailVariant = 'default' | 'bordered' | 'shadow' | 'rounded';
export type ThumbnailLayout = 'grid' | 'list';
export type ThumbnailFileType = 'image' | 'video' | 'document' | 'folder' | 'audio' | 'archive' | 'code' | 'unknown';

export interface ThumbnailItem {
  id: string;
  name: string;
  type: ThumbnailFileType;
  src?: string; // For images/videos
  size?: string; // File size
  modified?: Date;
  selected?: boolean;
  icon?: string; // Custom icon class or SVG
  metadata?: {
    dimensions?: string;
    duration?: string;
    pages?: number;
    [key: string]: any;
  };
}

export interface ThumbnailConfig {
  size?: ThumbnailSize;
  variant?: ThumbnailVariant;
  layout?: ThumbnailLayout;
  selectable?: boolean;
  multiSelect?: boolean;
  showLabels?: boolean;
  showMetadata?: boolean;
  showFileSize?: boolean;
  showModified?: boolean;
  hoverEffects?: boolean;
  clickable?: boolean;
  columns?: number; // For grid layout
  gap?: string; // CSS gap value
}

export const DEFAULT_THUMBNAIL_CONFIG: ThumbnailConfig = {
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
  gap: '1rem'
};

export interface ThumbnailClickEvent {
  item: ThumbnailItem;
  index: number;
  event: Event;
}

export interface ThumbnailSelectionEvent {
  selectedItems: ThumbnailItem[];
  item: ThumbnailItem;
  selected: boolean;
}

export type ThumbnailActionType = 
  | 'download' 
  | 'open' 
  | 'copy-link' 
  | 'share' 
  | 'rename' 
  | 'move' 
  | 'copy' 
  | 'delete' 
  | 'file-info' 
  | 'save-as'
  | 'manage-permissions'
  | 'more';

export interface ThumbnailAction {
  type: ThumbnailActionType;
  label: string;
  icon: string;
  disabled?: boolean;
  divider?: boolean; // Add divider after this action
  submenu?: ThumbnailAction[]; // For nested menus
}

export interface ThumbnailActionEvent {
  action: ThumbnailActionType;
  item: ThumbnailItem;
  items?: ThumbnailItem[]; // For bulk actions
  event: Event;
}

export interface ThumbnailContextMenuEvent {
  item: ThumbnailItem;
  x: number;
  y: number;
  event: Event;
}

export const DEFAULT_THUMBNAIL_ACTIONS: ThumbnailAction[] = [
  { type: 'copy-link', label: 'Copy link', icon: '🔗' },
  { type: 'copy', label: 'Duplicate', icon: '📋' },
  { type: 'delete', label: 'Delete', icon: '🗑️' },
  { type: 'file-info', label: 'File info', icon: 'ℹ️' },
];

// File type icon mapping
export const FILE_TYPE_ICONS: Record<ThumbnailFileType, string> = {
  image: '🖼️',
  video: '🎥',
  document: '📄',
  folder: '📁',
  audio: '🎵',
  archive: '📦',
  code: '💻',
  unknown: '📄'
};

// File type colors for styling
export const FILE_TYPE_COLORS: Record<ThumbnailFileType, string> = {
  image: '#10b981', // green
  video: '#3b82f6', // blue
  document: '#ef4444', // red
  folder: '#f59e0b', // amber
  audio: '#8b5cf6', // violet
  archive: '#6b7280', // gray
  code: '#06b6d4', // cyan
  unknown: '#9ca3af'  // gray
};