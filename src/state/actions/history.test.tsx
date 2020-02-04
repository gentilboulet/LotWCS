import * as actions from "./history";

import { setName } from "../actions/character/header";

describe("Testing history action creators", () => {
  it("should create an history push", () => {
    const toPush = setName("bob");
    const a = actions.historyPush(toPush);
    expect(a.payload.action).toBe(toPush);
    expect(a).toMatchSnapshot();
  });
});
