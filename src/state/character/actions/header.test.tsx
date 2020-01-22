import { TArchetype } from "../../../data/archetypes";
import { TRank } from "../../../data/ranks";
import * as actions from "./header";

describe("Testing header action creators", () => {
  test("should create a set name action", () => {
    const name = "New Name";
    const a = actions.setName(name);
    expect(a.payload.name).toBe(name);
    expect(a).toMatchSnapshot();
  });

  test("should create a set concept action", () => {
    const concept = "New Concept";
    const a = actions.setConcept(concept);
    expect(a.payload.concept).toBe(concept);
    expect(a).toMatchSnapshot();
  });

  test("should create a set archetype action", () => {
    const archetype = "doctor";
    const a = actions.setArchetype(archetype);
    expect(a.payload.archetype).toBe(archetype);
    expect(a).toMatchSnapshot();
  });

  test("should not create an invalid set archetype action", () => {
    expect(() =>
      actions.setArchetype(("pro golfer" as unknown) as TArchetype),
    ).toThrowError();
  });

  test("should create a set rank action", () => {
    const rank = 2;
    const a = actions.setRank(rank);
    expect(a.payload.rank).toBe(rank);
    expect(a).toMatchSnapshot();
  });

  test("should not create an invalid set rank action", () => {
    expect(() =>
      actions.setRank(("ultimate rank" as unknown) as TRank),
    ).toThrowError();
  });
});
