export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  isActive: boolean;
  displayOrder: number;
}