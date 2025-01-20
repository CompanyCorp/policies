import { InvalidInputError, NotFoundError } from "./errors.ts";
import { getMap, SpecMap, Specs, Symbols } from "./type.ts";

export const convertToIds = (
  type: Symbols,
  input: string[],
  spec?: Specs,
) => {
  const results: number[] = [];
  const map = getMap(type, spec);
  input.forEach((item) => {
    const result = map.get(item);
    if (typeof result !== "number") {
      throw new NotFoundError(
        spec ? [item, spec] : [item],
        spec ? [type, Symbols.SPEC] : [type],
      );
    }
    results.push(result);
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
