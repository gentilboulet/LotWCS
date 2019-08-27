import { zeroCost } from "../costs";
import * as actions from "./skills";
describe("Testing for skill action creators", () => {
  test("should create a buy skill action", () => {
    const skill = "Awareness";
    const a = actions.skillsBuy(skill, zeroCost);
    expect(a.name).toBe(skill);
  });

  test("should create a buy speciality action", () => {
    const skill = "Awareness";
    const speciality = "Hear";
    const a = actions.skillSpecialityBuy(skill, speciality, zeroCost);
    expect(a.skill).toBe(skill);
    expect(a.speciality).toBe(speciality);
    expect(a).toMatchSnapshot();
  });

  test("should not create a buy speciality action on an invalid speciality", () => {
    const skill = "Awareness";
    const speciality = "";
    expect(() =>
      actions.skillSpecialityBuy(skill, speciality, zeroCost)
    ).toThrow();
  });
});
