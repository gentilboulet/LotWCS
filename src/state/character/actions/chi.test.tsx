import { zeroCost } from "../models/costs";
import * as actions from "./chi";

describe("Testing chi action creator", () => {
  it("should create a chi buy action", () => {
    const chiType = "fire";
    const value = 123;
    const action = actions.chiBuy(chiType, value, zeroCost);
    console.log(action);
    expect(action.payload.chi).toBe(chiType);
    expect(action.payload.value).toBe(value);
    expect(action).toMatchSnapshot();
  });
});
