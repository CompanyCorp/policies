import { Grid2 } from "@mui/material";
import NavigationBar from "./navigation/bar.component.tsx";
import { useTheme } from "@mui/material";
import Sidebar from "./navigation/Sidebar.component.tsx";
// @deno-types="npm:@types/react@18"
import { ReactNode } from "react";

const Layout = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme();
  return (
    <>
      <NavigationBar websiteName="Awooo" />
      <Grid2
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mx: 3, my: 1, flexShrink: 1, flexGrow: 0, flexBasis: "auto" }}
      >
        <Grid2 size={2}>
          <Sidebar />
        </Grid2>
        <Grid2
          size={10}
          sx={{ flexShrink: 0, flexGrow: 1, flexBasis: "auto" }}
          bgcolor={theme.palette.background.paper}
        >
          {children}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;
