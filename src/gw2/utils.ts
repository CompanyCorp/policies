import { InvalidInputError, NotFoundError } from "./errors.ts";
import {
  CHRONOTraitMap,
  CHRONOUtilityMap,
  CHRONOWeaponMap,
} from "./specializations/chronomancer.ts";
import {
  HARBTraitMap,
  HARBUtilityMap,
  HARBWeaponMap,
} from "./specializations/harbinger.ts";
import {
  SLBTraitMap,
  SLBUtilityMap,
  SLBWeaponMap,
} from "./specializations/soulbeast.ts";
import { MiscMap } from "./type.ts";
import {
  ConsumableMap,
  NoveltyMap,
  RelicMap,
  SigilMap,
  SpecMap,
  Specs,
  Symbols,
} from "./type.ts";

export const getMap = (type: Symbols, spec?: Specs) => {
  if (spec) {
    switch (type) {
      case Symbols.SKILL:
        switch (spec) {
          case Specs.SLB:
            return SLBUtilityMap;
          case Specs.REN:
            break;
          case Specs.HARB:
            return HARBUtilityMap;
          case Specs.CHRONO:
            return CHRONOUtilityMap;
          default:
            throw new NotFoundError([type, spec], [
              Symbols.SKILL,
              Symbols.SPEC,
            ]);
        }
        break;
      case Symbols.WEAPON:
        switch (spec) {
          case Specs.SLB:
            return SLBWeaponMap;
          case Specs.REN:
            break;
          case Specs.HARB:
            return HARBWeaponMap;
          case Specs.CHRONO:
            return CHRONOWeaponMap;
          default:
            break;
        }
        break;
      case Symbols.TRAIT:
        switch (spec) {
          case Specs.SLB:
            return SLBTraitMap;
          case Specs.REN:
            break;
          case Specs.HARB:
            return HARBTraitMap;
          case Specs.CHRONO:
            return CHRONOTraitMap;
          default:
            break;
        }
        break;
      default:
        throw new NotFoundError([spec, type], [Symbols.SPEC]);
    }
  }
  switch (type) {
    case Symbols.RELIC:
      return RelicMap;
    case Symbols.SIGIL:
      return SigilMap;
    case Symbols.CONSUMABLE:
      return ConsumableMap;
    case Symbols.NOVELTY:
      return NoveltyMap;
    case Symbols.MISC:
      return MiscMap;
    default:
      throw new NotFoundError([type], [
        Symbols.RELIC,
        Symbols.SIGIL,
        Symbols.CONSUMABLE,
      ]);
  }
};

export const convertToIds = (
  type: Symbols,
  input: string[],
  spec?: Specs,
) => {
  const results: number[] = [];
  const map = getMap(type, spec);
  input.forEach((item) => {
    const upperCaseInput = item.toUpperCase();
    if (upperCaseInput === "SWAP") {
      results.push(0);
    } else {
      const result = map.get(upperCaseInput);
      if (typeof result !== "number") {
        throw new NotFoundError(
          spec ? [upperCaseInput, spec] : [upperCaseInput],
          spec ? [type, Symbols.SPEC] : [type],
        );
      }
      results.push(result);
    }
  });
  return results;
};

type ParsedInput = { type: Symbols; spec?: string; output: string[] };

const parseInput = (
  input: string,
): ParsedInput => {
  if (input.length === 0) {
    throw new InvalidInputError("length", input, 1);
  }
  const upperCaseInput = input.toUpperCase();
  const [type, ...rest] = upperCaseInput.split(".");
  const specBasedTypes: string[] = [
    Symbols.WEAPON,
    Symbols.SKILL,
    Symbols.TRAIT,
  ];
  const equipBasedTypes: string[] = [
    Symbols.RELIC,
    Symbols.SIGIL,
    Symbols.CONSUMABLE,
    Symbols.NOVELTY,
    Symbols.MISC,
  ];
  if (specBasedTypes.includes(type)) {
    // weapon input needs both type (weapon), spec, and the weapon skills themselves
    if (rest.length !== 2) {
      return {
        type: type as Symbols,
        output: [],
      };
    }
    const [spec, skillsCombined] = rest;
    const result = skillsCombined.split(",");
    return {
      type: type as Symbols,
      spec,
      output: result,
    };
  }
  if (equipBasedTypes.includes(type)) {
    if (rest.length > 1) {
      throw new InvalidInputError("length", input, 1);
    }
    const result = rest[0].split(",");
    return {
      type: type as Symbols,
      output: result,
    };
  }
  throw new InvalidInputError(
    "match",
    input,
    [...specBasedTypes, ...equipBasedTypes].toString(),
  );
};

type DecodedSymbol = {
  type: Symbols;
  spec?: Specs;
  ids: number[];
};

export const getGw2Ids = (input: string): DecodedSymbol => {
  const { type, spec, output } = parseInput(input);

  if (spec) {
    const specRes = SpecMap.get(spec);
    if (!specRes) {
      throw new NotFoundError([spec], [Symbols.SPEC]);
    }
    return {
      type,
      spec: specRes,
      ids: convertToIds(type, output, specRes),
    };
  }
  return {
    type,
    ids: convertToIds(type, output),
  };
};
