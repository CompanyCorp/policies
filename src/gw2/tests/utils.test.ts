import { assertEquals, assertThrows } from "jsr:@std/assert";
import { convertToIds, getGw2Ids } from "../utils.ts";
import { Relics, Sigils, Specs, Symbols } from "../type.ts";
import { WeaponSkills } from "../soulbeast.ts";
import { NotFoundError } from "../errors.ts";

Deno.test("Test weapon skill conversion", () => {
  const example = "weapon.SLB.U1,U2,H3,U3,H5";
  const expectedResult = {
    type: Symbols.WEAPON,
    spec: Specs.SLB,
    ids: [
      WeaponSkills.U1,
      WeaponSkills.U2,
      WeaponSkills.H3,
      WeaponSkills.U3,
      WeaponSkills.H5,
    ],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test weapon skill conversion with lowercase", () => {
  const example = "weapon.slb.u1,u2,h3,u3,h5";
  const expectedResult = {
    type: Symbols.WEAPON,
    spec: Specs.SLB,
    ids: [
      WeaponSkills.U1,
      WeaponSkills.U2,
      WeaponSkills.H3,
      WeaponSkills.U3,
      WeaponSkills.H5,
    ],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test relic conversion", () => {
  const example = "relic.dragonhunter";

  const expectedResult = {
    type: Symbols.RELIC,
    ids: [Relics.DRAGONHUNTER],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test sigil conversion", () => {
  const example = "sigil.impact,force";

  const expectedResult = {
    type: Symbols.SIGIL,
    ids: [Sigils.IMPACT, Sigils.FORCE],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test empty weapon skill conversion", () => {
  const example = "weapon.slb";
  const expectedResult = {
    type: Symbols.WEAPON,
    ids: [],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test invalid spec", () => {
  const example = "weapon.scp.h1";
  assertThrows(
    () => getGw2Ids(example),
    NotFoundError,
  );
});

Deno.test("Test utility and spec skills", () => {
  const example = "skill.slb.sicem,signetofthewild,maul,brutalcharge";
  const expectedResult = {
    type: Symbols.SKILL,
    spec: Specs.SLB,
    ids: [12633, 12491, 41406, 46432],
  };
  const result = getGw2Ids(example);
  assertEquals(result, expectedResult);
});

Deno.test("Test convertIds", () => {
  convertToIds(Symbols.WEAPON, ["H1", "U2", "H3", "H4", "H5"], Specs.SLB);
});
