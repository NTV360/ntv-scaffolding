import {
  Component,
  signal,
  computed,
  untracked,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

//Global Imports
import {
  Autocomplete,
  Button,
  Card,
  Input,
  Template,
  ThumbnailGalleryComponent,
  ThumbnailItem,
} from '@ntv-scaffolding/component-pantry';
import { mockLayouts } from '../template-mockup.constant';

//Local Imports
import { InstallationFlowStateService } from '../../../../services/installation-flow-state.service';
import { playlists, Playlist } from './assign-playlist.mock-data';

@Component({
  selector: 'ntv-assign-playlist',
  standalone: true,
  imports: [
    Autocomplete,
    Button,
    FormsModule,
    Input,
    ReactiveFormsModule,
    Template,
    ThumbnailGalleryComponent,
    Card,
  ],
  templateUrl: './assign-playlist.html',
  styleUrl: './assign-playlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * AssignPlaylistComponent handles the logic for assigning playlists to template zones,
 * managing state, and generating video thumbnails for playlist contents.
 */
export class AssignPlaylist {
  private readonly stateService = inject(InstallationFlowStateService);

  /** List of available playlists for assignment. */
  public playlists: Playlist[] = playlists;

  /** Suggestions for the autocomplete component, derived from playlists. */
  public playlistSuggestions = signal(
    playlists.map((playlist) => ({
      label: playlist.name,
      value: playlist.id,
    }))
  );

  /** Currently selected zone name. */
  public selectedZone = signal<string | null>(null);
  /** Currently selected playlist object. */
  public selectedPlaylist = signal<Playlist | null>(null);
  /** Record of zone assignments: zone name to playlist ID. */
  public zoneAssignments = signal<Record<string, string>>({});

  /** Internal flag to prevent concurrent playlist selection processing. */
  private isProcessingSelection = signal(false);

  /** Modal state for create playlist dialog */
  public showCreatePlaylistModal = signal(false);

  /** Form group for create playlist modal */
  public createPlaylistForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(200)]),
  });

  /**
   * The name of the currently selected template, as stored in the state service.
   * @returns {string | null}
   */
  public selectedTemplate = computed(() => {
    return (
      this.stateService.getDraftState()()['createScreen']?.[
        'selectedTemplate'
      ] ?? null
    );
  });

  /**
   * The zones of the currently selected template, with assigned playlist IDs.
   * @returns {Array<{ name: string; playlistId: string }>} Array of zone objects with playlist assignments.
   */
  public selectedTemplateZones = computed(() => {
    const selectedTemplateName = this.selectedTemplate();
    if (!selectedTemplateName) return [];

    const found = mockLayouts.find(
      (layout: { name: string; layout: any[] }) =>
        layout.name === selectedTemplateName
    );

    if (!found) return [];

    const assignments = this.zoneAssignments();
    return found.layout.map((zone) => ({
      ...zone,
      playlistId: assignments[zone.name] || '',
    }));
  });

  /**
   * The name of the currently selected playlist, or a default label.
   * @returns {string}
   */
  public selectedPlaylistName = computed(() => {
    return this.selectedPlaylist()?.name || 'Playlist Contents';
  });

  /**
   * The contents of the currently selected playlist, or an empty array.
   * @returns {any[]}
   */
  public selectedPlaylistContents = computed(() => {
    return this.selectedPlaylist()?.contents || [];
  });

  /**
   * The contents of the currently selected playlist formatted for ThumbnailGallery.
   * @returns {ThumbnailItem[]}
   */
  public thumbnailItems = computed((): ThumbnailItem[] => {
    const contents = this.selectedPlaylistContents();
    return contents.map((content) => ({
      id: content.id,
      name: content.title,
      type: content.type.toLowerCase() as 'image' | 'video',
      src: content.src, // Always use the actual src (video file for videos, image for images)
      metadata: {
        duration: content.duration ? `${content.duration / 1000}s` : undefined,
        thumbnail: content.type === 'VIDEO' ? content.thumbnail : undefined,
      },
    }));
  });

  /**
   * The ID of the playlist assigned to the selected zone, or null if none.
   * @returns {string | null}
   */
  public selectedPlaylistId = computed(() => {
    const zone = this.selectedZone();
    if (!zone) return null;

    const playlistId = this.zoneAssignments()[zone];
    return playlistId || null;
  });

  /**
   * The name of the currently selected template, or a default label.
   * @returns {string}
   */
  public selectedTemplateName = computed(() => {
    return this.selectedTemplate() || 'No Template Selected';
  });

  /**
   * Details of the currently selected zone, including the assigned playlist name.
   * @returns {any | null}
   */
  public selectedZoneDetails = computed(() => {
    const zoneName = this.selectedZone();
    if (!zoneName) return null;
    const zone =
      this.selectedTemplateZones().find((z) => z.name === zoneName) || null;
    if (!zone) return null;
    const playlist = this.playlists.find((p) => p.id === zone.playlistId);
    return {
      ...zone,
      playlistName: playlist ? playlist.name : null,
    };
  });

  /**
   * Initializes the component and loads existing zone assignments from the state service.
   * @param stateService The installation flow state service.
   */
  constructor() {
    const existingAssignments =
      this.stateService.getDraftState()()['createScreen']?.[
        'assignedPlaylists'
      ] || {};
    this.zoneAssignments.set(existingAssignments);
  }

  /**
   * Handles selection of a zone, updating the selected zone and playlist accordingly.
   * @param zoneName The name of the selected zone.
   */
  onZoneSelected(zoneName: string) {
    this.selectedZone.set(zoneName);

    untracked(() => {
      const playlistId = this.getAssignedPlaylist(zoneName);
      const playlist = playlists.find((p) => p.id === playlistId) || null;
      this.selectedPlaylist.set(playlist);
    });
  }

  /**
   * Handles reordering of thumbnail items when dragged and dropped.
   * @param reorderedItems The new order of thumbnail items.
   */
  onItemsReorder(reorderedItems: ThumbnailItem[]) {
    console.log('Items reordered:', reorderedItems);

    // Update the playlist contents order to persist the drag and drop changes
    const currentPlaylist = this.selectedPlaylist();
    if (currentPlaylist) {
      // Map thumbnail items back to playlist content format
      const reorderedContents = reorderedItems.map((item) => {
        const originalContent = currentPlaylist.contents.find(
          (content) => content.id === item.id
        );
        return originalContent!;
      });

      // Update the playlist with new order
      const updatedPlaylist = {
        ...currentPlaylist,
        contents: reorderedContents,
      };

      // Update the selected playlist signal to trigger UI update
      this.selectedPlaylist.set(updatedPlaylist);

      // Also update the playlist in the main playlists array
      const playlistIndex = playlists.findIndex(
        (p) => p.id === currentPlaylist.id
      );
      if (playlistIndex !== -1) {
        playlists[playlistIndex] = updatedPlaylist;
      }
    }
  }

  /**
   * Handles selection of a playlist for the currently selected zone.
   * Updates assignments and generates video thumbnails for playlist contents.
   * @param value The selected playlist value from the autocomplete component.
   */
  public onPlaylistSelected(value: any) {
    if (this.isProcessingSelection()) {
      return;
    }

    if (!this.selectedZone()) {
      console.warn('Please select a zone first!');
      return;
    }

    if (!value?.value) {
      console.warn('No playlist value provided');
      return;
    }

    this.isProcessingSelection.set(true);

    try {
      const selectedPlaylist = playlists.find((p) => p.id === value.value);

      if (selectedPlaylist) {
        untracked(() => {
          this.updatePlaylistAssignment(
            this.selectedZone()!,
            selectedPlaylist.id
          );
        });

        this.selectedPlaylist.set(selectedPlaylist);
        this.zoneAssignments.update((current) => ({
          ...current,
          [this.selectedZone()!]: selectedPlaylist.id,
        }));

        this.generateVideoThumbnails(selectedPlaylist.contents);
      }
    } catch (error) {
      console.error('Error in playlist selection:', error);
    } finally {
      setTimeout(() => {
        this.isProcessingSelection.set(false);
      }, 100);
    }
  }

  /**
   * Updates the playlist assignment for a given zone in the state service.
   * @param zoneId The ID (name) of the zone.
   * @param playlistId The ID of the playlist to assign.
   */
  updatePlaylistAssignment(zoneId: string, playlistId: string) {
    const currentState = this.stateService.getDraftState()()['createScreen'];
    const updatedAssignments = {
      ...currentState?.['assignedPlaylists'],
      [zoneId]: playlistId,
    };
    this.stateService.updateStepState('createScreen', {
      assignedPlaylists: updatedAssignments,
    });
  }

  /**
   * Retrieves the assigned playlist ID for a given zone from the state service.
   * @param zoneId The ID (name) of the zone.
   * @returns {string | undefined} The assigned playlist ID, or undefined if not assigned.
   */
  getAssignedPlaylist(zoneId: string): string | undefined {
    return this.stateService.getDraftState()()['createScreen']?.[
      'assignedPlaylists'
    ]?.[zoneId];
  }

  /**
   * Retrieves the name of a playlist by its ID.
   * @param playlistId The ID of the playlist.
   * @returns {string} The name of the playlist, or 'Unknown Playlist' if not found.
   */
  getPlaylistName(playlistId: string): string {
    const playlist = playlists.find((p) => p.id === playlistId);
    return playlist?.name || 'Unknown Playlist';
  }

  /**
   * Handles the "Create Playlist" button click.
   * Opens the create playlist modal.
   */
  onCreatePlaylist() {
    this.showCreatePlaylistModal.set(true);
    this.createPlaylistForm.reset();

    // Focus the modal after it's rendered
    setTimeout(() => {
      const modalOverlay = document.querySelector(
        '.modal-overlay'
      ) as HTMLElement;
      if (modalOverlay) {
        modalOverlay.focus();
      }
    }, 0);
  }

  /**
   * Closes the create playlist modal.
   */
  onCloseModal() {
    this.showCreatePlaylistModal.set(false);
    this.createPlaylistForm.reset();
  }

  /**
   * Handles saving the new playlist.
   */
  onSavePlaylist() {
    if (this.createPlaylistForm.valid) {
      const formValue = this.createPlaylistForm.value;
      const newPlaylist: Playlist = {
        id: `playlist-${Date.now()}`, // Simple ID generation for demo
        name: formValue.name || '',
        description: formValue.description || '',
        category: 'Custom',
        createdAt: new Date(),
        contents: [],
      };

      // Add to playlists array
      this.playlists.push(newPlaylist);

      // Update autocomplete suggestions
      this.playlistSuggestions.set(
        this.playlists.map((playlist) => ({
          label: playlist.name,
          value: playlist.id,
        }))
      );

      // Auto-select the new playlist
      this.selectedPlaylist.set(newPlaylist);

      // If a zone is selected, automatically assign the new playlist to it
      if (this.selectedZone()) {
        this.updatePlaylistAssignment(this.selectedZone()!, newPlaylist.id);
        this.zoneAssignments.update((current) => ({
          ...current,
          [this.selectedZone()!]: newPlaylist.id,
        }));
      }

      // Close modal
      this.showCreatePlaylistModal.set(false);
      this.createPlaylistForm.reset();

      console.log('New playlist created and assigned:', newPlaylist);
    }
  }

  /**
   * Generates video thumbnails for all video items in the playlist contents.
   * @param contents The contents array of the playlist.
   */
  async generateVideoThumbnails(contents: any[]) {
    for (const item of contents) {
      if (item.type === 'VIDEO' && !item.thumbnail) {
        try {
          item.thumbnail = await this.getVideoThumbnail(item.src);
        } catch (e) {
          item.thumbnail =
            'https://img.icons8.com/ios-filled/100/000000/video.png';
        }
      }
    }
  }

  /**
   * Extracts a thumbnail image from a video URL.
   * @param url The video URL.
   * @returns {Promise<string>} A promise that resolves to a data URL of the thumbnail image.
   */
  getVideoThumbnail(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = url;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.currentTime = 1;
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject();
        }
      });
      video.addEventListener('error', () => reject());
    });
  }
}
