import { Box, Button, Typography } from "@mui/material";

import { productUrl } from "@/contants/urls";
import styles from "./NotFound.module.scss";
import { useNotFoundStore } from "@/store/notFound";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const { data } = useNotFoundStore();

  const handleGoHome = () => {
    router.push(data.redirectUrl ?? productUrl);
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        {data.title}
      </Typography>
      {data.message && (
        <Typography variant="h5" className={styles.message}>
          {data.message}
        </Typography>
      )}

      <Button
        variant="contained"
        className={styles.button}
        onClick={handleGoHome}
      >
        {data.buttonLabel}
      </Button>
    </Box>
  );
}
