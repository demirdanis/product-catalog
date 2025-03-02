import { AddCommentBody } from "@/types/api/addComment";
import { IPagination } from "@/types/pagination";
import { IProductComment } from "@/types/product";

export interface ProductCommentState {
  comments: IProductComment[];
  loadingOnAdd: boolean;
  loadingOnFetch: boolean;
  pagination: IPagination;
  error?: string;
  addComment: (request: AddCommentBody) => Promise<boolean>;
  setComments: (comments: IProductComment[]) => void;
  fetchComments: (
    productId: string,
    page: number,
    pageSize: number
  ) => Promise<void>;
}
