import { zeroCost } from "../models/costs";
import * as actions from "./skills";
describe("Testing for skill action creators", () => {
  it("should create a buy skill action", () => {
    const skill = "Awareness";
    const a = actions.skillsBuy(skill, zeroCost);
    expect(a.payload.name).toBe(skill);
  });

  it("should create a buy speciality action", () => {
    const skill = "Awareness";
    const speciality = "Hear";
    const a = actions.skillSpecialityBuy(skill, speciality, zeroCost);
    expect(a.payload.skill).toBe(skill);
    expect(a.payload.speciality).toBe(speciality);
    expect(a).toMatchSnapshot();
  });

  it("should not create a buy speciality action on an invalid speciality", () => {
    const skill = "Awareness";
    const speciality = "";
    expect(() =>
      actions.skillSpecialityBuy(skill, speciality, zeroCost)
    ).toThrow();
  });
});
