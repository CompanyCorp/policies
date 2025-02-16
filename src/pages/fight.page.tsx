// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig, TemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { Rotation } from "../components/gw2/Rotation.component.tsx";
import { convertIdToName } from "../gw2/cms.utils.ts";
import { PrecastComponent } from "../components/gw2/Precast.component.tsx";

const Loadout = ({ config }: { config: TemplateConfig }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        subheader="LOADOUT"
        slotProps={{ subheader: { variant: "h5" } }}
      />
      <CardContent>
        <SetupTable
          {...config}
        />
      </CardContent>
    </Card>
  );
};

const FightPage = () => {
  const [path] = useLocation();
  const { activeSpec } = useContext(SpecContext);
  const config = getTemplateConfig(
    parseLocation(path, "FightPage"),
    activeSpec,
  );
  const scale = 3;

  if (!config) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Typography variant="h3" color="secondary">
        {convertIdToName(config?.fight)}
      </Typography>
      <Loadout config={config} />
      <Grid2 container spacing={2} direction={"row"} sx={{ pb: 10 }}>
        <Grid2
          size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}
          sx={{ display: "flex" }}
        >
          <PrecastComponent
            precasts={config.precasts ?? []}
            scale={scale}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 8 }}
          sx={{ display: "flex", width: "100%", height: "fit-content" }}
        >
          {config?.rotation && (
            <Rotation rotation={config.rotation} scale={scale} />
          )}
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default FightPage;
