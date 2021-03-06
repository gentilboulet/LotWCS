import { ActionType } from "typesafe-actions";

import * as dataVirtues from "../../../data/virtues";
import * as actions from "../../actions/character/virtues";
import { zeroCost } from "../../models/character/costs";
import { createState, isVirtuePresent } from "../../models/character/virtues";
import { virtuesReducer } from "./virtues";

const initialState = createState();

describe("Testing virtueReducer", () => {
  it("should receive a VIRTUE_INCREASE action with an existing virtue", () => {
    dataVirtues.virtues.forEach((virtue: dataVirtues.IDataVirtue) => {
      expect(isVirtuePresent(initialState, virtue.name)).toBeTruthy();

      const action = actions.increase(virtue.name, 3, zeroCost);
      const state = virtuesReducer(initialState, action);
      const newVirtue = state.find(v => v.name === virtue.name);
      expect(newVirtue).toBeDefined();
      expect(newVirtue ? newVirtue.value : undefined).toBe(3);
      expect(newVirtue ? newVirtue.type : undefined).toBe(virtue.type);
    });
  });

  it("should fail to receive a VIRTUE_INCREASE action with a new virtue", () => {
    const virtue: dataVirtues.IDataVirtue = {
      name: "New Virtue",
      type: dataVirtues.VIRTUE_CHIVALROUS,
    };
    expect(isVirtuePresent(initialState, virtue.name)).toBeFalsy();

    const action = actions.increase(virtue.name, 3, zeroCost);
    expect(() => virtuesReducer(initialState, action)).toThrowError();
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      virtuesReducer(initialState, junk as ActionType<typeof actions>),
    ).toMatchObject(initialState);
  });
});
