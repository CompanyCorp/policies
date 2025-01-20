import SetupTable from "../components/gw2/SetupTable.component.tsx";
import Layout from "../components/layout.component.tsx";
import { CMFightId, Specs } from "@gw2";
import { getTemplateConfig } from "../data/utils.ts";

const NightmarePage = () => {
  const config = getTemplateConfig(CMFightId.MAMA, Specs.SLB);
  return (
    <Layout>
      <SetupTable
        {...config}
        weaponName={"Hammer"}
      />
    </Layout>
  );
};

export default NightmarePage;
