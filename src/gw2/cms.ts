import { TreeViewBaseItem } from "@mui/x-tree-view";
import { SpecType } from "./type.ts";

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

export const powerFights: TreeViewBaseItem<
  { id?: string; label: string; href?: string; specType?: SpecType }
>[] = [
  {
    id: CMId.Nightmare,
    label: ChallengeMode.Nightmare,
    children: [
      {
        id: CMFightId.MAMA,
        label: CMFight.MAMA,
        href: `/${CMId.Nightmare}#${CMFightId.MAMA}`,
      },
      {
        id: CMFightId.Siax,
        label: CMFight.Siax,
        href: `/${CMId.Nightmare}#${CMFightId.Siax}`,
      },
      {
        id: CMFightId.Ensolyss,
        label: CMFight.Ensolyss,
        href: `/${CMId.Nightmare}#${CMFightId.Ensolyss}`,
      },
    ],
    href: `/${CMId.Nightmare}`,
    specType: SpecType.POWER,
  },
  {
    id: CMId.ShatteredObservatory,
    label: ChallengeMode.ShatteredObservatory,
    children: [
      {
        id: CMFightId.Skorvald,
        label: CMFight.Skorvald,
        href: `/${CMId.ShatteredObservatory}#${CMFightId.Skorvald}`,
      },
      {
        id: CMFightId.Artsariiv,
        label: CMFight.Artsariiv,
        href: `/${CMId.ShatteredObservatory}#${CMFightId.Artsariiv}`,
      },
      {
        id: CMFightId.Arkk,
        label: CMFight.Arkk,
        href: `${CMId.ShatteredObservatory}#/${CMFightId.Arkk}`,
      },
    ],
    href: `/${CMId.ShatteredObservatory}`,
    specType: SpecType.POWER,
  },
];

export const condiFights: TreeViewBaseItem<
  { id?: string; label: string; href?: string; specType?: SpecType }
>[] = [
  {
    id: CMId.SunquaPeak,
    label: ChallengeMode.SunquaPeak,
    children: [
      {
        id: CMFightId.ElementalAi,
        label: CMFight.ElementalAi,
        href: `/${CMId.SunquaPeak}#${CMFightId.ElementalAi}`,
      },
      {
        id: CMFightId.DarkAi,
        label: CMFight.DarkAi,
        href: `/${CMId.SunquaPeak}#${CMFightId.DarkAi}`,
      },
    ],
    href: `/${CMId.SunquaPeak}`,
    specType: SpecType.POWER,
  },
  {
    id: CMId.SilentSurf,
    label: ChallengeMode.SilentSurf,
    children: [{
      id: CMFightId.Kanaxai,
      label: CMFight.Kanaxai,
      href: `/${CMId.SilentSurf}`,
    }],
    href: `/${CMId.SilentSurf}`,
    specType: SpecType.POWER,
  },
];
