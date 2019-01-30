import { IChiAction } from "../actions/chi";
import { initialStateFactory } from "../initial";
import { IStoreState } from "../type";

import { chiReducer } from "./chi";
import { globalReducer } from "./global";

import * as actions from "../actions/chi";
import { zeroCost } from "../costs";

const initialState: IStoreState = initialStateFactory();

describe("Testing chiReducer", () => {
  it("should receive a CHI_BUY action", () => {
    expect(initialState.chi.fire.value).toBe(0);
    const action = actions.chiBuy("fire", 13, zeroCost);
    const state = chiReducer(initialState, action);
    expect(state.chi.fire.value).toBe(13);
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(chiReducer(initialState, junk as IChiAction)).toMatchSnapshot();
  });
});
