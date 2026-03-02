export type Motel = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  plan: 'free' | 'premium';
  status: 'pending' | 'active' | 'paused';
  lat: number | null;
  lng: number | null;
  address: string;
  phone: string;
  whatsapp: string;
  tripadvisor: string;
  hours: string;
  periods: {
    twoHours: string;
    fourHours: string;
    twelveHours: string;
  };
  services: string[];
  accessories: string[];
  photos: string[];
  created_at: string;
};
