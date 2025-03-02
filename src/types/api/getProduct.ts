import { ErrorResponse } from "./error";
import { IProduct } from "../product";

export interface GetProductQueryParams {
  id: string;
}

export interface GetProductSuccessResponse {
  product: IProduct;
}

export type GetProductResponse = GetProductSuccessResponse | ErrorResponse;
