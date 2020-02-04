import { testingStateFactory } from "./testing";

describe("testing state", () => {
  it("should be stable", () => {
    expect(testingStateFactory()).toMatchSnapshot();
  });
});
