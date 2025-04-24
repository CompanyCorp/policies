// @deno-types="npm:@types/react@18"
import { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { CompType, getTemplateConfig, TemplateConfig } from "../data/utils.ts";
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
import { ToggleCompButtons } from "../components/navigation/ToggleComp.component.tsx";

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
  const [activeCompType, setCompType] = useState<CompType>(CompType.Heal);
  const [path] = useLocation();
  const [fight, setFight] = useState<string>("");
  const { activeSpec } = useContext(SpecContext);
  const [[heal, noHeal], setConfigs] = useState<(TemplateConfig | null)[]>([]);
  const [activeConfig, setActiveConfig] = useState<TemplateConfig | null>(null);
  const scale = 3;

  useEffect(() => {
    const fightFromPath = parseLocation(path, "FightPage");
    setFight(fightFromPath);
    const configs = getTemplateConfig(
      {
        fight: fightFromPath,
        spec: activeSpec,
      },
    );
    const [heal, noHeal] = configs;
    setConfigs(configs);
    if (activeCompType === CompType.NoHeal && !noHeal) {
      setCompType(CompType.Heal);
    }
    if (activeCompType === CompType.Heal && !heal) {
      setCompType(CompType.NoHeal);
    }
    if (activeCompType === CompType.NoHeal && noHeal) {
      setActiveConfig(noHeal);
    }
    if (activeCompType === CompType.Heal && heal) {
      setActiveConfig(heal);
    }
  }, [activeCompType, path]);

  if (!activeConfig) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h3" color="secondary">
          {convertIdToName(fight)}
        </Typography>
        <ToggleCompButtons
          activeCompType={activeCompType}
          setCompType={setCompType}
          healDisabled={heal === null}
          noHealDisabled={noHeal === null}
        />
      </Stack>

      <Loadout config={activeConfig} />
      <Grid2 container spacing={2} direction={"row"} sx={{ pb: 10 }}>
        <Grid2
          size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}
          sx={{ display: "flex" }}
        >
          <PrecastComponent
            precasts={activeConfig.precasts ?? []}
            scale={scale}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 8 }}
          sx={{ display: "flex", width: "100%", height: "fit-content" }}
        >
          {activeConfig?.rotation && (
            <Rotation rotation={activeConfig.rotation} scale={scale} />
          )}
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default FightPage;
