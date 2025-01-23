// @deno-types="npm:@types/react@18"
import { ReactNode, useEffect } from "react";
import { Grid2, Paper } from "@mui/material";
import { useLocation } from "wouter";
import NavigationBar from "./navigation/Navbar.component.tsx";
import Sidebar from "./navigation/Sidebar.component.tsx";
import { useRedirectSpec } from "./navigation/utils.ts";

const Layout = ({ children }: { children?: ReactNode }) => {
  const [page, navigate] = useLocation();
  const newPage = useRedirectSpec(page);

  useEffect(() => {
    if (newPage) {
      navigate(newPage);
    }
  }, [newPage]);
  return (
    <>
      <NavigationBar websiteName="Awooo" />
      <Grid2
        spacing={2}
        direction={"row"}
        container
        sx={{
          m: 0,
          p: 0,
          flexShrink: 1,
          flexBasis: "auto",
          height: "100%",
          display: "flex",
        }}
      >
        <Grid2 size={{ sm: 3, md: 2 }} sx={{ display: "flex", flexGrow: 1 }}>
          <Paper
            variant="outlined"
            sx={{
              borderBottom: 0,
              borderTop: 0,
              borderLeft: 0,
              borderRadius: 0,
              pr: 1,
            }}
          >
            <Sidebar />
          </Paper>
        </Grid2>
        <Grid2 size={{ sm: 9, md: 10 }} sx={{ pt: 2, pr: 4, pl: 0, m: 0 }}>
          {children}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;
