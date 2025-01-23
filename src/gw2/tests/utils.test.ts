import { assertEquals, assertThrows } from "jsr:@std/assert";
import { convertToIds, getGw2Ids } from "../utils.ts";
import { Relics, Sigils, Specs, Symbols } from "../type.ts";
import { UtilitySkills, WeaponSkills } from "../specializations/soulbeast.ts";
import { NotFoundError } from "../errors.ts";
import { getRotation } from "../../data/utils.ts";

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
  convertToIds([Symbols.WEAPON], ["H1", "U2", "H3", "H4", "H5"], Specs.SLB);
});

Deno.test("Test rotation conversion", () => {
  const rotation = [
    {
      phaseName: "Opener / Phase 1",
      skills: [
        ["sicem", "U4"],
        "U2",
      ],
    },
    {
      phaseName: "Phase 2",
      skills: [
        "A4",
        "A2",
        "A3",
        "maul",
      ],
      lastPhase: true,
    },
  ];

  const result = getRotation(Specs.SLB, rotation);

  assertEquals(result, [
    {
      skills: [
        { main: WeaponSkills.U4, top: UtilitySkills.SICEM },
        { main: WeaponSkills.U2 },
      ],
      phaseName: "Opener / Phase 1",
      lastPhase: false,
    },
    {
      skills: [
        { main: WeaponSkills.A4 },
        { main: WeaponSkills.A2 },
        { main: WeaponSkills.A3 },
        { main: UtilitySkills.MAUL },
      ],
      phaseName: "Phase 2",
      lastPhase: true,
    },
  ]);
});
