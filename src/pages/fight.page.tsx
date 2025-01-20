// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { getTemplateConfig } from "../data/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import { Specs } from "../gw2/type.ts";

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
    <SetupTable
      {...config}
      weaponName={activeSpec === Specs.SLB ? "Hammer" : undefined}
    />
  );
};

export default FightPage;
