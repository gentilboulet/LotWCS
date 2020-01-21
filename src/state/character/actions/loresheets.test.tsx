import * as data from "../../../data/loresheets";
import { zeroCost } from "../models/costs";
import * as actions from "./loresheets";

const refLoresheetUid = "wulinsage";

describe("Testing loresheet action creators", () => {
  it("should create an open action", () => {
    const lsUid = data.getLoresheetData(refLoresheetUid).uid;
    const a = actions.open(lsUid, zeroCost);
    expect(a.payload.uid).toBe(lsUid);
    expect(a).toMatchSnapshot();
  });

  it("should not create an invalid open action", () => {
    const lsUid = "invalid uid yeah";
    expect(() => actions.open(lsUid, zeroCost)).toThrow();
  });

  it("should create a buy option action", () => {
    const lsUid = data.getLoresheetData(refLoresheetUid).uid;
    const optUid = data.getLoresheetData(refLoresheetUid).options[0].uid;
    const a = actions.buyOption(lsUid, optUid, zeroCost);
    expect(a.payload.lsUid).toBe(lsUid);
    expect(a.payload.uid).toBe(optUid);
    expect(a).toMatchSnapshot();
  });

  it("should not create a buy option action for an invalid loresheet", () => {
    const lsUid = "invalid uid yeah";
    const optUid = "some uid, yeah";
    expect(() => actions.buyOption(lsUid, optUid, zeroCost)).toThrow();
  });

  it("should not create a buy invalid option action", () => {
    const lsUid = data.getLoresheetData(refLoresheetUid).uid;
    const optUid = "some uid, yeah";
    expect(() => actions.buyOption(lsUid, optUid, zeroCost)).toThrow();
  });
});
