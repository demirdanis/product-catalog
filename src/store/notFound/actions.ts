import { INotFoundData, INotFoundState } from "./types";

import { StateCreator } from "zustand";
import { productsUrl } from "@/contants/urls";

export const createNotFoundSlice: StateCreator<INotFoundState> = (set) => ({
  data: {
    title: "Page Not Found!",
    message: "",
    buttonLabel: "Go to home",
    redirectUrl: productsUrl,
  },
  setNotFound: (data: INotFoundData) => set({ data }),
});
