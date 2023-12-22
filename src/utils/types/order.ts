import { Product } from "./product";

export interface OrderItem {
  id: string;
  status: string;
  buyerId: string;
  products: Product[];
  total: number;
  shippingAddress: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface OrdersResponse {
  message: string;
  data: {
    items: OrderItem[];
    meta: Meta;
  };
}
