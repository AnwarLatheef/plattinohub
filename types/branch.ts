

export interface Branch {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

export interface NearbyBranch extends Branch {
  distance: number;
}