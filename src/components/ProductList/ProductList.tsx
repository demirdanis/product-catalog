import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import { IProductList } from "./ProductList.types";
import { prepareProductUrl } from "@/contants/urls";
import { productListColumns } from "./ProductList.columns";
import styles from "./ProductList.module.scss";
import { useRouter } from "next/navigation";

export default function ProductList({
  loading,
  products,
  pagination,
  onPaginationModelChange,
}: Readonly<IProductList>) {
  const router = useRouter();

  const handleRowClick = (params: GridRowParams) => {
    router.push(prepareProductUrl(params.row.id));
  };

  return (
    <DataGrid
      className={styles.dataGrid}
      rows={products ?? []}
      columns={productListColumns}
      disableColumnFilter={true}
      disableColumnMenu={true}
      disableRowSelectionOnClick={true}
      disableColumnResize={true}
      disableColumnSorting={true}
      autoHeight
      getRowHeight={() => "auto"}
      loading={loading ?? undefined}
      filterDebounceMs={1000}
      paginationMode="server"
      pagination={true}
      paginationModel={pagination}
      rowCount={pagination.totalRowCount}
      pageSizeOptions={[5, 10, 20]}
      onPaginationModelChange={onPaginationModelChange}
      onRowClick={handleRowClick}
    />
  );
}
