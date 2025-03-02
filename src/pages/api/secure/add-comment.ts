import { AddCommentBody, AddCommentResponse } from "@/types/api/addComment";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getDecodedToken,
  getTokenFromNextApiRequest,
  validateTokenAndRedirect,
} from "@/services/utils/jwtToken";

import { mockProductComments } from "@/mocks/product-comments";
import { mockProducts } from "@/mocks/products";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: AddCommentBody;
}
export default function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<AddCommentResponse>
) {
  if (req.method === "POST") {
    const { comment, productId, rating } = req.body;

    //NOTE: I get the token in the service endpoints, and if it's invalid or expired, I redirect the user to the login page.
    if (!validateTokenAndRedirect(req, res)) return;

    if (!productId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = "Ananymous";
    const token = getTokenFromNextApiRequest(req);
    if (token) {
      const decodedToken = getDecodedToken(token);
      if (decodedToken?.fullName) user = decodedToken.fullName;
    }

    const date = new Date().toISOString().split("T")[0];

    let productComments = mockProductComments.find(
      (p) => p.productId === productId
    );

    const totalCommentsCount = mockProductComments.reduce(
      (total, product) => total + product.comments.length,
      0
    );

    const newId = (totalCommentsCount + 1).toString();

    const newComment = {
      id: newId.toString(),
      user,
      date,
      comment,
      rating,
    };

    if (!productComments) {
      productComments = {
        productId: productId,
        comments: [newComment],
      };
      mockProductComments.push(productComments);
    } else {
      productComments.comments.push(newComment);
    }

    const averageRating =
      productComments?.comments.reduce((sum, comment) => {
        return sum + comment.rating;
      }, 0) / productComments?.comments.length;

    const productOnProductList = mockProducts.find((f) => f.id === productId);
    if (productOnProductList) {
      productOnProductList.rating = averageRating;
    }

    setTimeout(() => {
      //NOTE: simulate for slow networks
      res.status(200).json({
        totalCommentsCount: productComments.comments.length,
        averageRating,
      });
    }, 1000);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
