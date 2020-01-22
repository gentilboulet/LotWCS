import { ICharacterState } from "./type";

import { skills as data, TSkillName } from "../../../data/skills";

import { emptyStateFactory, testingStateFactory } from "./initial";
import {
  addSpeciality,
  canBuySkill,
  canBuySpeciality,
  getSkill,
  increase,
  isSpecialityPresent,
} from "./skills";

describe("Testing skills state", () => {
  it("should do increase existing skills value", () => {
    (Object.keys(data) as TSkillName[]).forEach(key => {
      const state = emptyStateFactory();
      expect(getSkill(state, key).value).toBe(0);
      increase(state.skills, key, 5);
      expect(getSkill(state, key).value).toBe(5);
    });
  });

  it("should refuse to increase an overflowing skill value", () => {
    const initialState: ICharacterState = emptyStateFactory();
    (Object.keys(data) as TSkillName[]).forEach(key => {
      expect(getSkill(initialState, key).value).toBe(0);
      expect(() => increase(initialState.skills, key, 4)).toThrowError();
    });
  });

  it("should add a speciality to an existing skill", () => {
    const state = emptyStateFactory();
    expect(getSkill(state, "Awareness").specialities).toMatchObject([]);
    addSpeciality(state.skills, "Awareness", "Speciality");
    expect(
      isSpecialityPresent(state.skills, "Awareness", "Speciality"),
    ).toBeTruthy();
  });

  it("should not add a speciality to an unknown skill", () => {
    const state = testingStateFactory();
    expect(() =>
      addSpeciality(
        state.skills,
        "Totally not a skill" as TSkillName,
        "Speciality",
      ),
    ).toThrowError();
  });

  it("should not add a speciality twice", () => {
    const state = emptyStateFactory();
    expect(getSkill(state, "Awareness").specialities).toMatchObject([]);
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
    const skill: TSkillName = "Awareness";

    expect(state.rank).toBe(2);
    expect(getSkill(state, skill).value).toBe(0);
    expect(canBuySkill(state, skill)).toBeTruthy();

    increase(state.skills, skill, 100000);
    expect(getSkill(state, skill).value).toBe(5);
    expect(canBuySkill(state, skill)).toBeTruthy();

    increase(state.skills, skill, 100000);
    expect(getSkill(state, skill).value).toBe(10);
    expect(canBuySkill(state, skill)).toBeFalsy();

    state.rank = 2;
    expect(canBuySkill(state, skill)).toBeFalsy();

    state.rank = 3;
    expect(canBuySkill(state, skill)).toBeTruthy();
  });

  it("should check canBuySpeciality", () => {
    const state: ICharacterState = testingStateFactory();
    const skill = "Awareness";
    const speciality = "Speciality";

    expect(canBuySpeciality(state, skill, speciality)).toBeTruthy();
    addSpeciality(state.skills, skill, speciality);
    expect(canBuySpeciality(state, skill, speciality)).toBeFalsy(); // Not twice
  });
});
