type StoreLocation = {
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  type: string;
  coordinates: [number, number];
};

type StoreOwner = {
  id: string;
  name: string | null;
  role: string;
  location: any; // You might want to replace this with the correct type for location
  email: string;
  avatar: string;
  store: any; // You might want to replace this with the correct type for store
  phone: string | null;
  status: string | null;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  id: string;
  userId: string;
  name: string;
  location: StoreLocation;
  createdAt: string;
  updatedAt: string;
  distance: number | null; // You might want to replace this with the correct type for distance
  Owner: StoreOwner;
};

export type IStoresResponse = {
  stores: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    stores: Store[];
  };
};

export interface ShopPayload {
  name: string;
  categoryId: string[];
  lat: string;
  long: string;
}
