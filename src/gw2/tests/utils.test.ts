import { assertEquals, assertThrows } from "jsr:@std/assert";
import { convertToIds, getGw2Ids } from "../utils.ts";
import { Relics, Sigils, Specs, Symbols } from "../type.ts";
import { UtilitySkills, WeaponSkills } from "../specializations/soulbeast.ts";
import { NotFoundError } from "../errors.ts";
import { getRotation } from "../../data/utils.ts";
import { parseNotes } from "../../components/gw2/Notes.component.tsx";

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

Deno.test("Test rotation conversion", () => {
  const rotation = [
    {
      phaseName: "Opener / Phase 1",
      bossPhase: true,
      skills: [
        { "top": ["skill.slb.sicem"], "main": ["weapon.slb.U4"] },
        "weapon.slb.U2",
      ],
    },
    {
      phaseName: "Phase 2",
      bossPhase: true,
      skills: [
        "weapon.slb.A4",
        "weapon.slb.A2",
        "weapon.slb.A3",
        "skill.slb.maul",
      ],
      lastPhase: true,
    },
  ];

  const result = getRotation(rotation);

  assertEquals(result, [
    {
      skills: [
        {
          main: [{
            id: WeaponSkills.U4,
            type: Symbols.WEAPON,
          }],
          top: [{
            id: UtilitySkills.SICEM,
            type: Symbols.SKILL,
          }],
        },
        {
          main: [{
            id: WeaponSkills.U2,
            type: Symbols.WEAPON,
          }],
        },
      ],
      bossPhase: true,
      notes: [],
      phaseName: "Opener / Phase 1",
      lastPhase: false,
    },
    {
      skills: [
        { main: [{ id: WeaponSkills.A4, type: Symbols.WEAPON }] },
        { main: [{ id: WeaponSkills.A2, type: Symbols.WEAPON }] },
        { main: [{ id: WeaponSkills.A3, type: Symbols.WEAPON }] },
        { main: [{ id: UtilitySkills.MAUL, type: Symbols.SKILL }] },
      ],
      phaseName: "Phase 2",
      lastPhase: true,
      bossPhase: true,
      notes: [],
    },
  ]);
});

Deno.test("Test note conversion", () => {
  const notes =
    ":skill.slb.QUICKENINGZEPHYR: use at the mistlock to give yourself: enough superspeed :skill.slb.QUICKENINGZEPHYR: before entering the fight.";

  const expectedResult = [
    {
      note: "skill.slb.QUICKENINGZEPHYR",
      isEmbed: true,
    },
    {
      note: "use at the mistlock to give yourself: enough superspeed ",
      isEmbed: false,
    },
    {
      note: "skill.slb.QUICKENINGZEPHYR",
      isEmbed: true,
    },
    {
      note: " before entering the fight.",
      isEmbed: false,
    },
  ];

  const result = parseNotes(notes);

  assertEquals(result, expectedResult);
});

Deno.test("Test embed detection", () => {
  const isEmbed = (note: string): boolean => {
    return /:[\w\.]+:/.test(note);
  };

  const note = [
    ":skill.slb.QUICKENINGZEPHYR:",
    " use at the mistlock to give yourself: enough superspeed ",
    ":skill.slb.QUICKENINGZEPHYR:",
    " before entering the fight.",
  ];
  const result = note.map(isEmbed);
  assertEquals(result, [true, false, true, false]);
});
