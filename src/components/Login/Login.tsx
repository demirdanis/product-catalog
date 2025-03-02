"use client";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

import { ILogin } from "./Login.types";
import styles from "./Login.module.scss";
import { useState } from "react";

export default function Login({ error, loading, onLogin }: Readonly<ILogin>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      onLogin({ username, password });
    }
  };

  return (
    <Box className={styles.container}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={styles.loginForm}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography className={styles.errorText}>{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            <CircularProgress className={styles.loadingSpinner} size={27} />
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </Box>
  );
}
