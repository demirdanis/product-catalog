import {
  AddCommentBody,
  AddCommentResponse,
  AddCommentSuccessResponse,
} from "@/types/api/addComment";

import { AxiosResponse } from "axios";
import { GetProductCommentsSuccessResponse } from "@/types/api/getProductComments";
import { ProductCommentState } from "./types";
import { StateCreator } from "zustand";
import api from "@/services/api";
import { useProductStore } from "../productDetail";

export const createProductCommentSlice: StateCreator<ProductCommentState> = (
  set,
  get
) => ({
  comments: [],
  loadingOnAdd: false,
  loadingOnFetch: false,
  pagination: { page: 0, pageSize: 5, totalRowCount: 0 },
  addComment: async (request: AddCommentBody) => {
    set({ loadingOnAdd: true });
    try {
      const response = await api.post<
        AddCommentResponse,
        AxiosResponse<AddCommentSuccessResponse>,
        AddCommentBody
      >(`/secure/add-comment`, request);

      if (response?.data) {
        //NOTE: When a comment is added, I reset the comment list page to 0 and fetch the comments again so that the newly added comment appears at the top of the grid.
        //Additionally, I update the average rating and total comment count for the product.
        //This way, when navigating to the product details tab, the state is updated, ensuring the displays are current
        const { setProduct, product } = useProductStore.getState();
        set({ error: undefined, loadingOnAdd: false });
        if (product) {
          setProduct({
            ...product,
            rating: response.data.averageRating,
            totalCommentsCount: response.data.totalCommentsCount,
          });
        }

        const { fetchComments, pagination } = get();
        fetchComments(request.productId, 0, pagination.pageSize);
        return true;
      }
    } catch {
      set({ error: "Failed to add comment", loadingOnAdd: false });
    }
    return false;
  },
  setComments: (comments) => set({ comments }),
  fetchComments: async (productId: string, page: number, pageSize: number) => {
    set({ loadingOnFetch: true });

    try {
      const response = await api.get<GetProductCommentsSuccessResponse>(
        `/secure/product-comments?productid=${productId}&page=${page}&pageSize=${pageSize}`
      );

      if (!response) return;

      set({
        loadingOnFetch: false,
        comments: response.data.comments,
        pagination: {
          page: page,
          pageSize: pageSize,
          totalRowCount: response.data.totalCommentsCount,
        },
      });
    } catch {
      set({ loadingOnFetch: false, error: "Failed to fetch product comments" });
    }
  },
});
