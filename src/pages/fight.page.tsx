// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import { Card, CardContent, Typography } from "@mui/material";
import { convertIdToName } from "../gw2/cms.ts";

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
    <Card>
      <CardContent>
        <Typography variant="h4">
          {convertIdToName(config?.fight)}
        </Typography>
        <SetupTable
          {...config}
        />
      </CardContent>
    </Card>
  );
};

export default FightPage;
