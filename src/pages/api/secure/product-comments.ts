import {
  GetProductCommentsQueryParams,
  GetProductCommentsResponse,
} from "@/types/api/getProductComments";
import { NextApiRequest, NextApiResponse } from "next";

import { mockProductComments } from "@/mocks/product-comments";
import { validateTokenAndRedirect } from "@/services/utils/jwtToken";

export default function handler(
  req: NextApiRequest & { query: GetProductCommentsQueryParams },
  res: NextApiResponse<GetProductCommentsResponse>
) {
  if (req.method === "GET") {
    //NOTE: I get the token in the service endpoints, and if it's invalid or expired, I redirect the user to the login page.
    if (!validateTokenAndRedirect(req, res)) return;

    const productId = req.query.productid?.toString();
    const page = Number(req.query.page) || 0;
    const pageSize = Number(req.query.pageSize) || 10;

    const startIndex = page * pageSize;

    const productComments = mockProductComments.find(
      (f) => f.productId === productId
    );
    if (!productComments) {
      res.status(200).json({
        comments: [],
        totalCommentsCount: 0,
      });
    }

    const sortedComments = productComments?.comments.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const paginatedComments = sortedComments?.slice(
      startIndex,
      startIndex + pageSize
    );

    setTimeout(() => {
      //NOTE: simulate for slow networks
      res.status(200).json({
        comments: paginatedComments ?? [],
        totalCommentsCount: productComments!.comments.length,
      });
    }, 1000);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
