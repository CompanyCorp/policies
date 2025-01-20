import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-tree-view/themeAugmentation";

export const mainTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#010108",
      light: "#3e4260",
      dark: "#010108",
    },
    secondary: {
      main: "#F54B29",
    },
    background: {
      paper: "#1F223D",
      default: "#080B21",
    },
    divider: "#7f7fa0",
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiRichTreeView: {
      styleOverrides: {
        root: {
          backgroundColor: "#080B21",
        },
      },
    },
  },
});
