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
          height: "100%",
          flexBasis: "auto",
          display: "flex",
        }}
      >
        <Grid2
          size={{ xs: 12, sm: 4, md: 3, lg: 2, xl: 2 }}
          sx={{
            display: "flex",
            height: {
              xs: "fit-content",
              sm: "100%",
            },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              borderBottom: {
                xs: undefined,
                sm: 0,
              },
              borderTop: 0,
              borderLeft: 0,
              borderRadius: 0,
              pr: 1,
              width: "100%",
            }}
          >
            <Sidebar />
          </Paper>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 8, md: 9, xl: 10, lg: 10 }}
          sx={{
            pt: 2,
            pr: 2,
            pl: 0,
            m: 0,
            overflowY: "auto",
            maxHeight: "91lvh",
          }}
        >
          {children}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;
