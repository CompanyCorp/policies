import { Specs } from "../gw2/type.ts";
import { Button, Grid2, Typography, useTheme } from "@mui/material";
import { NavigationTab, NavigationTabs } from "./Tabs.component.tsx";
import { WebsiteIcon } from "./Icon.component.tsx";
import { useContext } from "react";
import { SpecContext } from "../../data/spec.context.tsx";

const NavigationBar = (
  { websiteName }: {
    websiteName: string;
  },
) => {
  const theme = useTheme();
  const { activeSpec, specList, setSpec } = useContext(SpecContext);

  return (
    <Grid2
      container
      bgcolor={theme.palette.background.default}
      sx={{ mx: 3, my: 1 }}
    >
      <Grid2 size={{ xs: 2, md: 4 }}>
        <Button
          startIcon={<WebsiteIcon />}
          href="/"
          sx={{
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <Typography
            variant="h3"
            color="white"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {websiteName}
          </Typography>
        </Button>
      </Grid2>
      <Grid2 size={{ xs: 10, md: 8 }}>
        <NavigationTabs role="navigation" value={activeSpec} onChange={setSpec}>
          {specList.map((spec: Specs) => (
            <NavigationTab key={spec} label={spec} value={spec} />
          ))}
        </NavigationTabs>
      </Grid2>
    </Grid2>
  );
};

export default NavigationBar;
