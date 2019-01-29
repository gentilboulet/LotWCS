import * as dataKungfus from "data/kungfu";
import { zeroCost } from "state/costs";
import * as actions from "./kungfu";

describe("Testing external kungfu action creator", () => {
  expect(dataKungfus.externalKungfu.length).toBeGreaterThan(0);
  expect(dataKungfus.internalKungfu.length).toBeGreaterThan(0);

  // Typescript error checking can't be sure arrays are not empty
  if (
    dataKungfus.externalKungfu.length === 0 ||
    dataKungfus.internalKungfu.length === 0
  ) {
    throw new Error("Impossible failure in tests");
  }

  const validExternal = dataKungfus.externalKungfu[0];
  const validInternal = dataKungfus.internalKungfu[0];

  it("should validate testing data :)", () => {
    expect(validExternal.uid.length).toBeGreaterThan(0);
    expect(validExternal.techniques.length).toBeGreaterThan(0);
    expect(validInternal.uid.length).toBeGreaterThan(0);
    expect(validInternal.techniques.length).toBeGreaterThan(0);
  });

  it("should create an OPEN_STYLE action with an internal kungfu", () => {
    const uid = validInternal.uid;
    const type = dataKungfus.KUNGFU_INTERNAL;
    const a = actions.openStyle(uid, type, zeroCost);
    expect(a.uid).toBe(uid);
    expect(a.kungfuType).toBe(type);
    expect(a).toMatchSnapshot();
  });

  it("should create an OPEN_STYLE action with an external kungfu", () => {
    const uid = validExternal.uid;
    const type = dataKungfus.KUNGFU_EXTERNAL;
    const a = actions.openStyle(uid, type, zeroCost);
    expect(a.uid).toBe(uid);
    expect(a.kungfuType).toBe(type);
    expect(a).toMatchSnapshot();
  });

  it("should not create an OPEN_STYLE action with an erroneous kungfu type", () => {
    const type = "TOTALLY A KUNGFU TYPE" as dataKungfus.KUNGFU_TYPE;
    expect(() =>
      actions.openStyle(validExternal.uid, type, zeroCost)
    ).toThrow();
  });

  it("should not create an OPEN_STYLE action with an erroneous internal kungfu", () => {
    const uid = "TOTALLY A KUNGFU UID";
    expect(() =>
      actions.openStyle(uid, dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.openStyle("", dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
  });

  it("should not create an OPEN_STYLE action with an erroneous external kungfu", () => {
    const uid = "TOTALLY A KUNGFU UID";
    expect(() =>
      actions.openStyle(uid, dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.openStyle("", dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
  });

  it("should create a BUY_TECHNIQUE action with an internal kungfu", () => {
    const techUid = validInternal.techniques[0].uid;
    const uid = validInternal.uid;
    const type = dataKungfus.KUNGFU_INTERNAL;
    const a = actions.buyTechnique(uid, techUid, type, zeroCost);
    expect(a.uid).toBe(techUid);
    expect(a.kungfuType).toBe(type);
    expect(a.styleUid).toBe(uid);
  });

  it("should create a BUY_TECHNIQUE action with an external kungfu", () => {
    const techUid = validExternal.techniques[0].uid;
    const uid = validExternal.uid;
    const type = dataKungfus.KUNGFU_EXTERNAL;
    const a = actions.buyTechnique(uid, techUid, type, zeroCost);
    expect(a.uid).toBe(techUid);
    expect(a.kungfuType).toBe(type);
    expect(a.styleUid).toBe(uid);
  });

  it("should not create an BUY_TECHNIQUE action with an erroneous kungfu type", () => {
    const type = "TOTALLY A KUNGFU TYPE" as dataKungfus.KUNGFU_TYPE;
    const techUid = validExternal.techniques[0].uid;
    expect(() =>
      actions.buyTechnique(techUid, validExternal.uid, type, zeroCost)
    ).toThrow();
  });

  it("should not create an BUY_TECHNIQUE action with an erroneous internal kungfu", () => {
    const uid = "TOTALLY A KUNGFU UID";
    const techUid = validInternal.techniques[0].uid;
    expect(() =>
      actions.buyTechnique(techUid, uid, dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.buyTechnique(techUid, "", dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
  });

  it("should not create an BUY_TECHNIQUE action with an erroneous external kungfu", () => {
    const uid = "TOTALLY A KUNGFU UID";
    const techUid = validExternal.techniques[0].uid;
    expect(() =>
      actions.buyTechnique(techUid, uid, dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.buyTechnique(techUid, "", dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
  });

  it("should not create an BUY_TECHNIQUE action with an erroneous internal kungfu technique", () => {
    const uid = validInternal.techniques[0].uid;
    const techUid = "TOTALLY A KUNGFU TECHNIQUE UID";
    expect(() =>
      actions.buyTechnique(techUid, uid, dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.buyTechnique("", uid, dataKungfus.KUNGFU_INTERNAL, zeroCost)
    ).toThrow();
  });

  it("should not create an BUY_TECHNIQUE action with an erroneous external kungfu technique", () => {
    const uid = validExternal.techniques[0].uid;
    const techUid = "TOTALLY A KUNGFU TECHNIQUE UID";
    expect(() =>
      actions.buyTechnique(techUid, uid, dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
    expect(() =>
      actions.buyTechnique("", uid, dataKungfus.KUNGFU_EXTERNAL, zeroCost)
    ).toThrow();
  });
});
