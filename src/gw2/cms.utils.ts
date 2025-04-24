import { TreeViewBaseItem } from "@mui/x-tree-view";
import {
  ChallengeMode,
  CMFightId,
  CMId,
  NightmareFight,
  nightmareMap,
  ShatteredObservatoryFight,
  shatteredObservatoryMap,
  SilentSurfFight,
  silentSurfMap,
  SunquaPeakFight,
  sunquaPeakMap,
} from "./cms.ts";

export const isNightmareFight = (
  id: string,
): id is NightmareFight => {
  return nightmareMap.has(id);
};

export const isShatteredObservatoryFight = (
  id: string,
): id is ShatteredObservatoryFight => {
  return shatteredObservatoryMap.has(id);
};

export const isSunquaPeakFight = (
  id: string,
): id is SunquaPeakFight => {
  return sunquaPeakMap.has(id);
};

export const convertIdToName = (id?: string) => {
  if (id === SunquaPeakFight.ElementalAi) {
    return "Elemental Ai";
  }
  if (id === SunquaPeakFight.DarkAi) {
    return "Dark Ai";
  }
  return id;
};

export const isSilentSurfFight = (
  id: string,
): id is SilentSurfFight => {
  return silentSurfMap.has(id);
};

export const isCMFight = (
  id: string,
): id is CMFightId => {
  return (
    isNightmareFight(id) ||
    isShatteredObservatoryFight(id) ||
    isSunquaPeakFight(id) ||
    isSilentSurfFight(id)
  );
};

export const usePowerFights = () => {
  const powerFights: TreeViewBaseItem<
    { id?: string; label: string; href?: string }
  >[] = [
    {
      id: CMId.Nightmare,
      label: ChallengeMode.Nightmare,
      children: [
        {
          id: NightmareFight.MAMA,
          label: NightmareFight.MAMA,
          href: `${CMId.Nightmare}/${NightmareFight.MAMA}`,
        },
        {
          id: NightmareFight.Siax,
          label: NightmareFight.Siax,
          href: `${CMId.Nightmare}/${NightmareFight.Siax}`,
        },
        {
          id: NightmareFight.Ensolyss,
          label: NightmareFight.Ensolyss,
          href: `${CMId.Nightmare}/${NightmareFight.Ensolyss}`,
        },
      ],
      href: `${CMId.Nightmare}`,
    },
    {
      id: CMId.ShatteredObservatory,
      label: ChallengeMode.ShatteredObservatory,
      children: [
        {
          id: ShatteredObservatoryFight.Skorvald,
          label: ShatteredObservatoryFight.Skorvald,
          href:
            `${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Skorvald}`,
        },
        {
          id: ShatteredObservatoryFight.Artsariiv,
          label: ShatteredObservatoryFight.Artsariiv,
          href:
            `${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Artsariiv}`,
        },
        {
          id: ShatteredObservatoryFight.Arkk,
          label: ShatteredObservatoryFight.Arkk,
          href:
            `${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Arkk}`,
        },
      ],
      href: CMId.ShatteredObservatory,
    },
  ];
  return powerFights;
};

export const isPowerFight = (input: string) => {
  const allFights: string[] = [];
  usePowerFights().forEach((f) => {
    if (f.id) allFights.push(f.id);
    f.children?.forEach((c) => {
      if (c.id) allFights.push(c.id);
    });
  });
  return allFights.some((id) => id === input);
};

export const useCondiFights = () => {
  const condiFights: TreeViewBaseItem<
    { id?: string; label: string; href?: string }
  >[] = [
    {
      id: CMId.SunquaPeak,
      label: ChallengeMode.SunquaPeak,
      children: [
        {
          id: SunquaPeakFight.ElementalAi,
          label: "Elemental Ai",
          href: `${CMId.SunquaPeak}/${SunquaPeakFight.ElementalAi}`,
        },
        {
          id: SunquaPeakFight.DarkAi,
          label: "Dark Ai",
          href: `${CMId.SunquaPeak}/${SunquaPeakFight.DarkAi}`,
        },
      ],
      href: CMId.SunquaPeak,
    },
    {
      id: CMId.SilentSurf,
      label: ChallengeMode.SilentSurf,
      children: [{
        id: SilentSurfFight.Kanaxai,
        label: SilentSurfFight.Kanaxai,
        href: `${CMId.SilentSurf}/${SilentSurfFight.Kanaxai}`,
      }],
      href: CMId.SilentSurf,
    },
  ];
  return condiFights;
};

export const isCondiFight = (input: string) => {
  const allFights: string[] = [];
  useCondiFights().forEach((f) => {
    if (f.id) allFights.push(f.id);
    f.children?.forEach((c) => {
      if (c.id) allFights.push(c.id);
    });
  });
  return allFights.some((id) => id === input);
};
