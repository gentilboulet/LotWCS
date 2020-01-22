import { testingStateFactory } from "./initial";

describe("Testing testingStateFactory", () => {
  test("should be constant", () => {
    expect(testingStateFactory()).toMatchSnapshot();
  });
});
