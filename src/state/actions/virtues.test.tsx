import * as dataVirtues from "../../data/virtues";
import { zeroCost } from "../costs";
import * as actions from "./virtues";

describe("Testing virtue action creator", () => {
  dataVirtues.virtues.map((data: dataVirtues.IDataVirtue) => {
    test("should create a virtue increase action with an existing virtue", () => {
      const name = data.name;
      const a = actions.increase(name, 10, zeroCost);
      expect(a.name).toBe(name);
      expect(a.value).toBe(10);
      expect(a).toMatchSnapshot();
    });
  });

  test("should create a virtue increase action with a non existing virtue", () => {
    const name = "New virtue name";
    const a = actions.increase(name, 3, zeroCost);
    expect(a.name).toBe(name);
    expect(a.value).toBe(3);
    expect(a).toMatchSnapshot();
  });
});
