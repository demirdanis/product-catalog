import {
  GetProductQueryParams,
  GetProductResponse,
} from "@/types/api/getProduct";
import { NextApiRequest, NextApiResponse } from "next";

import { mockProducts } from "@/mocks/products";
import { validateTokenAndRedirect } from "@/services/utils/jwtToken";

export default function handler(
  req: NextApiRequest & { query: GetProductQueryParams },
  res: NextApiResponse<GetProductResponse>
) {
  if (req.method === "GET") {
    //NOTE: I get the token in the service endpoints, and if it's invalid or expired, I redirect the user to the login page.
    if (!validateTokenAndRedirect(req, res)) return;

    const { id } = req.query;
    const product = mockProducts.find((product) => product.id === id);

    if (product)
      setTimeout(() => {
        //NOTE: simulate for slow networks
        res.status(200).json({
          product: product,
        });
      }, 1000);
    else res.status(404).json({ error: "Product not found" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
