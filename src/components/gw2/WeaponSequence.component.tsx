import { CommonEffect, Item, Skill, Trait } from "@discretize/gw2-ui-new";
import { PhaseRotation } from "../../data/utils.ts";
import { Symbols } from "../../gw2/type.ts";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Variant } from "@mui/material/style/createTypography";

const RotationItem = (
  { type, id }: {
    type: Symbols;
    id: number;
  },
) => {
  if (
    [Symbols.RELIC, Symbols.CONSUMABLE, Symbols.SIGIL, Symbols.NOVELTY]
      .includes(type)
  ) {
    return <Item disableText id={id} style={{ fontSize: 'inherit'}} />;
  }
  if (type === Symbols.TRAIT) {
    return <Trait disableText id={id} style={{ fontSize: 'inherit'}} />;
  }
  if (type === Symbols.MISC && id === 1) {
    return (
      <CommonEffect
        name="Mistlock Singularity"
        disableText
        style={{ fontSize: 'inherit'}}
      />
    );
  }
  return <Skill disableText id={id} style={{ fontSize: 'inherit'}} />;
};

const WeaponSwapIcon = () => {
  const style = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "end",
        height: style.typography.h2.fontSize as string,
        paddingBottom: style.typography.body2.fontSize as string,
      }}
    >
      <img src="/policies/weaponswap.png" height="100%" />
    </Box>
  );
};

export const WeaponSequence = (
  { skills, sizes }: { skills: PhaseRotation["skills"], sizes: { top: Variant, main: Variant } },
) => {
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
              <Typography variant={sizes.top}>
              <RotationItem
                type={top.type}
                id={top.id}
              />
              </Typography>
            )}
            {main.id !== 0 && (
              <Typography variant={sizes.main}>
                <RotationItem
                  type={main.type}
                  id={main.id}
                />
              </Typography>
            )}
          </Stack>
          {main.id === 0 && <WeaponSwapIcon />}
        </>
      ))}
    </Stack>
  );
};
