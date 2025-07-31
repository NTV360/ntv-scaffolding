export interface GoogleBusinessPlace {
  placeId: string;
  title: string;
  type: string;
  address: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
}

export interface GoogleBusinessProfileResponse {
  google_search: GoogleBusinessPlace[];
}