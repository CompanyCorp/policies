import nightmareConfig from "../configs/nightmare.json" with { type: "json" };
import shatteredConfig from "../configs/shattered.json" with { type: "json" };
import sunquaConfig from "../configs/sunqua.json" with { type: "json" };
import silentSurfConfig from "../configs/silentsurf.json" with { type: "json" };
import { Precasts, Specs, Symbols } from "../gw2/type.ts";
import { getGw2Ids } from "../gw2/utils.ts";
import {
  isNightmareFight,
  isShatteredObservatoryFight,
  isSilentSurfFight,
  isSunquaPeakFight,
} from "../gw2/cms.utils.ts";

export type Skill = string | string[];

export type Phase = {
  skills: Skill[];
  phaseName: string;
  lastPhase?: boolean;
};

type ClassConfig = {
  id: string;
  relic: string;
  sigils?: string[];
  consumables: string[];
  weapons?: string[];
  skills?: string[];
  rotation?: Phase[];
  precasts?: Precasts[];
};

export type PhaseRotation = {
  skills: {
    main: {
      id: number;
      type: Symbols;
    };
    top?: {
      id: number;
      type: Symbols;
    };
  }[];
  phaseName: string;
  lastPhase: boolean;
};

export type TemplateConfig = {
  relicId: number;
  sigilIds?: number[];
  consumablesIds: number[];
  weaponIds?: number[];
  skillIds?: number[];
  fight?: string;
  rotation?: PhaseRotation[];
  precasts?: Precasts[];
};

export const getRotation = (
  rotation: Phase[],
): PhaseRotation[] => {
  const rotationResult = rotation.map((phase) => {
    const { phaseName, skills, lastPhase } = phase;
    const phaseRotation = skills.map((skill: Skill) => {
      if (typeof skill === "string") {
        const { ids, type } = getGw2Ids(skill);
        return { main: { id: ids[0], type } };
      } else {
        const [top, main] = skill.map((s) => getGw2Ids(s));
        return {
          main: {
            id: main.ids[0],
            type: main.type,
          },
          top: {
            id: top.ids[0],
            type: top.type,
          },
        };
      }
    });
    const result = { skills: phaseRotation, phaseName, lastPhase: !!lastPhase };
    return result;
  });
  return rotationResult;
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
    const { relic, sigils, consumables, weapons, skills, rotation, precasts } =
      classConfig;
    const [relicId] = getGw2Ids(relic).ids;
    const consumablesIds = consumables.map((c) => getGw2Ids(c).ids).flatMap((
      c,
    ) => c);
    const result: TemplateConfig = {
      relicId,
      consumablesIds,
      fight,
      precasts,
    };
    if (sigils) {
      const sigilIds = sigils.map((s) => getGw2Ids(s).ids).flatMap((
        s,
      ) => s);
      result.sigilIds = sigilIds;
    }
    if (weapons) {
      const weaponIds = weapons.map((s) => getGw2Ids(s).ids).flatMap((s) => s);
      result.weaponIds = weaponIds;
    }
    if (skills) {
      const skillIds = skills.map((s) => getGw2Ids(s).ids).flatMap((s) => s);
      result.skillIds = skillIds;
    }
    if (rotation) {
      result.rotation = getRotation(rotation);
    }
    return result;
  }
  return null;
};
