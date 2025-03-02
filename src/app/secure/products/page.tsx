"use client";

import { useCallback, useEffect } from "react";

import { PaginationModelChange } from "@/types/pagination";
import ProductList from "@/components/ProductList/ProductList";
import { useProductsStore } from "@/store/producs";

export default function Products() {
  const { fetchProducts, products, pagination, loading, error } =
    useProductsStore();

  const onPaginationModelChange = useCallback<PaginationModelChange>(
    (model) => {
      fetchProducts(model.page, model.pageSize);
    },
    [fetchProducts]
  );

  useEffect(() => {
    fetchProducts(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductList
      products={products}
      loading={loading}
      error={error}
      pagination={pagination}
      onPaginationModelChange={onPaginationModelChange}
    />
  );
}
