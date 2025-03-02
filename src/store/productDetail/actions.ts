import { GetProductSuccessResponse } from "@/types/api/getProduct";
import { ProductState } from "./types";
import { StateCreator } from "zustand";
import api from "@/services/api";

export const createProductSlice: StateCreator<ProductState> = (set) => ({
  product: undefined,
  error: undefined,
  loading: false,
  setProduct: (product) => set({ product: product }),
  getProduct: async (productId: string) => {
    set({ loading: true, error: undefined });

    try {
      const response = await api.get<GetProductSuccessResponse>(
        `/secure/product?id=${productId}`
      );

      if (!response) return;

      set({ loading: false, product: response.data.product });
    } catch {
      set({ loading: false, error: "Failed to fetch product" });
    }
  },
  resetState: () => {
    set({ error: undefined, loading: false, product: undefined });
  },
});
