import { ActionType } from "typesafe-actions";

import { IAction } from "../actions/types";
import { testingStateFactory } from "../initial";
import { ICharacterState } from "../type";

import * as header from "../actions/header";
import * as actions from "../actions/history";
import * as history from "../history";

import { historyReducer } from "./history";

const initialState: ICharacterState = testingStateFactory();

describe("Testing historyReducer", () => {
  it("should receive an HISTORY_DELETE action", () => {
    const replayActions: IAction[] = [
      actions.resetToInitialState(),
      header.setName("Roberts"),
      header.setConcept("Dread pirate Roberts"),
      header.setArchetype("warrior"),
      header.setRank(2)
    ];
    const stateBefore = history.replayHistory(initialState, replayActions);
    expect(stateBefore).toMatchSnapshot();
    const state = history.replayHistory(stateBefore, [
      actions.historyDeleteUpTo(1)
    ]);
    expect(state).toMatchSnapshot();
    expect(state.name).toBe("Roberts");
    expect(state.concept).toBeUndefined();
    expect(state.history.length === 1 + 1);
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      historyReducer(initialState, junk as ActionType<typeof actions>)
    ).toMatchSnapshot();
  });
});
