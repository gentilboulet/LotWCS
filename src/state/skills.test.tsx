import { IStoreState } from "./type";

import { skills as data, TSkillName } from "../data/skills";

import { emptyStateFactory, testingStateFactory } from "./initial";
import {
  addSpeciality,
  canBuySkill,
  canBuySpeciality,
  increase,
  isSpecialityPresent
} from "./skills";

describe("Testing skills state", () => {
  it("should do increase existing skills value", () => {
    (Object.keys(data) as TSkillName[]).forEach(key => {
      const state = emptyStateFactory();
      expect(state.skills[key].value).toBe(0);
      increase(state.skills, key, 5);
      expect(state.skills[key].value).toBe(5);
    });
  });

  it("should refuse to increase an overflowing skill value", () => {
    const initialState: IStoreState = emptyStateFactory();
    (Object.keys(data) as TSkillName[]).forEach(key => {
      expect(initialState.skills[key].value).toBe(0);
      expect(() => increase(initialState.skills, key, 4)).toThrowError();
    });
  });

  it("should add a speciality to an existing skill", () => {
    const state = emptyStateFactory();
    expect(state.skills.Awareness.specialities).toMatchObject([]);
    addSpeciality(state.skills, "Awareness", "Speciality");
    expect(
      isSpecialityPresent(state.skills, "Awareness", "Speciality")
    ).toBeTruthy();
  });

  it("should not add a speciality to an unknown skill", () => {
    const state = testingStateFactory();
    expect(() =>
      addSpeciality(
        state.skills,
        "Totally not a skill" as TSkillName,
        "Speciality"
      )
    ).toThrowError();
  });

  it("should not add a speciality twice", () => {
    const state = emptyStateFactory();
    expect(state.skills.Awareness.specialities).toMatchObject([]);
    addSpeciality(state.skills, "Awareness", "Speciality");
    expect(
      isSpecialityPresent(state.skills, "Awareness", "Speciality")
    ).toBeTruthy();
    expect(() =>
      addSpeciality(state.skills, "Awareness", "Speciality")
    ).toThrowError();
  });

  it("should check canBuySkill", () => {
    const state: IStoreState = testingStateFactory();
    const skill: TSkillName = "Awareness";

    expect(state.skills[skill].value).toBe(0);
    expect(canBuySkill(state, skill)).toBeTruthy();
    // increase(state.skills, skill, 100000);
    // expect(state.rank).toMatchObject({ name: "4th_rank", value: 2 });
    // expect(canBuySkill(state, skill)).toBeFalsy();
    // (state.rank as { name: string; value: number }).value = 1;
    // expect(canBuySkill(state, skill)).toBeFalsy();
    // (state.rank as { name: string; value: number }).value = 2;
    // expect(canBuySkill(state, skill)).toBeTruthy();
  });

  it("should check canBuySpeciality", () => {
    const state: IStoreState = testingStateFactory();
    const skill = "Awareness";
    const speciality = "Speciality";

    expect(canBuySpeciality(state, skill, speciality)).toBeTruthy();
    // addSpeciality(state.skills, skill, speciality);
    // expect(canBuySpeciality(state, skill, speciality)).toBeFalsy(); // Not twice
  });
});
