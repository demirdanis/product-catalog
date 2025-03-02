"use client";

import ProductDetail from "@/components/ProductSection/ProductSection";
import { notFound } from "next/navigation";
import { productsUrl } from "@/contants/urls";
import { useEffect } from "react";
import { useNotFoundStore } from "@/store/notFound";
import { useProductStore } from "@/store/productDetail";

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const { getProduct, resetState, product, loading, error } = useProductStore();
  const { setNotFound } = useNotFoundStore();

  useEffect(() => {
    getProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (error) {
      setNotFound({
        title: "Product Not Found!",
        message:
          "Please check if the product ID in the URL is correct, or go to the product list and click on the product you want to view.",
        buttonLabel: "Go to products page",
        redirectUrl: productsUrl,
      });
      notFound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    return () => {
      // NOTE: When exiting the products page, we reset the state so that when coming back to this page with different IDs, it continues with a clean state.
      resetState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProductDetail loading={loading} product={product} />;
}
