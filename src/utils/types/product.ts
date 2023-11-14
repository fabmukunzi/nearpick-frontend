export type Product = {
    id: string;
    name: string;
    price: number;
    expiryDate: string | null;
    quantity: number;
    images: string[];
    bonus: number;
    isExpired: boolean;
    isAvailable: boolean;
    categoryId: string;
    userId: string;
    storeId: string;
    createdAt: string;
    updatedAt: string;
    distance: number;
    seller: {
      id: string;
      name: string | null;
      role: string;
      location: string | null;
      email: string;
      avatar: string;
      store: string | null;
      phone: string | null;
      status: string | null;
      verified: boolean;
      createdAt: string;
      updatedAt: string;
    };
    Category: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    Store: {
      id: string;
      userId: string;
      name: string;
      location: {
        crs: {
          type: string;
          properties: {
            name: string;
          };
        };
        type: string;
        coordinates: [number, number];
      };
      createdAt: string;
      updatedAt: string;
    };
  };
  
  export type ProductsResponse = {
    data: {
      totalPages: number;
      currentPage: number;
      totalItems: number;
      products: Product[];
    };
  };

  export type ProductUrlParams = {
    lng?: number;
    lat?: number;
  };
  