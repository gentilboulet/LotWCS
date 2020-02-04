import { ActionType } from "typesafe-actions";

import * as actions from "../../actions/character/skills";
import * as dataSkills from "../../../data/skills";
import {
  getSkill,
  isSpecialityPresent,
  createState,
} from "../../models/character/skills";
import { skillsReducer } from "../../reducers/character/skills";
import { zeroCost } from "../../models/character/costs";

const initialState = createState();

describe("Testing skillsReducer", () => {
  it("should receive a SKILLS_BUY action", () => {
    Object.keys(dataSkills.skills).forEach(key => {
      const skillName = key as dataSkills.TSkillName;
      expect(getSkill(initialState, skillName).value).toBe(0);
      const action = actions.skillsBuy(skillName, zeroCost);
      const skillState = skillsReducer(initialState, action);
      expect(getSkill(skillState, skillName).value).toBe(5);
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
    const skillState = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState, skillName, specialityName),
    ).toBeFalsy();
    expect(
      isSpecialityPresent(skillState, skillName, specialityName),
    ).toBeTruthy();
  });

  it("should should not receive an already bought SKILLS_SPECIALITY_BUY action", () => {
    const specialityName = "Hear";
    const skillName = "Awareness";

    const action = actions.skillSpecialityBuy(
      skillName,
      specialityName,
      zeroCost,
    );
    const skillState = skillsReducer(initialState, action);
    expect(
      isSpecialityPresent(initialState, skillName, specialityName),
    ).toBeFalsy();
    expect(
      isSpecialityPresent(skillState, skillName, specialityName),
    ).toBeTruthy();

    expect(() => {
      skillsReducer(skillState, action);
    }).toThrowError();
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      skillsReducer(initialState, junk as ActionType<typeof actions>),
    ).toMatchObject(initialState);
  });
});
