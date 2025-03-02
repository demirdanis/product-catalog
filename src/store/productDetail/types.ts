import { IProduct } from "@/types/product";

export interface ProductState {
  product?: IProduct;
  loading: boolean;
  error?: string;
  getProduct: (productId: string) => void;
  setProduct: (product?: IProduct) => void;
  resetState: () => void;
}
