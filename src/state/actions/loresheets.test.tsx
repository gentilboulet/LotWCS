import * as dataLoresheets from "../../data/loresheets";
import { zeroCost } from "../costs";
import * as actions from "./loresheets";

describe("Testing loresheet action creators", () => {
  test("should create an open action", () => {
    const lsUid = dataLoresheets.loresheets[0].uid;
    const a = actions.open(lsUid, zeroCost);
    expect(a.uid).toBe(lsUid);
    expect(a).toMatchSnapshot();
  });

  test("should not create an invalid open action", () => {
    const lsUid = "invalid uid yeah";
    expect(() => actions.open(lsUid, zeroCost)).toThrow();
  });

  test("should create a buy option action", () => {
    const lsUid = dataLoresheets.loresheets[0].uid;
    const optUid = dataLoresheets.loresheets[0].options[0].uid;
    const a = actions.buyOption(lsUid, optUid, zeroCost);
    expect(a.lsUid).toBe(lsUid);
    expect(a.uid).toBe(optUid);
    expect(a).toMatchSnapshot();
  });

  test("should not create a buy option action for an invalid loresheet", () => {
    const lsUid = "invalid uid yeah";
    const optUid = "some uid, yeah";
    expect(() => actions.buyOption(lsUid, optUid, zeroCost)).toThrow();
  });

  test("should not create a buy invalid option action", () => {
    const lsUid = dataLoresheets.loresheets[0].uid;
    const optUid = "some uid, yeah";
    expect(() => actions.buyOption(lsUid, optUid, zeroCost)).toThrow();
  });
});
