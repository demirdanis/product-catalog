import { ErrorResponse } from "./error";
import { IProductListItem } from "../product";

export interface GetProductsQueryParams {
  page: number;
  pageSize: number;
}

export interface GetProductsSuccessResponse {
  products: IProductListItem[];
  totalProductCount: number;
}

export type GetProductsResponse = GetProductsSuccessResponse | ErrorResponse;
