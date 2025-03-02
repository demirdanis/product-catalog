"use client";

import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import { IProductDetailCommentsTab } from "./ProductCommentsTab.types";
import ProductCommentsTabGrid from "../ProductCommentsTabGrid/ProductCommentsTabGrid";
import styles from "./ProductCommentsTab.module.scss";
import { useProductCommentStore } from "@/store/productComments";
import { useState } from "react";

export default function ProductDetailCommentsTab({
  productId,
  isVisible,
}: Readonly<IProductDetailCommentsTab>) {
  const [newComment, setNewComment] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(2.5);

  const { addComment, loadingOnAdd } = useProductCommentStore();

  const handleAddComment = async () => {
    const response = await addComment({
      productId: productId,
      comment: newComment,
      rating: newRating,
    });

    if (response) {
      setNewComment("");
      setNewRating(0);
    }
  };

  return (
    <Box className={`${styles.container} ${!isVisible ? styles.hidden : ""}`}>
      <Typography variant="h5" gutterBottom>
        Comments & Ratings
      </Typography>

      <ProductCommentsTabGrid productId={productId} isVisible={isVisible} />

      <Typography variant="h5" gutterBottom mt={4}>
        Add New Comment
      </Typography>

      <Box className={styles.commentInput}>
        <TextField
          label="Your Comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Box className={styles.ratingContainer}>
          <Rating
            value={newRating}
            onChange={(_, newValue) => setNewRating(newValue ?? 0)}
            precision={0.5}
          />
        </Box>
        <Button
          variant="contained"
          className={styles.addButton}
          onClick={handleAddComment}
          size="large"
          disabled={loadingOnAdd || (!newComment && newRating === null)}
        >
          {loadingOnAdd ? (
            <CircularProgress className={styles.loadingSpinner} size={27} />
          ) : (
            "Add Comment"
          )}
        </Button>
      </Box>
    </Box>
  );
}
