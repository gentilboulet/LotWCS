import { IAction } from "../actions/types";
import { testingStateFactory } from "../initial";
import { IStoreState } from "../type";

import { globalReducer } from "./global";

const initialState: IStoreState = testingStateFactory();

describe("Testing globalReducer", () => {
  it("should do nothing with a junk action", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(initialState, junk as IAction)).toMatchObject(
      initialState
    );
  });
});
