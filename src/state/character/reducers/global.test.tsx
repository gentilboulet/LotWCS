import { ICharacterAction } from "../actions/types";
import { initialStateFactory } from "../models/initial";
import { globalReducer } from "./global";

const initialState = initialStateFactory();

describe("Testing globalReducer", () => {
  it("should create an initial state when used with no state", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(undefined, junk as ICharacterAction)).toMatchObject(
      initialState
    );

    const action = {
      type: "header/SET_NAME",
      payload: { name }
    } as ICharacterAction;
    const expectedState = globalReducer(initialState, action);
    expect(globalReducer(undefined, action)).toMatchObject(expectedState);
  });

  it("should do nothing with a junk action", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(initialState, junk as ICharacterAction)).toMatchObject(
      initialState
    );
  });
});
