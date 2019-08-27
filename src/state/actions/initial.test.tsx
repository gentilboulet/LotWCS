import * as actions from "./initial";

describe("Testing initial state action creator", () => {
  test("should create a reset to initial state action", () => {
    expect(actions.resetToInitialState()).toMatchSnapshot();
  });
});
