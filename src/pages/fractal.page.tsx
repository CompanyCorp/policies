// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { useLocation, useRouter } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import { Specs } from "../gw2/type.ts";
import {
  CMId,
  convertIdToName,
  nightmareMap,
  shatteredObservatoryMap,
  silentSurfMap,
  SunquaPeakFight,
  sunquaPeakMap,
} from "../gw2/cms.ts";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const useFightList = () => {
  const router = useRouter();
  console.log("useFightList path", router.base);
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

const FractalPage = () => {
  const { activeSpec } = useContext(SpecContext);
  const fightList = useFightList();

  console.log("fightList", fightList);
  const configs = fightList.map((fight) => getTemplateConfig(fight, activeSpec))
    .filter((config) => config !== null);

  if (configs.length === 0) {
    return null;
  }
  return (
    <Stack spacing={2}>
      {configs.map((config) => (
        <Card>
          <CardContent>
            <Typography variant="h4">
              {convertIdToName(config?.fight)}
            </Typography>
            <SetupTable
              {...config}
              weaponName={activeSpec === Specs.SLB ? "Hammer" : undefined}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default FractalPage;
