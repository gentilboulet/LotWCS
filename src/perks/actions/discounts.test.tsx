import * as discounts from "./discounts";

describe("Testing discount creators", () => {
  test("should create a skill discount", () => {
    const discount = discounts.discountSkillFactory(10);
    expect(discount).toMatchSnapshot();
  });

  test("should create a skill discount for a single skill", () => {
    const discount = discounts.discountSkillFactory(10, [
      "Awareness",
      "Politics",
    ]);
    expect(discount).toMatchSnapshot();
  });

  test("should create a skill discount with an empty subset", () => {
    const discount = discounts.discountSkillFactory(10, []);
    expect(discount).toMatchSnapshot();
  });
});
