import { useLocation } from "wouter";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import Layout from "../components/layout.component.tsx";
import { getTemplateConfig } from "../data/utils.ts";
// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { SpecContext } from "../data/spec.context.tsx";
import { Specs } from "../gw2/type.ts";
import { parseLocation } from "../components/navigation/utils.ts";

const NightmarePage = () => {
  const [path] = useLocation();
  const { activeSpec } = useContext(SpecContext);
  const config = getTemplateConfig(parseLocation(path), activeSpec);
  return (
    <Layout>
      {config && (
        <SetupTable
          {...config}
          weaponName={activeSpec === Specs.SLB ? "Hammer" : undefined}
        />
      )}
    </Layout>
  );
};

export default NightmarePage;
