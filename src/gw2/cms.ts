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
export const shatteredObservatoryMap = new Map(
  Object.entries(ShatteredObservatoryFight),
);
export const sunquaPeakMap = new Map(Object.entries(SunquaPeakFight));
export const silentSurfMap = new Map(Object.entries(SilentSurfFight));
