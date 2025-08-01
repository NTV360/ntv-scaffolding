import type { ZoneData } from './zone/zone.component';

export const mockLayouts: { name: string; layout: ZoneData[] }[] = [
  {
    name: 'Standard Layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#1a1a2e',
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
        backgroundColor: '#16213e',
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
        backgroundColor: '#0f3460',
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
        backgroundColor: '#533483',
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
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#2c3639',
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
        backgroundColor: '#3f4e4f',
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
        backgroundColor: '#a27b5c',
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
        backgroundColor: '#dcd7c9',
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
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#2d4263',
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
        backgroundColor: '#c84b31',
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
        backgroundColor: '#ecdbba',
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
        backgroundColor: '#191919',
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
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#1b262c',
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
        backgroundColor: '#0f4c75',
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
        backgroundColor: '#3282b8',
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
        backgroundColor: '#bbe1fa',
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
    name: 'Conference Layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#222831',
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
        name: 'Main Speaker',
        backgroundColor: '#393e46',
        width: 1280,
        height: 720,
        xPos: 0,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Participant Grid',
        backgroundColor: '#00adb5',
        width: 640,
        height: 720,
        xPos: 1280,
        yPos: 0,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Chat Panel',
        backgroundColor: '#eeeeee',
        width: 640,
        height: 360,
        xPos: 1280,
        yPos: 720,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Info Panel',
        backgroundColor: '#929aab',
        width: 1280,
        height: 360,
        xPos: 0,
        yPos: 720,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Emergency Layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#2b2024',
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
        name: 'Alert Banner',
        backgroundColor: '#d62828',
        width: 1920,
        height: 200,
        xPos: 0,
        yPos: 0,
        zIndex: 3,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Emergency Content',
        backgroundColor: '#003049',
        width: 1280,
        height: 880,
        xPos: 0,
        yPos: 200,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Status Panel',
        backgroundColor: '#f77f00',
        width: 640,
        height: 440,
        xPos: 1280,
        yPos: 200,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
      {
        name: 'Action Panel',
        backgroundColor: '#fcbf49',
        width: 640,
        height: 440,
        xPos: 1280,
        yPos: 640,
        zIndex: 2,
        containerHeight: 300,
        containerWidth: 500,
        playlistId: '',
      },
    ],
  },
  {
    name: 'Full Screen Layout',
    layout: [
      {
        name: 'Background Zone',
        backgroundColor: '#22223b',
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
    layout: [
      {
        name: 'Left Half',
        backgroundColor: '#4a4e69',
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
        backgroundColor: '#9a8c98',
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
