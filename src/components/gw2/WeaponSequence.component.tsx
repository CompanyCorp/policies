import { CommonEffect, Icon, Item, Skill, Trait } from "@discretize/gw2-ui-new";
import { PhaseSkill } from "../../data/utils.ts";
import { Symbols } from "../../gw2/type.ts";
import { Stack, Typography } from "@mui/material";
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
    return <Item disableText id={id} style={{ fontSize: "inherit" }} />;
  }
  if (type === Symbols.TRAIT) {
    return <Trait disableText id={id} style={{ fontSize: "inherit" }} />;
  }
  if (type === Symbols.MISC && id === 1) {
    return (
      <CommonEffect
        name="Mistlock Singularity"
        disableText
        style={{ fontSize: "inherit" }}
      />
    );
  }
  return <Skill disableText id={id} style={{ fontSize: "inherit" }} />;
};

export const WeaponSequence = (
  { skills, sizes }: {
    skills: PhaseSkill[];
    sizes: { top: Variant; main: Variant };
  },
) => {
  return (
    <>
      {skills.map(({ top, main }, index) => (
        <Stack
          direction={"column"}
          key={`phase-${index}`}
          spacing={-1.5}
          sx={{
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {top && (
            <Stack direction={"row"}>
              {top.map((skill) => (
                <Typography variant={sizes.top} key={skill.id}>
                  <RotationItem
                    type={skill.type}
                    id={skill.id}
                  />
                </Typography>
              ))}
            </Stack>
          )}
          {main.length === 1 && main[0].id === 0
            ? (
              <Typography variant={sizes.main} key={`weapon-swap`}>
                <Icon name="WeaponSwap" />
              </Typography>
            )
            : (
              <Stack direction={"row"}>
                {main.map((skill) => (
                  <Typography variant={sizes.main} key={skill.id}>
                    <RotationItem
                      type={skill.type}
                      id={skill.id}
                    />
                  </Typography>
                ))}
              </Stack>
            )}
        </Stack>
      ))}
    </>
  );
};
