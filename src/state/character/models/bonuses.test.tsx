import { emptyStateFactory } from "./initial";

import { applyBonuses } from "./bonuses";
import { getSkill } from "./skills";

import { IBonus } from "../../../perks/bonuses";

import * as actions from "../../../perks/actions/bonuses";

const createState = emptyStateFactory;

describe("Testing applyBonuses", () => {
  it("should receive a BONUS_DESTINY", () => {
    const bonuses = [actions.bonusDestiny(12)];
    const state = createState();
    expect(state.destiny).toBe(0);
    applyBonuses(state, bonuses);
    expect(state.destiny).toBe(12);
  });

  it("should receive a BONUS_ENTANGLEMENT", () => {
    const bonuses = [actions.bonusEntanglement(13)];
    const state = createState();
    expect(state.entanglement).toBe(0);
    applyBonuses(state, bonuses);
    expect(state.entanglement).toBe(13);
  });

  it("should receive a BONUS_CHI", () => {
    const bonuses = [actions.bonusChi(14, "general")];
    const state = createState();
    expect(state.chi.general.value).toBe(0);
    applyBonuses(state, bonuses);
    expect(state.chi.general.value).toBe(14);
  });

  it("should receive a BONUS_SKILL_RANK", () => {
    const bonuses = [actions.bonusSkillRank("Awareness")];
    const state = createState();
    expect(getSkill(state.skills, "Awareness").value).toBe(0);
    applyBonuses(state, bonuses);
    expect(getSkill(state.skills, "Awareness").value).toBe(5);
  });

  it("should receive a BONUS_SPECIALITY", () => {
    const testSkill = "Medicine";
    const testSpeciality = "Poison";

    const bonuses = [actions.bonusSpeciality(testSkill, testSpeciality)];
    const state = createState();

    expect(
      getSkill(state.skills, testSkill).specialities.find(
        s => s === testSpeciality,
      ),
    ).toBeFalsy();
    applyBonuses(state, bonuses);
    expect(
      getSkill(state.skills, testSkill).specialities.find(
        s => s === testSpeciality,
      ),
    ).toBeTruthy();
  });

  it("should receive a BONUS_CULTIVATION", () => {
    const bonuses = [actions.bonusCultivation("fire", 11)];
    const state = createState();
    expect(state.chi.fire.value).toBe(0);
    expect(state.chi.fire.cultivation).toBe(0);

    applyBonuses(state, bonuses);

    expect(state.chi.fire.value).toBe(2);
    expect(state.chi.fire.cultivation).toBe(1);
  });

  it("should handle an empty list", () => {
    const state = createState();
    applyBonuses(state, []);
    expect(state).toMatchObject(createState());
  });

  it("should do nothing with a junk bonus", () => {
    const junk = { type: "JUNK" };
    const bonuses = [junk as IBonus];
    const state = createState();
    applyBonuses(state, bonuses);
    expect(state).toMatchObject(createState());
  });
});
