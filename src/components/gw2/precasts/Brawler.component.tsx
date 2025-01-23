import { Stack } from "@mui/material";
import { Item, Skill } from "@discretize/gw2-ui-new";
import {
  UtilitySkills,
  WeaponSkills,
} from "../../../gw2/specializations/soulbeast.ts";
import { Consumables } from "../../../gw2/type.ts";
import { Relics } from "../../../gw2/type.ts";

export const Brawler = () => {
  const mainSkillStyle = { fontSize: "30px" };
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1}>
      <Item id={Consumables.EQUIPTEMPLATE} disableText style={mainSkillStyle} />
      <Item id={Relics.BRAWLER} disableText style={mainSkillStyle} />
      <Skill id={UtilitySkills.BEASTMODE} disableText style={mainSkillStyle} />
      <Skill id={WeaponSkills.S3} disableText style={mainSkillStyle} />
      <Item id={Consumables.EQUIPTEMPLATE} disableText style={mainSkillStyle} />
    </Stack>
  );
};
