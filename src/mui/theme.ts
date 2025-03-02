import { ThemeOptions, createTheme } from "@mui/material";

//NOTE: You can customize the MUI theme here.
//By reviewing MUI's documentation, you can make customizations to colors, CSS, and components
const baseTheme: ThemeOptions = {
  palette: {
    mode: "light",
  },
  components: {},
};

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "dark",
  },
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    mode: "light",
  },
  components: {
    ...baseTheme.components,
  },
});
