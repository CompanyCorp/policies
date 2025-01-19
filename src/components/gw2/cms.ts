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

export enum CMFightId {
  MAMA = "MAMA",
  Siax = "Siax",
  Ensolyss = "Ensolyss",
  Skorvald = "Skorvald",
  Artsariiv = "Artsariiv",
  Arkk = "Arkk",
  ElementalAi = "ElementalAi",
  DarkAi = "DarkAi",
  Kanaxai = "Kanaxai",
}

export const powerFights: TreeViewBaseItem[] = [
  {
    id: CMId.Nightmare,
    label: ChallengeMode.Nightmare,
    children: [
      { id: CMFightId.MAMA, label: CMFight.MAMA },
      { id: CMFightId.Siax, label: CMFight.Siax },
      { id: CMFightId.Ensolyss, label: CMFight.Ensolyss },
    ],
  },
  {
    id: CMId.ShatteredObservatory,
    label: ChallengeMode.ShatteredObservatory,
    children: [
      { id: CMFightId.Skorvald, label: CMFight.Skorvald },
      { id: CMFightId.Artsariiv, label: CMFight.Artsariiv },
      { id: CMFightId.Arkk, label: CMFight.Arkk },
    ],
  },
];

export const condiFights: TreeViewBaseItem[] = [
  {
    id: CMId.SunquaPeak,
    label: ChallengeMode.SunquaPeak,
    children: [
      { id: CMFightId.ElementalAi, label: CMFight.ElementalAi },
      { id: CMFightId.DarkAi, label: CMFight.DarkAi },
    ],
  },
  {
    id: CMId.SilentSurf,
    label: ChallengeMode.SilentSurf,
    children: [{ id: CMFightId.Kanaxai, label: CMFight.Kanaxai }],
  },
];
