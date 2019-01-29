import { zeroCost } from "state/costs";
import * as actions from "./chi";

describe("Testing chi action creator", () => {
  it("should create a chi buy action", () => {
    const chiType = "fire";
    const value = 123;
    const action = actions.chiBuy(chiType, value, zeroCost);
    expect(action.chi).toBe(chiType);
    expect(action.value).toBe(value);
    expect(action).toMatchSnapshot();
  });
});
