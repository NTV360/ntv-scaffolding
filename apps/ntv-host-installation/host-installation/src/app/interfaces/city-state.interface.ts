export interface CityState {
  id: number;
  abbreviation: string;
  city: string;
  state: string;
  region: string;
  country: string;
  isManuallyAdded: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  dateCreated: string; // ISO date string, e.g., "0001-01-01T00:00:00"
  dateUpdated: string | null;
  status: string | null;
}
