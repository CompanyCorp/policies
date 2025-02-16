import { Symbols } from "../../gw2/type.ts";
import { CommonEffect, Item, Skill, Trait } from "@discretize/gw2-ui-new";

export const RotationItem = (
  { type, id, key }: {
    type: Symbols;
    id: number;
    key?: string;
  },
) => {
  if (
    [Symbols.RELIC, Symbols.CONSUMABLE, Symbols.SIGIL, Symbols.NOVELTY]
      .includes(type)
  ) {
    return (
      <Item disableText id={id} style={{ fontSize: "inherit" }} key={key} />
    );
  }
  if (type === Symbols.TRAIT) {
    return (
      <Trait disableText id={id} style={{ fontSize: "inherit" }} key={key} />
    );
  }
  if (type === Symbols.MISC && id === 1) {
    return (
      <CommonEffect
        name="Mistlock Singularity"
        disableText
        style={{ fontSize: "inherit" }}
        key={key}
      />
    );
  }
  return <Skill
    disableText
    id={id}
    style={{ fontSize: "inherit" }}
    key={key}
  />;
};
