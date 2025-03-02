"use client";

import { Box, Container } from "@mui/material";

import { ISecureLayout } from "./SecureLayout.types";
import SecureHeader from "../SecureHeader/SecureHeader";
import styles from "./SecureLayout.module.scss";

export default function SecureLayout({
  children,
  fullName,
}: Readonly<ISecureLayout>) {
  return (
    <Box className={styles.layoutContainer}>
      <SecureHeader fullName={fullName} />

      <Box component="main" className={styles.mainContent}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
