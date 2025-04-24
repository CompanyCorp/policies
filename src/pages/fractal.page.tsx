// @deno-types="npm:@types/react@18"
import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { CompType, getTemplateConfig } from "../data/utils.ts";
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
import { ToggleCompButtons } from "../components/navigation/ToggleComp.component.tsx";

const FractalPage = (): ReactElement | null => {
  const [activeCompType, setCompType] = useState<CompType>(CompType.Heal);
  const { activeSpec } = useContext(SpecContext);
  const { base } = useRouter();
  const [fractal, setFractal] = useState<string>("");

  useEffect(() => {
    if (base !== fractal) {
      setFractal(base);
    }
  }, [base]);

  const fightList = useMemo(() => {
    const parsedPath = parseLocation(fractal, "FightPage");
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
  }, [fractal]);

  const activeConfigs = useMemo(() => {
    if (fightList.length > 0) {
      return fightList.map((fight) => {
        const [heal, noHeal] = getTemplateConfig({ fight, spec: activeSpec });
        if (activeCompType === CompType.Heal) {
          return heal;
        }
        return noHeal;
      }).filter((config) => config !== null);
    }
    return [];
  }, [fightList, activeSpec, activeCompType]);

  return (
    <Stack spacing={2}>
      <ToggleCompButtons
        activeCompType={activeCompType}
        setCompType={setCompType}
      />
      {activeConfigs.map((config, index) => (
        <Card variant="outlined" key={`${config?.fight}-${index}`}>
          <Typography
            variant="h3"
            color="secondary"
            component={Link}
            href={`/${config?.fight}`}
          >
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
