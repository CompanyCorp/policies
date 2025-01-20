import nightmareConfig from "../configs/nightmare.json" with { type: "json" };
import { CMFightId, convertToIds, NotFoundError, Specs, Symbols } from "@gw2";

type ClassConfig = {
  id: string;
  relic: string;
  sigils: string[];
  consumables: string[];
  skills?: string[];
};

export type TemplateConfig = {
  relicId: number;
  sigilIds: number[];
  consumablesIds: number[];
  skillIds?: number[];
};

export const getTemplateConfig = (
  fight: CMFightId,
  spec: Specs,
): TemplateConfig => {
  let classes: ClassConfig[] = [];
  switch (fight) {
    case CMFightId.MAMA: {
      classes = nightmareConfig[fight].classes;
      break;
    }
    default:
      throw new NotFoundError([fight], [Symbols.FIGHT]);
  }
  const result = classes.find((c) => c.id === spec);
  if (result) {
    const { relic, sigils, consumables, skills } = result;
    const [relicId] = convertToIds(Symbols.RELIC, [relic]);
    const sigilIds = convertToIds(Symbols.SIGIL, sigils);
    const consumablesIds = convertToIds(Symbols.CONSUMABLE, consumables);
    if (skills) {
      const skillIds = convertToIds(Symbols.WEAPON, skills, spec);
      return {
        relicId,
        sigilIds,
        consumablesIds,
        skillIds,
      };
    }
    return {
      relicId,
      sigilIds,
      consumablesIds,
    };
  }
  throw new NotFoundError([spec], [Symbols.SPEC]);
};
