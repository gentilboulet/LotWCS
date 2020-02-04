import * as actions from "../../actions/character/chi";
import { createState } from "../../models/character/chi";
import { zeroCost } from "../../models/character/costs";
import { chiReducer, IChiAction } from "./chi";

const initialState = createState();

describe("Testing chiReducer", () => {
  it("should receive a CHI_BUY action", () => {
    expect(initialState.fire.value).toBe(0);
    const action = actions.chiBuy("fire", 13, zeroCost);
    const state = chiReducer(initialState, action);
    expect(state.fire.value).toBe(13);
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(chiReducer(initialState, junk as IChiAction)).toMatchObject(
      initialState,
    );
  });
});
