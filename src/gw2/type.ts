import { NotFoundError } from "./errors.ts";
import { SLBTraitMap, SLBUtilityMap, SLBWeaponMap } from "./soulbeast.ts";

export enum Symbols {
  SPEC = "SPEC",
  RELIC = "RELIC",
  SIGIL = "SIGIL",
  CONSUMABLE = "CONSUMABLE",
  WEAPON = "WEAPON",
  SKILL = "SKILL",
  TRAIT = "TRAIT",
  FIGHT = "FIGHT",
}

export enum Specs {
  SLB = "Soulbeast",
  REN = "Renegade",
  HARB = "Harbinger",
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
};

export enum Relics {
  DRAGONHUNTER = 100090,
  FIREWORKS = 100947,
}

export enum Sigils {
  FORCE = 24615,
  IMPACT = 24868,
  SEVERANCE = 84505,
  SERPENT = 0,
}

export enum Consumables {
  CILANTROSTEAK = 91805,
  SHARPENING = 43451,
  DBB = 43360,
  SCARLET = 0,
}

export const SpecMap = new Map(Object.entries(Specs));
export const RelicMap = new Map(Object.entries(Relics));
export const SigilMap = new Map(Object.entries(Sigils));
export const ConsumableMap = new Map(Object.entries(Consumables));

export const getMap = (type: Symbols, spec?: Specs) => {
  if (spec) {
    let result;
    if (type === Symbols.SKILL) {
      switch (spec) {
        case Specs.SLB:
          result = SLBUtilityMap;
          break;
        case Specs.REN:
          break;
        case Specs.HARB:
          break;
        default:
          break;
      }
      if (!result) {
        throw new NotFoundError([type, spec], [Symbols.SKILL, Symbols.SPEC]);
      }
    } else if (type === Symbols.WEAPON) {
      switch (spec) {
        case Specs.SLB:
          result = SLBWeaponMap;
          break;
        case Specs.REN:
          break;
        case Specs.HARB:
          break;
        default:
          break;
      }
      if (!result) {
        throw new NotFoundError([type, spec], [Symbols.WEAPON, Symbols.SPEC]);
      }
    } else if (type === Symbols.TRAIT) {
      switch (spec) {
        case Specs.SLB:
          result = SLBTraitMap;
          break;
        case Specs.REN:
          break;
        case Specs.HARB:
          break;
        default:
          break;
      }
      if (!result) {
        throw new NotFoundError([type, spec], [Symbols.TRAIT, Symbols.SPEC]);
      }
    } else {
      throw new NotFoundError([spec, type], [Symbols.SPEC]);
    }
    return result;
  }
  switch (type) {
    case Symbols.RELIC:
      return RelicMap;
    case Symbols.SIGIL:
      return SigilMap;
    case Symbols.CONSUMABLE:
      return ConsumableMap;
    default:
      throw new NotFoundError([type], [Symbols.SPEC]);
  }
};
