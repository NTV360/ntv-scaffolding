// ✅ FIXED: zone.component.ts
import {
  Component,
  input,
  output,
  computed,
  effect,
  signal,
  inject,
  DestroyRef,
  untracked,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';

export interface ZoneData {
  backgroundColor: string;
  height: number;
  width: number;
  xPos: number;
  yPos: number;
  zIndex: number;
  containerHeight: number;
  containerWidth: number;
  name: string;
  playlistId?: string;
}

export interface PlaylistContent {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO' | 'TEXT';
  src: string;
  thumbnail?: string;
  duration?: number;
  content?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  contents: PlaylistContent[];
  duration?: number;
  createdAt?: Date;
  category?: string;
}

@Component({
  selector: 'ntv-zone',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneComponent {
  private destroyRef = inject(DestroyRef);

  // Inputs
  public fullscreen = input<number>(0);
  public zoneData = input<ZoneData>({
    backgroundColor: '#000000',
    containerHeight: 1080,
    containerWidth: 1920,
    height: 1080,
    width: 1920,
    xPos: 0,
    yPos: 0,
    zIndex: 2,
    name: 'Zone 1',
    playlistId: '',
  });
  public zones = input<ZoneData[]>([]);
  public selected = input<boolean>(false);
  public selectedZoneName = input<string | null>(null);
  public showSizeToggle = input<boolean>(false);
  public availablePlaylists = input<Playlist[]>([]);
  public showZoneInfo = input<boolean>(false);
  public zoneSelected = output<string | null>();

  // UI State (not tracked by effects)
  public popoverOpen = false;
  public showZoneTooltip = false;

  public currentContentIndex = signal(0);
  private playbackTimer: any = null;
  private lastPlaylistId = signal<string>(''); // Track last playlist ID only

  public hasPlaylist = computed(() => {
    const playlistId = this.zoneData().playlistId;
    return !!playlistId && playlistId !== '';
  });

  public playlistContent = computed(() => {
    const playlistId = this.zoneData().playlistId;
    if (!playlistId || playlistId === '') return null;
    return this.availablePlaylists().find((p) => p.id === playlistId) || null;
  });

  public currentContent = computed(() => {
    const playlist = this.playlistContent();
    if (!playlist || playlist.contents.length === 0) return null;
    const index = this.currentContentIndex();
    return playlist.contents[index] || playlist.contents[0];
  });

  public isPlaying = computed(() => !!this.playbackTimer);

  constructor() {
    effect(() => {
      const currentPlaylistId = this.zoneData().playlistId || '';
      const lastId = this.lastPlaylistId();

      // Only proceed if playlist ID actually changed
      if (currentPlaylistId !== lastId) {
        // Use untracked for ALL side effects
        untracked(() => {
          // Update last playlist ID tracking
          this.lastPlaylistId.set(currentPlaylistId);

          // Stop any existing playback first
          this.stopPlaylistInternal();

          // Start new playlist if we have one
          if (currentPlaylistId) {
            const playlist = this.availablePlaylists().find(
              (p) => p.id === currentPlaylistId
            );
            if (playlist && playlist.contents.length > 0) {
              this.startPlaylistInternal(playlist);
            }
          }
        });
      }
    });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.stopPlaylistInternal();
    });
  }

  private startPlaylistInternal(playlist: Playlist) {
    // Reset content index
    this.currentContentIndex.set(0);

    // Only schedule cycling if more than 1 item
    if (playlist.contents.length > 1) {
      this.scheduleNextContent();
    }
  }

  private stopPlaylistInternal() {
    if (this.playbackTimer) {
      clearTimeout(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  private async scheduleNextContent() {
    // Prevent multiple timers
    if (this.playbackTimer) return;

    const currentItem = this.currentContent();
    if (!currentItem) return;

    // Get duration based on content type
    let duration = 2000; // Default
    switch (currentItem.type) {
      case 'IMAGE':
        duration = currentItem.duration || 2000;
        break;
      case 'TEXT':
        duration = currentItem.duration || 5000;
        break;
      case 'VIDEO':
        if (currentItem.duration) {
          duration = currentItem.duration;
        } else {
          try {
            const videoDurationInSeconds = await this.getVideoDuration(
              currentItem.src
            );
            duration = videoDurationInSeconds * 1000;
            currentItem.duration = duration; // Cache duration
          } catch (error) {
            console.error('Failed to get video duration:', error);
            duration = 10000; // Fallback to 10s
          }
        }
        break;
    }

    this.playbackTimer = setTimeout(() => {
      this.nextContent();
    }, duration);
  }

  private nextContent() {
    const playlist = this.playlistContent();
    if (!playlist || playlist.contents.length === 0) return;

    const currentIndex = this.currentContentIndex();
    const nextIndex = (currentIndex + 1) % playlist.contents.length;

    this.currentContentIndex.set(nextIndex);

    this.playbackTimer = null;
    this.scheduleNextContent();
  }

  onZoneTooltipEnter() {
    this.showZoneTooltip = true;
  }

  onZoneTooltipLeave() {
    this.showZoneTooltip = false;
  }

  onZoneListToggle() {
    this.popoverOpen = !this.popoverOpen;
  }

  onZoneSelect(zone: ZoneData) {
    this.zoneSelected.emit(zone.name);
    this.popoverOpen = false;
  }

  onZoneClick() {
    if (this.selected()) {
      this.zoneSelected.emit(null);
    } else {
      this.zoneSelected.emit(this.zoneData().name);
    }
  }

  private getVideoDuration(url: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        resolve(video.duration);
        video.remove();
      };
      video.onerror = () => {
        reject('Error loading video metadata.');
        video.remove();
      };
      video.src = url;
    });
  }
}
