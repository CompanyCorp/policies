// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { convertIdToName } from "../gw2/cms.ts";
import { Rotation } from "../components/gw2/Rotation.component.tsx";

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
      <Card variant="outlined">
        <CardHeader title="LOADOUT" />
        <CardContent>
          <SetupTable
            {...config}
          />
        </CardContent>
      </Card>
      {config?.rotation && <Rotation rotation={config.rotation} />}
    </Stack>
  );
};

export default FightPage;
