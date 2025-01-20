import { TreeViewBaseItem } from "@mui/x-tree-view";

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

export enum CMFight {
  MAMA = "MAMA",
  Siax = "Siax",
  Ensolyss = "Ensolyss",
  Skorvald = "Skorvald",
  Artsariiv = "Artsariiv",
  Arkk = "Arkk",
  ElementalAi = "Elemental Ai",
  DarkAi = "Dark Ai",
  Kanaxai = "Kanaxai",
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
  ElementalAi = "Elemental Ai",
  DarkAi = "Dark Ai",
}

export enum SilentSurfFight {
  Kanaxai = "Kanaxai",
}

export type CMFightId =
  | NightmareFight
  | ShatteredObservatoryFight
  | SunquaPeakFight
  | SilentSurfFight;

export const isNightmareFight = (
  id: string,
): id is NightmareFight => {
  return new Map(Object.entries(NightmareFight)).has(id);
};

export const isShatteredObservatoryFight = (
  id: string,
): id is ShatteredObservatoryFight => {
  return new Map(Object.entries(ShatteredObservatoryFight)).has(id);
};

export const isSunquaPeakFight = (
  id: string,
): id is SunquaPeakFight => {
  return new Map(Object.entries(SunquaPeakFight)).has(id);
};

export const isSilentSurfFight = (
  id: string,
): id is SilentSurfFight => {
  return new Map(Object.entries(SilentSurfFight)).has(id);
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

export const powerFights: TreeViewBaseItem<
  { id?: string; label: string; href?: string }
>[] = [
  {
    id: CMId.Nightmare,
    label: ChallengeMode.Nightmare,
    children: [
      {
        id: NightmareFight.MAMA,
        label: CMFight.MAMA,
        href: `~/${CMId.Nightmare}/${NightmareFight.MAMA}`,
      },
      {
        id: NightmareFight.Siax,
        label: CMFight.Siax,
        href: `~/${CMId.Nightmare}/${NightmareFight.Siax}`,
      },
      {
        id: NightmareFight.Ensolyss,
        label: CMFight.Ensolyss,
        href: `~/${CMId.Nightmare}/${NightmareFight.Ensolyss}`,
      },
    ],
    href: `~/${CMId.Nightmare}`,
  },
  {
    id: CMId.ShatteredObservatory,
    label: ChallengeMode.ShatteredObservatory,
    children: [
      {
        id: ShatteredObservatoryFight.Skorvald,
        label: CMFight.Skorvald,
        href:
          `~/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Skorvald}`,
      },
      {
        id: ShatteredObservatoryFight.Artsariiv,
        label: CMFight.Artsariiv,
        href:
          `~/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Artsariiv}`,
      },
      {
        id: ShatteredObservatoryFight.Arkk,
        label: CMFight.Arkk,
        href:
          `~/${CMId.ShatteredObservatory}/${ShatteredObservatoryFight.Arkk}`,
      },
    ],
    href: `~/${CMId.ShatteredObservatory}`,
  },
];

export const isPowerFight = (input: string) => {
  const allFights: string[] = [];
  powerFights.forEach((f) => {
    if (f.id) allFights.push(f.id);
    f.children?.forEach((c) => {
      if (c.id) allFights.push(c.id);
    });
  });
  return allFights.some((id) => id === input);
};

export const condiFights: TreeViewBaseItem<
  { id?: string; label: string; href?: string }
>[] = [
  {
    id: CMId.SunquaPeak,
    label: ChallengeMode.SunquaPeak,
    children: [
      {
        id: SunquaPeakFight.ElementalAi,
        label: CMFight.ElementalAi,
        href: `~/${CMId.SunquaPeak}/${SunquaPeakFight.ElementalAi}`,
      },
      {
        id: SunquaPeakFight.DarkAi,
        label: CMFight.DarkAi,
        href: `~/${CMId.SunquaPeak}/${SunquaPeakFight.DarkAi}`,
      },
    ],
    href: `~/${CMId.SunquaPeak}`,
  },
  {
    id: CMId.SilentSurf,
    label: ChallengeMode.SilentSurf,
    children: [{
      id: SilentSurfFight.Kanaxai,
      label: CMFight.Kanaxai,
      href: `~/${CMId.SilentSurf}/${SilentSurfFight.Kanaxai}`,
    }],
    href: `~/${CMId.SilentSurf}`,
  },
];

export const isCondiFight = (input: string) => {
  const allFights: string[] = [];
  condiFights.forEach((f) => {
    if (f.id) allFights.push(f.id);
    f.children?.forEach((c) => {
      if (c.id) allFights.push(c.id);
    });
  });
  return allFights.some((id) => id === input);
};
