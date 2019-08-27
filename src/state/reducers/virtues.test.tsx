import { testingStateFactory } from "../initial";
import { IStoreState } from "../type";

import * as dataVirtues from "../../data/virtues";
import * as actions from "../actions/virtues";
import { zeroCost } from "../costs";
import { isVirtuePresent } from "../virtues";

import { globalReducer } from "./global";
import { virtuesReducer } from "./virtues";

const initialState: IStoreState = testingStateFactory();

describe("Testing virtueReducer", () => {
  test("should receive a VIRTUE_INCREASE action with an existing virtue", () => {
    dataVirtues.virtues.forEach((virtue: dataVirtues.IDataVirtue) => {
      expect(isVirtuePresent(initialState.virtues, virtue.name)).toBeTruthy();

      const action = actions.increase(virtue.name, 3, zeroCost);
      const state = virtuesReducer(initialState, action);
      const newVirtue = state.virtues.find(v => v.name === virtue.name);
      expect(newVirtue).toBeDefined();
      expect(newVirtue ? newVirtue.value : undefined).toBe(3);
      expect(newVirtue ? newVirtue.type : undefined).toBe(virtue.type);
      expect(globalReducer(initialState, action)).toMatchObject(state);
    });
  });

  test("should fail to receive a VIRTUE_INCREASE action with a new virtue", () => {
    const virtue: dataVirtues.IDataVirtue = {
      name: "New Virtue",
      type: dataVirtues.VIRTUE_CHIVALROUS
    };
    expect(isVirtuePresent(initialState.virtues, virtue.name)).toBeFalsy();

    const action = actions.increase(virtue.name, 3, zeroCost);
    expect(() => virtuesReducer(initialState, action)).toThrowError();
  });

  test("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      virtuesReducer(initialState, junk as actions.IVirtueAction)
    ).toMatchObject(initialState);
  });
});
