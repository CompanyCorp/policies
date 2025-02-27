export enum UtilitySkills {
    MRECOVERY1 = 10213,
    MRECOVERY2 = 10214,
    MCONCENTRATION1 = 10237,
    MCONCENTRATION2 = 10238,
    MDISTRACTION1 = 10204,
    MDISTRACTION2 = 10206,
    MIMIC = 29578,
    NULLFIELD = 10203,
    WACTION = 30814,
    WPRECOGNITION = 29526,
    SDOMINATION = 10232,
    SMIDNIGHT = 10234,
    SINSPIRATION = 10236,
    SHUMILITY = 29519,
    TIMEWARP = 10311,
    F1 = 56930,
    F2 = 56928,
    F3 = 56873,
    F4 = 10192,
    F5A = 29830,
    F5B = 30747,
  }
  
  export enum WeaponSkills {
    ST1 = 10273,
    ST2 = 10310,
    ST3 = 10216,
    ST4 = 10331,
    ST5 = 10169,
    R1 = 71892,
    R2 = 71897,
    R3 = 72005,
    R4 = 72007,
    R5 = 72008,
    SC1A = 10289,
    SC1B = 10290,
    SC1C = 10291,
    SC2 = 10276,
    SC3 = 10168,
    F4 = 10186,
    F5 = 10282,
  }
  
  export enum Traits {
    EGORESTORATION = 740,
    WARDENSFEEDBACK = 751,
    CHAOTICTRANSFERENCE = 668,
    CHAOTICPOTENCY = 669,
    DELAYEDREACTIONS = 1838,
    TIMECATCHESUP = 1995,
  }
  
  export const CHRONOWeaponMap = new Map(Object.entries(WeaponSkills));
  export const CHRONOUtilityMap = new Map(Object.entries(UtilitySkills));
  export const CHRONOTraitMap = new Map(Object.entries(Traits));