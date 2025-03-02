"use client";

import { useCallback, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { IProductComments } from "./ProductCommentsTabGrid.types";
import { PaginationModelChange } from "@/types/pagination";
import { productCommentListColumns } from "./ProductCommentsTabGrid.columns";
import { useProductCommentStore } from "@/store/productComments";

export default function ProductCommentsGrid({
  isVisible,
  productId,
}: Readonly<IProductComments>) {
  const { comments, loadingOnFetch, pagination, fetchComments } =
    useProductCommentStore();

  const onPaginationModelChange = useCallback<PaginationModelChange>(
    (model) => {
      fetchComments(productId, model.page, model.pageSize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productId]
  );

  useEffect(() => {
    fetchComments(productId, pagination.page, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isVisible && (
      <DataGrid
        rows={comments ?? []}
        columns={productCommentListColumns}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableRowSelectionOnClick={true}
        disableColumnResize={true}
        disableColumnSorting={true}
        autoHeight
        getRowHeight={() => "auto"}
        loading={loadingOnFetch ?? undefined}
        filterDebounceMs={1000}
        paginationMode="server"
        pagination={true}
        paginationModel={pagination}
        rowCount={pagination.totalRowCount}
        pageSizeOptions={[5, 10, 20]}
        onPaginationModelChange={onPaginationModelChange}
      />
    )
  );
}
