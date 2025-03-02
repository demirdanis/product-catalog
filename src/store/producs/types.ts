import { IPagination } from "@/types/pagination";
import { IProductListItem } from "@/types/product";

export interface ProductsState {
  products?: IProductListItem[];
  loading: boolean;
  pagination: IPagination;
  error?: string;
  fetchProducts: (page: number, pageSize: number) => void;
  setProducts: (products?: IProductListItem[]) => void;
  resetState: () => void;
}
