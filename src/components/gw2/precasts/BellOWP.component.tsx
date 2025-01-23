import { Stack } from "@mui/material";
import { CommonEffect, Item, Skill, Trait } from "@discretize/gw2-ui-new";
import {
  Traits,
  UtilitySkills,
} from "../../../gw2/specializations/soulbeast.ts";
import { Novelties } from "../../../gw2/type.ts";

export const BellOWP = () => {
  const mainSkillStyle = { fontSize: "30px" };
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap" }} spacing={1}>
      <Trait id={Traits.LEADEROFTHEPACK} disableText style={mainSkillStyle} />
      <Skill
        id={UtilitySkills.ONEWOLFPACK}
        disableText
        style={mainSkillStyle}
      />
      <CommonEffect
        name="Mistlock Singularity"
        disableText
        style={mainSkillStyle}
      />
      <Skill
        id={UtilitySkills.ONEWOLFPACK}
        disableText
        style={mainSkillStyle}
      />
      <Item id={Novelties.BELL} disableText style={mainSkillStyle} />
      <Trait
        id={Traits.OPPRESSIVESUPERIORITY}
        disableText
        style={mainSkillStyle}
      />
    </Stack>
  );
};
