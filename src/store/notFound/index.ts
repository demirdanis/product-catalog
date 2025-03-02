import { INotFoundState } from "./types";
import { create } from "zustand";
import { createNotFoundSlice } from "./actions";

export const useNotFoundStore = create<INotFoundState>(createNotFoundSlice);
