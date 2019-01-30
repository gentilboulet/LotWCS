import { IAction } from "../actions/types";
import { initialStateFactory } from "../initial";
import { IStoreState } from "../type";

import * as header from "../actions/header";
import { historyDeleteUpTo, IHistoryAction } from "../actions/history";
import { resetToInitialState } from "../actions/initial";
import * as history from "../history";

import { historyReducer } from "./history";

const initialState: IStoreState = initialStateFactory();

describe("Testing historyReducer", () => {
  it("should receive an HISTORY_DELETE action", () => {
    const actions: IAction[] = [
      resetToInitialState(),
      header.setName("Roberts"),
      header.setConcept("Dread pirate Roberts"),
      header.setArchetype("warrior"),
      header.setRank("4th_rank")
    ];
    const stateBefore = history.replayHistory(initialState, actions);
    expect(stateBefore).toMatchSnapshot();
    const state = history.replayHistory(stateBefore, [historyDeleteUpTo(1)]);
    expect(state).toMatchSnapshot();
    expect(state.name).toBe("Roberts");
    expect(state.concept).toBeUndefined();
    expect(state.history.length === 1 + 1);
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      historyReducer(initialState, junk as IHistoryAction)
    ).toMatchSnapshot();
  });
});
