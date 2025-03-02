import { ProductState } from "./types";
import { create } from "zustand";
import { createProductSlice } from "./actions";

export const useProductStore = create<ProductState>(createProductSlice);
