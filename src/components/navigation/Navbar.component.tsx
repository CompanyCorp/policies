import { Button, Grid2, Typography, useTheme } from "@mui/material";
import { NavigationTab, NavigationTabs } from "./Tabs.component.tsx";
import { WebsiteIcon } from "./Icon.component.tsx";
// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { SpecContext } from "../../data/spec.context.tsx";
import { Specs } from "../../gw2/type.ts";
import { maxHeight } from "../../../../../../AppData/Local/deno/npm/registry.npmjs.org/@mui/system/6.4.0/index.d.ts";

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
      sx={{
        px: 3,
        py: 1,
        m: 0,
        borderBottom: 1,
        borderColor: "divider",
        height: "fit-content",
        maxHeight: "100lvh",
      }}
    >
      <Grid2 size={{ xs: 5, md: 4 }}>
        <Button
          startIcon={<WebsiteIcon />}
          href="/policies"
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
      <Grid2 size={{ xs: 7, md: 8 }}>
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
