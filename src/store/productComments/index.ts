import { ProductCommentState } from "./types";
import { create } from "zustand";
import { createProductCommentSlice } from "./actions";

export const useProductCommentStore = create<ProductCommentState>(
  createProductCommentSlice
);
