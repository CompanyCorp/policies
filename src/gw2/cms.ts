// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { SpecContext } from "../data/spec.context.tsx";

export enum ChallengeMode {
  Nightmare = "Nightmare",
  ShatteredObservatory = "Shattered Observatory",
  SunquaPeak = "Sunqua Peak",
  SilentSurf = "Silent Surf",
}

export enum CMId {
  Nightmare = "Nightmare",
  ShatteredObservatory = "ShatteredObservatory",
  SunquaPeak = "SunquaPeak",
  SilentSurf = "SilentSurf",
}

export enum CMType {
  Power = "Power",
  Condi = "Condi",
}

export enum NightmareFight {
  MAMA = "MAMA",
  Siax = "Siax",
  Ensolyss = "Ensolyss",
}

export enum ShatteredObservatoryFight {
  Skorvald = "Skorvald",
  Artsariiv = "Artsariiv",
  Arkk = "Arkk",
}

export enum SunquaPeakFight {
  ElementalAi = "ElementalAi",
  DarkAi = "DarkAi",
}

export enum SilentSurfFight {
  Kanaxai = "Kanaxai",
}

export type CMFightId =
  | NightmareFight
  | ShatteredObservatoryFight
  | SunquaPeakFight
  | SilentSurfFight;

export const nightmareMap = new Map(Object.entries(NightmareFight));
export const isNightmareFight = (
  id: string,
): id is NightmareFight => {
  return nightmareMap.has(id);
};

export const shatteredObservatoryMap = new Map(
  Object.entries(ShatteredObservatoryFight),
);
export const isShatteredObservatoryFight = (
  id: string,
): id is ShatteredObservatoryFight => {
  return shatteredObservatoryMap.has(id);
};

export const sunquaPeakMap = new Map(Object.entries(SunquaPeakFight));
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

export const silentSurfMap = new Map(Object.entries(SilentSurfFight));
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
  const { activeSpec } = useContext(SpecContext);
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
          href:
            `/policies/${CMId.Nightmare}/${NightmareFight.MAMA}?spec=${activeSpec}`,
        },
        {
          id: NightmareFight.Siax,
          label: NightmareFight.Siax,
          href:
            `/policies/${CMId.Nightmare}/${NightmareFight.Siax}?spec=${activeSpec}`,
        },
        {
          id: NightmareFight.Ensolyss,
          label: NightmareFight.Ensolyss,
          href:
            `/policies/${CMId.Nightmare}/${NightmareFight.Ensolyss}?spec=${activeSpec}`,
        },
      ],
      href: `/policies/${CMId.Nightmare}?spec=${activeSpec}`,
    },
    {
      id: CMId.ShatteredObservatory,
      label: ChallengeMode.ShatteredObservatory,
      children: [
        {
          id: ShatteredObservatoryFight.Skorvald,
          label: ShatteredObservatoryFight.Skorvald,
          href:
            `/policies/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Skorvald}?spec=${activeSpec}`,
        },
        {
          id: ShatteredObservatoryFight.Artsariiv,
          label: ShatteredObservatoryFight.Artsariiv,
          href:
            `/policies/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Artsariiv}?spec=${activeSpec}`,
        },
        {
          id: ShatteredObservatoryFight.Arkk,
          label: ShatteredObservatoryFight.Arkk,
          href:
            `/policies/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Arkk}?spec=${activeSpec}`,
        },
      ],
      href: `/policies/${CMId.ShatteredObservatory}?spec=${activeSpec}`,
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
  const { activeSpec } = useContext(SpecContext);
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
          href:
            `/policies/${CMId.SunquaPeak}/${SunquaPeakFight.ElementalAi}?spec=${activeSpec}`,
        },
        {
          id: SunquaPeakFight.DarkAi,
          label: "Dark Ai",
          href:
            `/policies/${CMId.SunquaPeak}/${SunquaPeakFight.DarkAi}?spec=${activeSpec}`,
        },
      ],
      href: `/policies/${CMId.SunquaPeak}?spec=${activeSpec}`,
    },
    {
      id: CMId.SilentSurf,
      label: ChallengeMode.SilentSurf,
      children: [{
        id: SilentSurfFight.Kanaxai,
        label: SilentSurfFight.Kanaxai,
        href:
          `/policies/${CMId.SilentSurf}/${SilentSurfFight.Kanaxai}?spec=${activeSpec}`,
      }],
      href: `/policies/${CMId.SilentSurf}?spec=${activeSpec}`,
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
