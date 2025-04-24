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
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { Rotation } from "../components/gw2/Rotation.component.tsx";
import { convertIdToName } from "../gw2/cms.utils.ts";
import { PrecastComponent } from "../components/gw2/Precast.component.tsx";
import { Attribute } from "@discretize/gw2-ui-new";

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
  const { activeSpec } = useContext(SpecContext);
  const fight = parseLocation(path, "FightPage");
  const [heal, noHeal] = getTemplateConfig(
    {
      fight,
      spec: activeSpec,
    },
  );
  const [activeConfig, setActiveConfig] = useState<TemplateConfig | null>(null);
  const scale = 3;

  useEffect(() => {
    if (activeCompType === CompType.NoHeal && noHeal) {
      setActiveConfig(noHeal);
    } else if (activeCompType === CompType.Heal && heal) {
      setActiveConfig(heal);
    }
  }, [
    activeCompType,
  ]);

  if (!activeConfig) {
    return null;
  }
  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography variant="h3" color="secondary">
          {convertIdToName(fight)}
        </Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          color="secondary"
          value={activeCompType}
          onChange={(_, newCompType) => setCompType(newCompType)}
        >
          <Tooltip title="Heal">
            <ToggleButton
              value={CompType.Heal}
              sx={{ p: 2 }}
              disabled={!heal}
            >
              <Attribute
                style={{ fontSize: "1.5rem" }}
                name="Healing Power"
                disableText={true}
                disableLink={true}
                disableTooltip={true}
              />
              {/* <Favorite /> */}
            </ToggleButton>
          </Tooltip>
          <Tooltip title="No Heal">
            <ToggleButton
              value={CompType.NoHeal}
              sx={{ p: 2 }}
              disabled={!noHeal}
            >
              <Attribute
                style={{ fontSize: "1.5rem" }}
                name="Power"
                disableText={true}
                disableLink={true}
                disableTooltip={true}
              />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
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
