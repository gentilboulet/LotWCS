import { ISkillAction, skillsBuy, skillSpecialityBuy } from "../actions/skills";
import { IStoreState } from "../type";

import * as dataSkills from "../../data/skills";

import { zeroCost } from "../costs";
import { initialStateFactory } from "../initial";
import { skillsReducer } from "../reducers/skills";
import { isSpecialityPresent } from "../skills";

import { setRank } from "../actions/header";
import { globalReducer } from "../reducers/global";

const initialState: IStoreState = globalReducer(
  initialStateFactory(),
  setRank("4th_rank")
);

describe("Testing skillsReducer", () => {
  it("should receive a SKILLS_BUY action", () => {
    Object.keys(dataSkills.skills).forEach(key => {
      const skillName = key as dataSkills.TSkillName;
      const skillInData = dataSkills.skills[skillName];
      expect(initialState.skills[skillName].value).toBe(0);
      const action = skillsBuy(skillInData.name, zeroCost);
      const state = skillsReducer(initialState, action);
      expect(state.skills[skillName].value).toBe(5);
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  it("should not accept an overflow on a SKILLS_BUY action", () => {
    expect("placeholder").toBe("placeholder");
  });

  it("should receive a SKILLS_SPECIALITY_BUY action", () => {
    const specialityName = "Hear";
    const skillName = "Awareness";

    const action = skillSpecialityBuy(skillName, specialityName, zeroCost);
    const state = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState.skills, skillName, specialityName)
    ).toBeFalsy();
    expect(
      isSpecialityPresent(state.skills, skillName, specialityName)
    ).toBeTruthy();
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  it("should should not receive an already bought SKILLS_SPECIALITY_BUY action", () => {
    const specialityName = "Hear";
    const skillName = "Awareness";

    const action = skillSpecialityBuy(skillName, specialityName, zeroCost);
    const state = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState.skills, skillName, specialityName)
    ).toBeFalsy();
    expect(
      isSpecialityPresent(state.skills, skillName, specialityName)
    ).toBeTruthy();

    expect(() => {
      skillsReducer(state, action);
    }).toThrowError();
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(skillsReducer(initialState, junk as ISkillAction)).toMatchObject(
      initialState
    );
  });
});
