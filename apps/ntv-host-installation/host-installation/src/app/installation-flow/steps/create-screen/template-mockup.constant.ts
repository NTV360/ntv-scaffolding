interface LayoutZone {
  name: string;
  backgroundColor: string;
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  zIndex: number;
  containerHeight: number;
  containerWidth: number;
  playlistId: string;
}

interface TemplateLayout {
  name: string;
  description: string;
  layout: LayoutZone[];
}

export const mockLayouts: TemplateLayout[] = [
  {
    name: 'Standard Layout',
    description: 'This is a standard layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#2e3a59', // Deep blue-gray
        width: 1920,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 1,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Main Content',
        backgroundColor: '#4a6fa5', // Soft indigo
        width: 1440,
        height: 860,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Side Panel',
        backgroundColor: '#7fb3d5', // Cool sky blue
        width: 480,
        height: 860,
        xPos: 1440,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Bottom Bar',
        backgroundColor: '#a569bd', // Vibrant lavender
        width: 1920,
        height: 220,
        xPos: 0,
        yPos: 860,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Wide Content Layout',
    description: 'This is a wide content layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#37474f', // Blue-gray
        width: 1920,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 1,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Main Content',
        backgroundColor: '#546e7a', // Slate blue
        width: 1920,
        height: 800,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Bottom Split Left',
        backgroundColor: '#ffb74d', // Warm amber
        width: 960,
        height: 280,
        xPos: 0,
        yPos: 800,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Bottom Split Right',
        backgroundColor: '#ffe082', // Soft gold
        width: 960,
        height: 280,
        xPos: 960,
        yPos: 800,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Balanced Layout',
    description: 'This is a balanced layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#1e2a38', // Muted navy
        width: 1920,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 1,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Left Panel',
        backgroundColor: '#f76c6c', // Coral red
        width: 640,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Center Panel',
        backgroundColor: '#ffe0ac', // Soft cream
        width: 640,
        height: 1080,
        xPos: 640,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Right Panel',
        backgroundColor: '#2e2e2e', // Modern charcoal
        width: 640,
        height: 1080,
        xPos: 1280,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Presentation Layout',
    description: 'This is a presentation layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#2c3e50', // Dark slate blue
        width: 1920,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 1,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Header',
        backgroundColor: '#3498db', // Bright blue
        width: 1920,
        height: 160,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Main Content',
        backgroundColor: '#5dade2', // Light blue
        width: 1920,
        height: 760,
        xPos: 0,
        yPos: 160,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Footer',
        backgroundColor: '#d6eaf8', // Lightest blue
        width: 1920,
        height: 160,
        xPos: 0,
        yPos: 920,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Full Screen Layout',
    description: 'This is a full screen layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#3d3d5c', // Purple-gray
        width: 1920,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 1,
        containerHeight: 1080,
        containerWidth: 1920,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Half Split Layout',
    description: 'This is a half split layout',
    layout: [
      {
        name: 'Left Half',
        backgroundColor: '#7986cb', // Muted indigo
        width: 960,
        height: 1080,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 1080,
        containerWidth: 960,
        playlistId: '',
      },
      {
        name: 'Right Half',
        backgroundColor: '#f8bbd0', // Soft pink
        width: 960,
        height: 1080,
        xPos: 960,
        yPos: 0,
        zIndex: 2,
        containerHeight: 1080,
        containerWidth: 960,
        playlistId: '',
      },
    ],
  },
];
