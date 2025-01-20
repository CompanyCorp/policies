import { useLocation } from "wouter";
import Layout from "../components/layout.component.tsx";
// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import SetupTable from "../components/gw2/SetupTable.component.tsx";
import { parseLocation } from "../components/navigation/utils.ts";
import { SpecContext } from "../data/spec.context.tsx";
import { getTemplateConfig } from "../data/utils.ts";
import { Specs } from "../gw2/type.ts";

const ShatteredPage = () => {
  const { activeSpec } = useContext(SpecContext);
  const [path] = useLocation();
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

export default ShatteredPage;
