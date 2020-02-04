import { ICharacterState } from "./index";

import { skills as data, TSkillName } from "../../../data/skills";

import { initialStateFactory } from "./index";
import {
  addSpeciality,
  canBuySkill,
  canBuySpeciality,
  getSkill,
  increase,
  isSpecialityPresent,
} from "./skills";
import { testingStateFactory } from "./testing";

describe("Testing skills state", () => {
  it("should do increase existing skills value", () => {
    (Object.keys(data) as TSkillName[]).forEach(key => {
      const state = initialStateFactory();
      expect(getSkill(state.skills, key).value).toBe(0);
      increase(state.skills, key);
      expect(getSkill(state.skills, key).value).toBe(5);
    });
  });

  it("should add a speciality to an existing skill", () => {
    const state = initialStateFactory();
    expect(getSkill(state.skills, "Awareness").specialities).toMatchObject([]);
    addSpeciality(state.skills, "Awareness", "Speciality");
    expect(
      isSpecialityPresent(state.skills, "Awareness", "Speciality"),
    ).toBeTruthy();
  });

  it("should not add a speciality to an unknown skill", () => {
    const state = initialStateFactory();
    expect(() =>
      addSpeciality(
        state.skills,
        "Totally not a skill" as TSkillName,
        "Speciality",
      ),
    ).toThrowError();
  });

  it("should not add a speciality twice", () => {
    const state = initialStateFactory();
    expect(getSkill(state.skills, "Awareness").specialities).toMatchObject([]);
    addSpeciality(state.skills, "Awareness", "Speciality");
    expect(
      isSpecialityPresent(state.skills, "Awareness", "Speciality"),
    ).toBeTruthy();
    expect(() =>
      addSpeciality(state.skills, "Awareness", "Speciality"),
    ).toThrowError();
  });

  it("should check canBuySkill", () => {
    const state: ICharacterState = testingStateFactory();
    const skill: TSkillName = "Politics";

    expect(state.rank).toBe(2);
    expect(getSkill(state.skills, skill).value).toBe(0);
    expect(canBuySkill(state, skill)).toBeTruthy();

    increase(state.skills, skill);
    expect(getSkill(state.skills, skill).value).toBe(5);
    expect(canBuySkill(state, skill)).toBeTruthy();

    increase(state.skills, skill);
    expect(getSkill(state.skills, skill).value).toBe(10);
    expect(canBuySkill(state, skill)).toBeFalsy();
  });
  it.todo("should check canBuySkill with other rank");
  // state.rank = 2;
  // expect(canBuySkill(state, skill)).toBeFalsy();
  //
  // state.rank = 3;
  // expect(canBuySkill(state, skill)).toBeTruthy();

  it("should check canBuySpeciality", () => {
    const state: ICharacterState = testingStateFactory();
    const skill = "Awareness";
    const speciality = "Speciality";

    expect(canBuySpeciality(state, skill, speciality)).toBeTruthy();
    addSpeciality(state.skills, skill, speciality);
    expect(canBuySpeciality(state, skill, speciality)).toBeFalsy(); // Not twice
  });
});
