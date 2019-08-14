import { IAction } from "../actions/types";
import { initialStateFactory } from "../initial";
import { globalReducer } from "./global";

const initialState = initialStateFactory();

describe("Testing globalReducer", () => {
  it("should create an initial state when used with no state", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(undefined, junk as IAction)).toMatchObject(
      initialState
    );

    const action = { type: "HEADER_SET_NAME", name } as IAction;
    const expectedState = globalReducer(initialState, action);
    expect(globalReducer(undefined, action)).toMatchObject(expectedState);
  });

  it("should do nothing with a junk action", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(initialState, junk as IAction)).toMatchObject(
      initialState
    );
  });
});
