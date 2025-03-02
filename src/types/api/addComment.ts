import { ErrorResponse } from "./error";

export interface AddCommentBody {
  productId: string;
  rating: number;
  comment: string;
}

export interface AddCommentSuccessResponse {
  totalCommentsCount: number;
  averageRating: number;
}

export type AddCommentResponse = AddCommentSuccessResponse | ErrorResponse;
