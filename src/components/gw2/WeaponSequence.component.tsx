import { CommonEffect, Item, Skill, Trait } from "@discretize/gw2-ui-new";
import { PhaseRotation } from "../../data/utils.ts";
import { Symbols } from "../../gw2/type.ts";
import { Box, Stack } from "@mui/material";

const RotationItem = (
  { type, id, style }: {
    type: Symbols;
    id: number;
    style: Record<string, string>;
  },
) => {
  if (
    [Symbols.RELIC, Symbols.CONSUMABLE, Symbols.SIGIL, Symbols.NOVELTY]
      .includes(type)
  ) {
    return <Item disableText id={id} style={style} />;
  }
  if (type === Symbols.TRAIT) {
    return <Trait disableText id={id} style={style} />;
  }
  if (type === Symbols.MISC && id === 1) {
    return (
      <CommonEffect
        name="Mistlock Singularity"
        disableText
        style={style}
      />
    );
  }
  return <Skill disableText id={id} style={style} />;
};

const WeaponSwapIcon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "end",
        height: "100%",
        paddingBottom: "12px",
      }}
    >
      <img src="/policies/weaponswap.png" height="24px" />
    </Box>
  );
};

export const WeaponSequence = (
  { skills }: { skills: PhaseRotation["skills"] },
) => {
  const mainSkillStyle = { fontSize: "30px", padding: "0px" };
  const topSkillStyle = { fontSize: "20px" };

  return (
    <Stack direction={"row"} spacing={0.5} sx={{ flexWrap: "wrap" }}>
      {skills.map(({ top, main }) => (
        <>
          <Stack
            direction={"column"}
            key={main.id}
            spacing={-1}
            sx={{
              alignItems: "center",
              justifyContent: "end",
              py: 0,
              my: 0,
            }}
          >
            {top && (
              <RotationItem
                type={top.type}
                id={top.id}
                style={topSkillStyle}
              />
            )}
            {main.id !== 0 && (
              <RotationItem
                type={main.type}
                id={main.id}
                style={mainSkillStyle}
              />
            )}
          </Stack>
          {main.id === 0 && <WeaponSwapIcon />}
        </>
      ))}
    </Stack>
  );
};
