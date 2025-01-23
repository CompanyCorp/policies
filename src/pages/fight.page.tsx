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
      <CardHeader title="LOADOUT" />
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

  if (!config) {
    return null;
  }
  return (
    <Stack spacing={4}>
      <Typography variant="h2" color="secondary">
        {convertIdToName(config?.fight)}
      </Typography>
      <Loadout config={config} />
      <Grid2 container spacing={2} direction={"row"}>
        <Grid2
          item
          size={{ xs: 12, sm: 4, md: 6, lg: 4, xl: 4 }}
          sx={{ display: "flex" }}
        >
          <PrecastComponent precasts={config.precasts ?? []} />
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, sm: 8, md: 6, lg: 8, xl: 8 }}
          sx={{ display: "flex", flexGrow: 1 }}
        >
          {config?.rotation && <Rotation rotation={config.rotation} />}
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default FightPage;
