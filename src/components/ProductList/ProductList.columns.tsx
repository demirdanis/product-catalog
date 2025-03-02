import { Box, Rating } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { IProductListItem } from "@/types/product";
import Image from "next/image";
import styles from "./ProductList.columns.module.scss";

export const productListColumns: GridColDef<IProductListItem>[] = [
  {
    field: "image",
    headerName: "Image",
    width: 160,
    renderCell: (params: GridRenderCellParams<IProductListItem>) => {
      return (
        <Box className={styles.imageContainer}>
          <Image
            src={params.row.image}
            alt="Product Image"
            layout="intrinsic"
            width={160}
            height={120}
            objectFit="contain"
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 300,
    renderCell: (params: GridRenderCellParams<IProductListItem>) => {
      return <Box className={styles.nameCell}>{params.row.name}</Box>;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    renderCell: (params: GridRenderCellParams<IProductListItem>) => {
      return (
        <Box className={styles.priceCell}>
          {params.row.price} {params.row.currencySymbol}
        </Box>
      );
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 140,
    renderCell: (params: GridRenderCellParams<IProductListItem>) => {
      return (
        <Box className={styles.ratingCell}>
          <Rating value={params.row.rating} readOnly precision={0.5} />
        </Box>
      );
    },
  },
];
