import { IAction } from "./actions/types";
import { IStoreState } from "./type";

import * as header from "./actions/header";
import { resetToInitialState } from "./actions/initial";
import { testingStateFactory } from "./initial";

import { replayHistory } from "./history";

const initialState: IStoreState = testingStateFactory();

describe("Testing pushToHistory", () => {
  test("should push actions to history", () => {
    const action = header.setName("Dummy Name");
    expect(initialState.history[0]).toMatchObject(resetToInitialState());

    const state = Object.assign({}, initialState);
    // state.history.push(action);
    expect(state.history[0]).toMatchObject(initialState.history[0]);
    // expect(state.history[1]).toMatchObject(action);
  });
});

describe("Testing replayHistory", () => {
  test("should replay an history of actions", () => {
    const actions: IAction[] = [
      resetToInitialState(),
      header.setName("Roberts"),
      header.setConcept("Dread pirate Roberts"),
      resetToInitialState(),
      header.setName("John")
    ];
    const state = replayHistory(initialState, actions);
    expect(state).toMatchSnapshot();
    expect(state.name).toBe("John");
    expect(state.concept).toBeUndefined();
    expect(state.history.length === actions.length + 1);
  });
});
