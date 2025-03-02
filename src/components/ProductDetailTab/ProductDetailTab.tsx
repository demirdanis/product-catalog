import {
  Box,
  Card,
  CardMedia,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { IProductDetailTab } from "./ProductDetailTab.types";
import dayjs from "dayjs";
import styles from "./ProductDetailTab.module.scss";

export default function ProductDetailTab({
  isVisible,
  product,
}: Readonly<IProductDetailTab>) {
  const isLoading = !product;

  //NOTE: I wanted to show an example of using Skeleton on this page.
  //The Skeleton components have been added specifically inside the relevant fields.
  //This way, for example, the Typography size dynamically adjusts to the skeleton based on the actual size
  //and the skeleton appearance matches the real appearance exactly.

  return (
    <Box className={`${styles.container} ${!isVisible ? styles.hidden : ""}`}>
      <Stack className={styles.productStack}>
        <Box className={styles.imageContainer}>
          <Card>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <CardMedia
                component="img"
                alt={product?.name || ""}
                height="300"
                image={product?.bigImage || ""}
                title={product?.name || ""}
              />
            )}
          </Card>
        </Box>

        <Box className={styles.detailsContainer}>
          {/* Title */}
          <Typography variant="h4">
            {isLoading ? (
              <Skeleton variant="text" width="60%" />
            ) : (
              product?.name
            )}
          </Typography>

          {/* Description */}
          <Typography variant="body1" className={styles.description}>
            {isLoading ? (
              <>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
              </>
            ) : (
              product?.description
            )}
          </Typography>

          {/* Price */}
          <Typography className={styles.price}>
            {isLoading ? (
              <Skeleton variant="text" width="120px" />
            ) : (
              `${product?.price.toFixed(2)} ${product?.currencySymbol}`
            )}
          </Typography>

          {/* Arrival Date */}
          <Typography className={styles.arrivalDate}>
            {isLoading ? (
              <Skeleton variant="text" width="200px" />
            ) : (
              `Arrival Date: ${dayjs(new Date(product?.arrivalDate)).format(
                "MM.DD.YYYY"
              )}`
            )}
          </Typography>

          {/* Rating */}
          <Stack className={styles.ratingContainer}>
            {isLoading ? (
              <Skeleton variant="rectangular" width={300} />
            ) : (
              <>
                <Typography variant="h6">
                  {product?.rating.toFixed(1)} / 5
                </Typography>
                <Rating value={product?.rating} readOnly />
                <Typography variant="body2">
                  ({product?.totalCommentsCount} comments)
                </Typography>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
