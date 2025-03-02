import { Currency } from "./currency.enum";

export interface IProduct {
  //base
  id: string;
  name: string;
  price: number;
  image: string;
  currencySymbol: Currency;
  rating: number;

  //details
  bigImage: string;
  arrivalDate: string;
  description: string;
  totalCommentsCount?: number;
}

export type IProductListItem = Omit<
  IProduct,
  "description" | "arrivalDate" | "totalCommentsCount" | "bigImage"
>;

export interface IProductComment {
  user: string;
  date: string;
  comment: string;
  rating: number;
}
