import nightmareConfig from "../configs/nightmare.json" with { type: "json" };
import shatteredConfig from "../configs/shattered.json" with { type: "json" };
import sunquaConfig from "../configs/sunqua.json" with { type: "json" };
import silentSurfConfig from "../configs/silentsurf.json" with { type: "json" };
import {
  isNightmareFight,
  isShatteredObservatoryFight,
  isSilentSurfFight,
  isSunquaPeakFight,
} from "../gw2/cms.ts";
import { Specs, Symbols } from "../gw2/type.ts";
import { convertToIds } from "../gw2/utils.ts";

type ClassConfig = {
  id: string;
  relic: string;
  sigils?: string[];
  consumables: string[];
  weapons?: string[];
  skills?: string[];
};

export type TemplateConfig = {
  relicId: number;
  sigilIds?: number[];
  consumablesIds: number[];
  weaponIds?: number[];
  skillIds?: number[];
};

export const getTemplateConfig = (
  fight: string,
  spec: Specs,
): TemplateConfig | null => {
  let classes: ClassConfig[] = [];
  if (isNightmareFight(fight)) {
    classes = nightmareConfig[fight].classes;
  }
  if (isShatteredObservatoryFight(fight)) {
    classes = shatteredConfig[fight].classes;
  }
  if (isSunquaPeakFight(fight)) {
    classes = sunquaConfig[fight].classes;
  }
  if (isSilentSurfFight(fight)) {
    classes = silentSurfConfig[fight].classes;
  }
  const classConfig: ClassConfig | undefined = classes.find((c) =>
    c.id === spec
  );
  if (classConfig) {
    const { relic, sigils, consumables, weapons, skills } = classConfig;
    const [relicId] = convertToIds(Symbols.RELIC, [relic]);
    const consumablesIds = convertToIds(Symbols.CONSUMABLE, consumables);
    const result: TemplateConfig = {
      relicId,
      consumablesIds,
    };
    if (sigils) {
      const sigilIds = convertToIds(Symbols.SIGIL, sigils);
      result.sigilIds = sigilIds;
    }
    if (weapons) {
      const weaponIds = convertToIds(Symbols.WEAPON, weapons, spec);
      result.weaponIds = weaponIds;
    }
    if (skills) {
      const skillIds = convertToIds(Symbols.SKILL, skills, spec);
      result.skillIds = skillIds;
    }
    return result;
  }
  return null;
};
