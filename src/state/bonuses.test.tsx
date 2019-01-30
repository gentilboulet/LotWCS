import { initialStateFactory } from "./initial";
import { IStoreState } from "./type";

import { applyBonuses } from "./bonuses";

import { IBonus } from "./bonuses";

import * as actions from "./actions/perks/bonuses";

import { setArchetype, setRank } from "./actions/header";
import { replayHistory } from "./history";

export function testingStateFactory(): IStoreState {
  const initial = initialStateFactory();
  const list = [setRank("4th_rank"), setArchetype("warrior")];
  initial.destiny += 25;
  return replayHistory(initial, list);
}

const initialState: IStoreState = testingStateFactory();

describe("Testing applyBonuses", () => {
  it("should receive a BONUS_DESTINY", () => {
    const bonuses = [actions.bonusDestiny(12)];
    const state = applyBonuses(initialState, bonuses);
    expect(initialState.destiny).toBe(25);
    expect(state.destiny).toBe(37);
  });

  it("should receive a BONUS_ENTANGLEMENT", () => {
    const bonuses = [actions.bonusEntanglement(13)];
    const state = applyBonuses(initialState, bonuses);
    expect(initialState.entanglement).toBe(0);
    expect(state.entanglement).toBe(13);
  });

  it("should receive a BONUS_CHI", () => {
    const bonuses = [actions.bonusChi(14, "general")];
    const state = applyBonuses(initialState, bonuses);
    expect(initialState.chi.general.value).toBe(10);
    expect(state.chi.general.value).toBe(24);
  });

  it("should receive a BONUS_SKILL_RANK", () => {
    const bonuses = [actions.bonusSkillRank("Awareness")];
    const state = applyBonuses(initialState, bonuses);
    expect(initialState.skills.Awareness.value).toBe(0);
    expect(state.skills.Awareness.value).toBe(5);
  });

  it("should receive a BONUS_SPECIALITY", () => {
    const testSkill = "Awareness";
    const testSpeciality = "Hear";

    const bonuses = [actions.bonusSpeciality(testSkill, testSpeciality)];
    const state = applyBonuses(initialState, bonuses);

    expect(
      initialState.skills[testSkill].specialities.find(
        s => s === testSpeciality
      )
    ).toBeFalsy();
    expect(
      state.skills[testSkill].specialities.find(s => s === testSpeciality)
    ).toBeTruthy();
  });

  it("should receive a BONUS_CULTIVATION", () => {
    const bonuses = [actions.bonusCultivation("fire", 4)];
    const state = applyBonuses(initialState, bonuses);

    expect(initialState.chi.fire.value).toBe(0);
    expect(state.chi.fire.value).toBe(2);
    expect(initialState.chi.fire.cultivation).toBe(0);
    expect(state.chi.fire.cultivation).toBe(1);
  });

  it("should handle an empty list", () => {
    const state = applyBonuses(initialState, []);
    expect(state).toMatchObject(initialState);
  });

  it("should do nothing with a junk bonus", () => {
    const junk = { type: "JUNK" };
    const bonuses = [junk as IBonus];
    const state = applyBonuses(initialState, bonuses);
    expect(state).toMatchObject(initialState);
  });
});
