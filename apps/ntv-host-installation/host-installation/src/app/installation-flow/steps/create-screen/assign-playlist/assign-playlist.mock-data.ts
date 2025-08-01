// Mock playlist data and interfaces for assign-playlist

export interface PlaylistContent {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO';
  src: string;
  thumbnail?: string;
  duration?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  category?: string;
  createdAt?: Date;
  contents: PlaylistContent[];
}

export const playlists: Playlist[] = [
  {
    id: 'playlist1',
    name: 'Nature Collection',
    description: 'Beautiful nature scenes and wildlife',
    category: 'Entertainment',
    createdAt: new Date('2024-01-15'),
    contents: [
      {
        id: '1',
        title: 'Mountain Sunrise',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '2',
        title: 'Forest Path',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '3',
        title: 'Ocean Waves',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        duration: 2000,
      },
    ],
  },
  {
    id: 'playlist2',
    name: 'City Life',
    description: 'Urban landscapes and city dynamics',
    category: 'Lifestyle',
    createdAt: new Date('2024-02-01'),
    contents: [
      {
        id: '4',
        title: 'Downtown Skyline',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '5',
        title: 'City Street',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '6',
        title: 'Night Lights',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
        duration: 2000,
      },
    ],
  },
  {
    id: 'playlist3',
    name: 'Food Gallery',
    description: 'Delicious food photography',
    category: 'Food',
    createdAt: new Date('2024-02-20'),
    contents: [
      {
        id: '7',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '8',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '9',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
      },
      {
        id: '22',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '23',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '24',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
      },
      {
        id: '10',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '11',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '12',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
      },
      {
        id: '13',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '14',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '15',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
      },
      {
        id: '16',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '17',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '18',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
      },
      {
        id: '19',
        title: 'Gourmet Burger',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '20',
        title: 'Fresh Ingredients',
        type: 'IMAGE',
        src: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&h=600&fit=crop',
        duration: 2000,
      },
      {
        id: '21',
        title: 'Pizza Slice',
        type: 'VIDEO',
        src: 'https://videos.pexels.com/video-files/3196001/3196001-uhd_2560_1440_25fps.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
        duration: 5000,
      },
    ],
  },
];
