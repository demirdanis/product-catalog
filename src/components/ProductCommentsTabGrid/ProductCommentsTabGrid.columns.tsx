import { Box, Rating } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { IProductComment } from "@/types/product";
import styles from "./ProductCommentsTabGrid.columns.module.scss";

export const productCommentListColumns: GridColDef<IProductComment>[] = [
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params: GridRenderCellParams<IProductComment>) => {
      return <Box>{params.row.user}</Box>;
    },
  },
  {
    field: "comment",
    headerName: "Comment",
    flex: 1,
    minWidth: 300,
    renderCell: (params: GridRenderCellParams<IProductComment>) => {
      return <Box className={styles.commentCell}>{params.row.comment}</Box>;
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
    renderCell: (params: GridRenderCellParams<IProductComment>) => {
      const rating = params.row.rating;
      return <Rating value={rating} readOnly precision={0.5} />;
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    renderCell: (params: GridRenderCellParams<IProductComment>) => {
      return <Box>{params.row.date}</Box>;
    },
  },
];
