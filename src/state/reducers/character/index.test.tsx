import { ICharacterAction } from "../../actions/character";
import { initialStateFactory } from "../../models/character";
import { globalReducer } from "../../reducers/character";

const initialState = initialStateFactory();

describe("Testing globalReducer", () => {
  it("should create an initial state when used with no state", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(initialState, junk as ICharacterAction)).toMatchObject(
      initialState,
    );

    const action = ({
      payload: { name },
      type: "header/SET_NAME",
    } as unknown) as ICharacterAction;
    const expectedState = globalReducer(initialState, action);
    expect(globalReducer(initialState, action)).toMatchObject(expectedState);
  });

  it("should do nothing with a junk action", () => {
    expect(initialState).toMatchSnapshot();
    const junk = { type: "JUNK_ACTION" };
    expect(globalReducer(initialState, junk as ICharacterAction)).toMatchObject(
      initialState,
    );
  });
});
