import { ActionType } from "typesafe-actions";

import * as actions from "../actions/skills";
import { ICharacterState } from "../models/type";

import * as dataSkills from "../../../data/skills";

import { zeroCost } from "../models/costs";
import { emptyStateFactory } from "../models/initial";
import { getSkill, isSpecialityPresent } from "../models/skills";
import { skillsReducer } from "../reducers/skills";

import { setRank } from "../actions/header";
import { globalReducer } from "../reducers/global";

const initialState: ICharacterState = globalReducer(
  emptyStateFactory(),
  setRank(2),
);

describe("Testing skillsReducer", () => {
  it("should receive a SKILLS_BUY action", () => {
    Object.keys(dataSkills.skills).forEach(key => {
      const skillName = key as dataSkills.TSkillName;
      expect(getSkill(initialState, skillName).value).toBe(0);
      const action = actions.skillsBuy(skillName, zeroCost);
      const state = skillsReducer(initialState, action);
      expect(getSkill(state, skillName).value).toBe(5);
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  test.todo("should not accept an overflow on a SKILLS_BUY action");

  it("should receive a SKILLS_SPECIALITY_BUY action", () => {
    const specialityName = "Hear";
    const skillName = "Awareness";

    const action = actions.skillSpecialityBuy(
      skillName,
      specialityName,
      zeroCost,
    );
    const state = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState.skills, skillName, specialityName),
    ).toBeFalsy();
    expect(
      isSpecialityPresent(state.skills, skillName, specialityName),
    ).toBeTruthy();
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  it("should should not receive an already bought SKILLS_SPECIALITY_BUY action", () => {
    const specialityName = "Hear";
    const skillName = "Awareness";

    const action = actions.skillSpecialityBuy(
      skillName,
      specialityName,
      zeroCost,
    );
    const state = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState.skills, skillName, specialityName),
    ).toBeFalsy();
    expect(
      isSpecialityPresent(state.skills, skillName, specialityName),
    ).toBeTruthy();

    expect(() => {
      skillsReducer(state, action);
    }).toThrowError();
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      skillsReducer(initialState, junk as ActionType<typeof actions>),
    ).toMatchObject(initialState);
  });
});
