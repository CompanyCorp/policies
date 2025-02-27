export enum UtilitySkills {
    SKELK = 21778,
    GLOOM = 63292,
    SORROW = 63276,
    ONEKN = 13026,
    SKALE = 13055,
    DEVOURER = 13093,
    SPIDER = 13037,
    BASILISK = 13132,
    THIEVES = 13082,
    SIPHON = 63067,
    SHROUD1 = 63155,
    SHROUD0 = 63251,
  }
  
  export enum WeaponSkills {
    SH1 = 63362,
    SH2 = 63167,
    SH3 = 63220,
    SH4 = 63160,
    SH5 = 63249,
    SCD3 = 63254,
  }
  
  export enum Traits {
    BOUNTIFULTHEFT = 1277,
    PRESSURESTRIKING = 1190,
  }
  
  export const SPECWeaponMap = new Map(Object.entries(WeaponSkills));
  export const SPECUtilityMap = new Map(Object.entries(UtilitySkills));
  export const SPECTraitMap = new Map(Object.entries(Traits));  