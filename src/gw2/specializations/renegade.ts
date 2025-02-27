export enum UtilitySkills {
    SHIRO = 27659,
    ENCHANTEDDAGGER = 26937,
    IMPOSSIBLEODDS1 = 27107,
    IMPOSSIBLEODDS0 = 28382,
    JADEWINDS = 28406,
    JALLIS = 26650,
    VENGEFULHAMMERS1 = 26557,
    VENGEFULHAMMERS0 = 26956,
    INSPIRINGREINFORCEMENTS = 28516,
    KALLA = 41858,
    BREAKRAZOR = 45686,
    RAZORCLAW = 42949,
    DARKRAZOR = 41220,
    ICERAZOR = 40485,
    F2 = 44076,
    F3 = 42836,
    F4 = 45537,
  }
  
  export enum WeaponSkills {
    ST2 = 29145,
    ST5 = 28978,
    GS2 = 62692,
    GS3 = 62895,
    GS4 = 62921,
    GS5 = 62929,
    SW2 = 29233,
    SW3 = 26699,
    SW4 = 28472,
    SW5 = 28472,
  }
  
  export enum Traits {
    VINDICATION = 2094,
    RR = 2182,
  }
  
  export const RENEWeaponMap = new Map(Object.entries(WeaponSkills));
  export const RENEUtilityMap = new Map(Object.entries(UtilitySkills));
  export const RENETraitMap = new Map(Object.entries(Traits));