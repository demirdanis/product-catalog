import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { ISecureHeader } from "./SecureHeader.types";
import { loginUrl } from "@/contants/urls";
import { logout } from "@/services/logout";
import styles from "./SecureHeader.module.scss";
import { useRouter } from "next/navigation";

export default function SecureHeader({ fullName }: Readonly<ISecureHeader>) {
  const router = useRouter();

  const handleLogout = () => {
    //NOTE: Since the cookie set during login is set on the server-side, it needs to be deleted through an API call on logout, which is why the logout API is called here.
    //A cookie set on the server-side cannot be deleted on the client-side.
    logout()
      .then((response) => {
        if (response && response.data && response.data.success) {
          router.push(loginUrl);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Function to get the initials from the full name
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <AppBar className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box>
          <Typography variant="h6" className={styles.headerTitle}>
            Product Catalog
          </Typography>
        </Box>

        <Box className={styles.userSection}>
          <Typography variant="body1" className={styles.userName}>
            {fullName}
          </Typography>
          <Typography variant="body1" className={styles.userNameChars}>
            {getInitials(fullName)}
          </Typography>
          <Button
            className={styles.logoutButton}
            onClick={handleLogout}
            startIcon={<AccountCircle />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
