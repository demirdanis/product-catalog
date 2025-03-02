import { ProductsState } from "./types";
import { create } from "zustand";
import { createProductsSlice } from "./actions";

export const useProductsStore = create<ProductsState>(createProductsSlice);
