import * as bonuses from "./bonuses";

describe("Testing bonus creators", () => {
  test("should create a destiny bonus", () => {
    const b = bonuses.bonusDestiny(10);
    expect(b.value).toBe(10);
    expect(b).toMatchSnapshot();
  });

  test("should create an entanglement bonus", () => {
    const b = bonuses.bonusEntanglement(10);
    expect(b.value).toBe(10);
    expect(b).toMatchSnapshot();
  });

  test("should create an chi bonus", () => {
    const chiName = "fire";
    const b = bonuses.bonusChi(10, chiName);
    expect(b.value).toBe(10);
    expect(b.chi).toBe(chiName);
    expect(b).toMatchSnapshot();
  });

  test("should create an cultivation bonus", () => {
    const chiName = "fire";
    const b = bonuses.bonusCultivation(chiName, 10);
    expect(b.value).toBe(10);
    expect(b.chi).toBe(chiName);
    expect(b).toMatchSnapshot();
  });

  test("should create an oneAmongN bonus", () => {
    const bonusesList = {
      destiny: bonuses.bonusDestiny(10),
      entanglement: bonuses.bonusEntanglement(10),
    };

    const b = bonuses.bonusOneAmongN(bonusesList);
    expect(b).toMatchSnapshot();
  });

  test("should not create an oneAmongN bonus with only one bonus but give the bonus back", () => {
    const bonusesList = {
      destiny: bonuses.bonusDestiny(10),
    };

    const b = bonuses.bonusOneAmongN(bonusesList);
    expect(b).toMatchObject(bonusesList.destiny);
    expect(b).toMatchSnapshot();
  });

  test("should not create an oneAmongN bonus with an empty set of bonuses", () => {
    expect(() => bonuses.bonusOneAmongN({})).toThrow();
  });

  test("should create an skill rank bonus", () => {
    const skillName = "Awareness";
    const b = bonuses.bonusSkillRank(skillName);
    expect(b.skill).toBe(skillName);
    expect(b).toMatchSnapshot();
  });

  test("should create a skill speciality bonus", () => {
    const skillName = "Awareness";
    const specialityName = "Hear";
    const b = bonuses.bonusSpeciality(skillName, specialityName);
    expect(b.skill).toBe(skillName);
    expect(b.speciality).toBe(specialityName);
    expect(b).toMatchSnapshot();
  });

  test("should create a skill with a not in data speciality bonus", () => {
    const skillName = "Awareness";
    const specialityName = "Totally not in data speciality";
    const b = bonuses.bonusSpeciality(skillName, specialityName);
    expect(b.skill).toBe(skillName);
    expect(b.speciality).toBe(specialityName);
    expect(b).toMatchSnapshot();
  });
});
