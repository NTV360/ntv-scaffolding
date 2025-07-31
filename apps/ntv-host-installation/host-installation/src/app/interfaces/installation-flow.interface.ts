//Installation Flow State
export interface InstallationFlowDraft {
  createHost?: CreateHostState; //Step 1
  createScreen?: CreateScreenState; // Step 2
  setInstallationDate?: SetInstallationState; //Step 3
}

//STEP 1
export interface CreateHostState {
  searchHostPlace?: {
    name: string;
    value: string;
    id: string;
  };

  hostDetails?: {
    dealerName?: DealerName;
    businessName?: string;
    generalCategory?: string;
    category?: string;
    contactPerson?: string;
    contactNumber?: string;
    latitude?: number;
    longtitude?: number;
    address?: string;
    city?: string;
    state?: string;
    region?: string;
    zipcode?: number;
    timezone?: string;
    numberOfLicense?: number;
  };
}

interface DealerName {
  name: string;
  value: string;
  id: string;
}

//STEP 2
export interface CreateScreenState {
  screenName?: string;
  description?: string;
  screenTypeId?: string;
  templateId?: string;
  templateZones?: TemplateZone[];
  selectedTemplate?: string;
  assignedPlaylists?: Record<string, string>;
}

interface TemplateZone {
  templateZoneId: string;
  playlist: Playlist;
}

interface Playlist {
  playlistId: string | null; // null if creating a new one
  playlistName: string;
  contents: PlaylistContent[];
}

interface PlaylistContent {
  playlistContentId: string;
}

//STEP 3
export interface SetInstallationState {
  installationDate?: Date; // ISO date string
}
