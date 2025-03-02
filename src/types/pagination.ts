import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";

export interface IPagination extends GridPaginationModel {
  totalRowCount: number;
}

export type PaginationModelChange = (
  model: GridPaginationModel,
  details: GridCallbackDetails<"pagination">
) => void;
