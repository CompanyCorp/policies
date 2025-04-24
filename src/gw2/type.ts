export enum Symbols {
  SPEC = "SPEC",
  RELIC = "RELIC",
  SIGIL = "SIGIL",
  CONSUMABLE = "CONSUMABLE",
  WEAPON = "WEAPON",
  SKILL = "SKILL",
  TRAIT = "TRAIT",
  FIGHT = "FIGHT",
  NOVELTY = "NOVELTY",
  MISC = "MISC",
}

export enum Specs {
  SLB = "Soulbeast",
  REN = "Renegade",
  HARB = "Harbinger",
  CHRONO = "Chronomancer",
}

export enum SpecType {
  POWER = "POWER",
  CONDI = "CONDI",
  BOTH = "BOTH",
}

export const SpecTypeMap = {
  [Specs.SLB]: SpecType.POWER,
  [Specs.REN]: SpecType.BOTH,
  [Specs.HARB]: SpecType.CONDI,
  [Specs.CHRONO]: SpecType.BOTH,
};

export enum Relics {
  DRAGONHUNTER = 100090,
  FIREWORKS = 100947,
  FRACTAL = 100153,
  VASS = 100775,
  BALRIOR = 103872,
  CERUS = 100074,
  CLAW = 103574,
  BRAWLER = 100527,
  THIEF = 100916,
}

export enum Sigils {
  FORCE = 24615,
  IMPACT = 24868,
  SEVERANCE = 84505,
  SERPENT = 24658,
  NIGHT = 36053,
  FRENZY = 82876,
}

export enum Consumables {
  STEAK = 91805,
  SHARPENING = 43451,
  DBB = 43360,
  SCARLET = 50082,
  SKEWER = 95942,
  TOXIC = 48917,
  CUREDFLATBREAD = 91878,
  EQUIPTEMPLATE = 92203,
}

export enum Novelties {
  BELL = 88385,
  EXEAXE = 49940,
  PINATA = 85244,
  CHEST = 91377,
}

export enum Misc {
  WEAPONSWAP = 0,
  MISTLOCK = 1,
}

export enum PrecastOptions {
  BELLOWP = "BELLOWP",
  BRAWLER = "BRAWLER",
  EXEAXE = "EXEAXE",
  CLAW = "CLAW",
  PRETRAP = "PRETRAP",
  EXEAXEFAILED = "EXEAXE_FAILED",
}

export const SpecMap = new Map(
  Object.entries(Specs),
);
export const RelicMap = new Map(
  Object.entries(Relics),
);
export const SigilMap = new Map(
  Object.entries(Sigils),
);
export const ConsumableMap = new Map(
  Object.entries(Consumables),
);
export const NoveltyMap = new Map(
  Object.entries(Novelties),
);
export const MiscMap = new Map(
  Object.entries(Misc),
);
