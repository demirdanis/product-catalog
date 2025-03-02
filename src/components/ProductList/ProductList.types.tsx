import { IPagination, PaginationModelChange } from "@/types/pagination";

import { IProductListItem } from "@/types/product";

export interface IProductList {
  products?: IProductListItem[];
  loading: boolean;
  pagination: IPagination;
  error?: string;
  onPaginationModelChange?: PaginationModelChange;
}
