// Thumbnail Types and Interfaces

export interface ThumbnailItem {
  id: string;
  name: string;
  type:
    | 'image'
    | 'video'
    | 'document'
    | 'audio'
    | 'folder'
    | 'archive'
    | 'code'
    | 'unknown';
  src?: string;
  size?: string;
  modified?: Date;
  icon?: string;
  metadata?: {
    dimensions?: string;
    duration?: string;
    pages?: number;
    [key: string]: any;
  };
  selected?: boolean;
}

export type ThumbnailSize = 'sm' | 'md' | 'lg' | 'xl';
export type ThumbnailVariant = 'default' | 'bordered' | 'shadow' | 'rounded';
export type ThumbnailLayout = 'grid' | 'list';

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
  columns?: number;
  gap?: string;
  showActionButtons?: boolean;
}

export interface ThumbnailClickEvent {
  item: ThumbnailItem;
  index: number;
  event: Event;
}

export interface ThumbnailSelectionEvent {
  selectedItems: ThumbnailItem[];
  item: ThumbnailItem | null;
  selected: boolean;
  event: Event;
}

export interface ThumbnailAction {
  type: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  submenu?: ThumbnailAction[];
  divider?: boolean;
}

export interface ThumbnailActionEvent {
  action: string;
  item: ThumbnailItem;
  items?: ThumbnailItem[];
  event: Event;
}

export interface ThumbnailContextMenuEvent {
  item: ThumbnailItem;
  x: number;
  y: number;
  event: Event;
}

// Default configuration
export const DEFAULT_THUMBNAIL_CONFIG: Required<ThumbnailConfig> = {
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
  showActionButtons: true,
};

// File type icons mapping
export const FILE_TYPE_ICONS: Record<string, string> = {
  image: '🖼️',
  video: '🎥',
  document: '📄',
  audio: '🎵',
  folder: '📁',
  archive: '📦',
  code: '💻',
  unknown: '📄',
};

// File type colors mapping
export const FILE_TYPE_COLORS: Record<string, string> = {
  image: '#10b981', // green
  video: '#8b5cf6', // purple
  document: '#ef4444', // red
  audio: '#f59e0b', // amber
  folder: '#f97316', // orange
  archive: '#6b7280', // gray
  code: '#06b6d4', // cyan
  unknown: '#9ca3af', // gray
};

// Default thumbnail actions
export const DEFAULT_THUMBNAIL_ACTIONS: ThumbnailAction[] = [
  {
    type: 'view',
    label: 'View',
    icon: '👁️',
  },
  {
    type: 'download',
    label: 'Download',
    icon: '⬇️',
  },
  {
    type: 'share',
    label: 'Share',
    icon: '🔗',
  },
  {
    type: 'delete',
    label: 'Delete',
    icon: '🗑️',
  },
];
