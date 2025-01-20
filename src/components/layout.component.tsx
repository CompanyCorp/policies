// @deno-types="npm:@types/react@18"
import { ReactNode, useEffect } from "react";
import { Grid2 } from "@mui/material";
import { useLocation } from "wouter";
import NavigationBar from "./navigation/bar.component.tsx";
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
        >
          {children}
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;
