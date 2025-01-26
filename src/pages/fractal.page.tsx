// @deno-types="npm:@types/react@18"
import { ReactElement, useContext } from "react";
import { useRouter } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import {
  CMId,
  nightmareMap,
  shatteredObservatoryMap,
  silentSurfMap,
  sunquaPeakMap,
} from "../gw2/cms.ts";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { convertIdToName } from "../gw2/cms.utils.ts";
import { Link } from "wouter";

const useFightList = () => {
  const router = useRouter();
  const parsedPath = parseLocation(router.base, "FightPage");
  switch (parsedPath) {
    case CMId.Nightmare:
      return nightmareMap.keys().toArray();
    case CMId.ShatteredObservatory:
      return shatteredObservatoryMap.keys().toArray();
    case CMId.SunquaPeak:
      return sunquaPeakMap.keys().toArray();
    case CMId.SilentSurf:
      return silentSurfMap.keys().toArray();
    default:
      return [];
  }
};

const FractalPage = (): ReactElement | null => {
  const { activeSpec } = useContext(SpecContext);
  const fightList = useFightList();

  const configs = fightList.map((fight) => getTemplateConfig(fight, activeSpec))
    .filter((config) => config !== null);

  if (configs.length === 0) {
    return null;
  }
  return (
    <Stack spacing={2}>
      {configs.map((config) => (
        <Card variant="outlined">
          <Typography variant="h2" color="secondary" component={Link} href={`/${config?.fight}`}>
              {convertIdToName(config?.fight)}
            </Typography>
          <CardContent>
            <SetupTable
              {...config}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FractalPage;
