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

export type PhaseSkill = {
  main: {
    id: number;
    type: Symbols;
  }[];
  top?: {
    id: number;
    type: Symbols;
  }[];
};

export type PhaseRotation = {
  skills: PhaseSkill[];
  phaseName: string;
  lastPhase: boolean;
  bossPhase: boolean;
  notes: string[];
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

export type Skill = {
  top: string[];
  main: string[];
} | string;

export type Phase = {
  skills: Skill[];
  phaseName: string;
  lastPhase?: boolean;
  bossPhase?: boolean;
  notes?: string[];
};

type ClassRawConfig = {
  id: string;
  relic: string;
  sigils?: string[];
  consumables: string[];
  weapons?: string[];
  skills?: string[];
  rotation?: Phase[];
  precasts?: string[];
};

export type Precast = {
  id: string;
  name: string;
  skills: Skill[];
  notes?: string[];
};

export const getRotation = (
  rotation: Phase[],
): PhaseRotation[] => {
  const rotationResult = rotation.map((phase) => {
    const { phaseName, skills, lastPhase, bossPhase, notes } = phase;
    const phaseRotation = skills.map((phaseSkill) => {
      let result: PhaseSkill;
      if (typeof phaseSkill === "string") {
        const { ids, type } = getGw2Ids(phaseSkill);
        const main = ids.map((id) => ({ id, type: type }));
        result = { main };
      } else {
        const mainIds = phaseSkill.main ? phaseSkill.main.map(getGw2Ids) : [];
        const topIds = phaseSkill.top ? phaseSkill.top.map(getGw2Ids) : [];

        const main = mainIds.flatMap((s) =>
          s.ids.map((id) => ({ id, type: s.type }))
        );
        const top = topIds.flatMap((s) =>
          s.ids.map((id) => ({ id, type: s.type }))
        );

        result = { main, top };
      }
      return result;
    });
    const result = {
      skills: phaseRotation,
      phaseName,
      lastPhase: !!lastPhase,
      bossPhase: !!bossPhase,
      notes: notes || [],
    };
    return result;
  });
  return rotationResult;
};

export const getTemplateConfig = (
  fight: string,
  spec: Specs,
): TemplateConfig | null => {
  let classes: ClassRawConfig[] = [];
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
  const classConfig: ClassRawConfig | undefined = classes.find((c) =>
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
      precasts: precasts ? precasts as Precasts[] : [],
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
