import {
  GetProductsQueryParams,
  GetProductsResponse,
} from "@/types/api/getProducts";
import { NextApiRequest, NextApiResponse } from "next";

import { IProductListItem } from "@/types/product";
import { mockProducts } from "@/mocks/products";
import { validateTokenAndRedirect } from "@/services/utils/jwtToken";

export default function handler(
  req: NextApiRequest & { query: GetProductsQueryParams },
  res: NextApiResponse<GetProductsResponse>
) {
  if (req.method === "GET") {
    //NOTE: I get the token in the service endpoints, and if it's invalid or expired, I redirect the user to the login page.
    if (!validateTokenAndRedirect(req, res)) return;

    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;

    const startIndex = page * pageSize;
    const paginatedProducts = mockProducts.slice(
      startIndex,
      startIndex + pageSize
    );

    const productList: IProductListItem[] = paginatedProducts.map(
      (product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        currencySymbol: product.currencySymbol,
        image: product.image,

        rating: product.rating,
      })
    );

    setTimeout(() => {
      //NOTE: simulate for slow networks
      res.status(200).json({
        products: productList,
        totalProductCount: mockProducts.length,
      });
    }, 1000);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
