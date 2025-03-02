import { GetProductsSuccessResponse } from "@/types/api/getProducts";
import { ProductsState } from "./types";
import { StateCreator } from "zustand";
import api from "@/services/api";

export const createProductsSlice: StateCreator<ProductsState> = (set, get) => ({
  product: undefined,
  pagination: {
    page: 0,
    pageSize: 5,
    totalRowCount: 0,
  },
  loading: false,
  setProducts: (products) => set({ products: products }),
  fetchProducts: async (page: number, pageSize: number) => {
    const { pagination } = get();

    if (pageSize !== pagination.pageSize) {
      page = 0;
    }

    set({ loading: true, error: undefined });

    try {
      const response = await api.get<GetProductsSuccessResponse>(
        `/secure/products?page=${page}&pageSize=${pageSize}`
      );

      if (!response) return;

      set({
        loading: false,
        products: response.data.products,
        pagination: {
          page: page,
          pageSize: pageSize,
          totalRowCount: response.data.totalProductCount,
        },
      });
    } catch {
      set({ loading: false, error: "Failed to fetch product" });
    }
  },
  resetState: () => {
    set({ loading: false, products: undefined });
  },
});
