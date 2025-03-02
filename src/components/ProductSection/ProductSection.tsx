import { Box, Button, Stack, Tab, Tabs } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IProductDetail } from "./ProductSection.types";
import ProductDetailCommentsTab from "../ProductCommentsTab/ProductCommentsTab";
import ProductDetailTab from "../ProductDetailTab/ProductDetailTab";
import { productsUrl } from "@/contants/urls";
import styles from "./ProductSection.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDetail({ product }: Readonly<IProductDetail>) {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleBackClick = () => {
    router.push(productsUrl);
  };

  return (
    <Box className={styles.container}>
      <Stack direction="row" className={styles.header}>
        <Button
          variant="text"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
        >
          Products
        </Button>
      </Stack>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        centered
      >
        <Tab label="Product Details" />
        <Tab label="Comments & Ratings" />
      </Tabs>

      <ProductDetailTab product={product} isVisible={tabIndex === 0} />

      {product && (
        /* 
        NOTE:
        The 'Comments & Ratings' tab re-renders every time it is selected, and a new query is made to fetch the latest comments.

        Alternatively, I could have fetched the comments once when the tab is first opened and used CSS, such as display, to prevent further queries during subsequent tab switches. However, in that case, the comments would have been fetched unnecessarily for scenarios where the 'Comments' tab is never opened.

        Another approach could have been to fetch the comments only the first time the tab is opened and prevent re-rendering on subsequent tab switches.

        I chose this approach to always show the latest comments upon opening the tab, and I just wanted to mention this as well.
        */

        <ProductDetailCommentsTab
          productId={product.id}
          isVisible={tabIndex === 1}
        />
      )}
    </Box>
  );
}
