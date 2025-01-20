export enum UtilitySkills {
  SHROUD = 62567,
  PROMISE = 62667,
  RISK = 62530,
  ANGUISH = 62662,
  BLISS = 62514,
  IGNORANCE = 62646,
  AMBITION = 62655,
  PLAGUESIGNET = 10562,
  SIGNETOFSPITE = 10622,
  BIP = 10544,
}

export enum WeaponSkills {
  SH1 = 62611,
  SH2 = 62621,
  SH3 = 62672,
  SH4 = 62539,
  SH5 = 62563,
  D4 = 10705,
  D5 = 10706,
  T4 = 45846,
  T5 = 44296,
  SC1 = 10698,
  SC2 = 10532,
  SC3 = 10709,
  P1 = 62517,
  P2 = 62513,
  P3 = 62511,
}

export enum Traits {
  SEPTICCORRUPTION = 2185,
  ALCHEMICRIGOR = 2186,
  DARKGUNSLINGER = 2209,
  CORRUPTEDTALENT = 2217,
  DOOMAPPROACHES = 2203,
  DEATHLYHASTE = 2194,
}

export const HARBWeaponMap = new Map(Object.entries(WeaponSkills));
export const HARBUtilityMap = new Map(Object.entries(UtilitySkills));
export const HARBTraitMap = new Map(Object.entries(Traits));
