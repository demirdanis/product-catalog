import { ErrorResponse } from "./error";
import { IProductComment } from "../product";

export interface GetProductCommentsQueryParams {
  productId: string;
  page: number;
  pageSize: number;
}

export interface GetProductCommentsSuccessResponse {
  comments: IProductComment[];
  totalCommentsCount: number;
}

export type GetProductCommentsResponse =
  | GetProductCommentsSuccessResponse
  | ErrorResponse;
