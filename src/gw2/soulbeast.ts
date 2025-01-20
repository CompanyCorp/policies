export enum UtilitySkills {
  SICEM = 12633,
  SIGNETOFTHEWILD = 12491,
  FROSTTRAP = 12492,
  STORMSPIRIT = 12493,
  VIPERSNEST = 12496,
  FLAMETRAP = 12499,
  SPIKETRAP = 12476,
  MOASTANCE = 45970,
  WORLDLYIMPACT = 40729,
  MAUL = 41406,
  BRUTALCHARGE = 46432,
  BEASTMODE = 42944,
  WEHEALASONE = 31914,
  QUICKENINGZEPHYR = 12550,
  ONEWOLFPACK = 45717,
}

export enum WeaponSkills {
  U1 = 63118,
  U2 = 63335,
  U3 = 63197,
  U4 = 63131,
  U5 = 63208,
  H3 = 63075,
  H5 = 63330,
  A1 = 12466,
  A2 = 12480,
  A3 = 12490,
  A4 = 12638,
  A5 = 12639,
  T4 = 12635,
  T5 = 12504,
  S3 = 31535,
  LB5 = 12469,
}

export enum Traits {
  TWICEASVICIOUS = 2127,
  LEADEROFTHEPACK = 2128,
  OPPRESSIVESUPERIORITY = 2143,
}

export const SLBWeaponMap = new Map(Object.entries(WeaponSkills));
export const SLBUtilityMap = new Map(Object.entries(UtilitySkills));
export const SLBTraitMap = new Map(Object.entries(Traits));
