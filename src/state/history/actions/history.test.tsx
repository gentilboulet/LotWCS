import * as actions from "./history";

describe("Testing history action creators", () => {
  it("should create an history delete action", () => {
    const id = 12;
    const a = actions.historyDeleteUpTo(id);
    expect(a.payload.id).toBe(id);
    expect(a).toMatchSnapshot();
  });

  describe("Testing initial state action creator", () => {
    it("should create a reset to initial state action", () => {
      expect(actions.resetToInitialState()).toMatchSnapshot();
    });
  });
});
