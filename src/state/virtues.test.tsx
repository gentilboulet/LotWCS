import { initialStateFactory } from "state/initial";
import { IStoreState } from "state/type";

import * as dataVirtues from "data/virtues";

import {
  add,
  canBuyVirtue,
  increase,
  isVirtuePresent,
  IVirtueState
} from "./virtues";

describe("Testing IVirtueState", () => {
  it("should do increase existing virtue value", () => {
    const initialState: IStoreState = Object.assign({}, initialStateFactory());
    dataVirtues.virtues.forEach((virtue: dataVirtues.IDataVirtue) => {
      expect(isVirtuePresent(initialState.virtues, virtue.name)).toBeTruthy();
      const initialVirtue = initialState.virtues.find(
        v => virtue.name === v.name
      ) as IVirtueState;
      expect(initialVirtue).toBeDefined();
      expect(initialVirtue.value).toBe(0);

      const state = Object.assign({}, initialState);
      increase(state.virtues, virtue.name, 13);
      const stateVirtue = state.virtues.find(
        v => virtue.name === v.name
      ) as IVirtueState;
      expect(stateVirtue).toBeDefined();
      expect(stateVirtue.value).toBe(13);
    });
  });

  it("should not increase an unknown virtue to the state", () => {
    const initialState: IStoreState = Object.assign({}, initialStateFactory());
    const junk: dataVirtues.IDataVirtue = {
      name: "New Virtue",
      type: dataVirtues.VIRTUE_CHIVALROUS
    };
    expect(isVirtuePresent(initialState.virtues, junk.name)).toBeFalsy();

    const state = Object.assign({}, initialState);
    expect(() => increase(state.virtues, junk.name, 25)).toThrowError();
  });

  it("should add a new virtue to the state", () => {
    const initialState: IStoreState = Object.assign({}, initialStateFactory());
    const virtue: dataVirtues.IDataVirtue = {
      name: "New Virtue",
      type: dataVirtues.VIRTUE_CHIVALROUS
    };
    expect(isVirtuePresent(initialState.virtues, virtue.name)).toBeFalsy();

    const state = Object.assign({}, initialState);
    add(state.virtues, virtue.name, virtue.type, 25);

    const stateVirtue = state.virtues.find(
      v => virtue.name === v.name
    ) as IVirtueState;
    expect(stateVirtue).toBeDefined();
    expect(stateVirtue.value).toBe(25);
  });

  it("should not add an existing virtue to the state", () => {
    const initialState: IStoreState = Object.assign({}, initialStateFactory());
    const junk: dataVirtues.IDataVirtue = dataVirtues.virtues[0];
    expect(isVirtuePresent(initialState.virtues, junk.name)).toBeTruthy();
    expect(() =>
      add(initialState.virtues, junk.name, junk.type, 25)
    ).toThrowError();
  });

  it("should check canBuyVirtue", () => {
    const state = initialStateFactory();
    const regularVirtue = dataVirtues.virtues[0];

    const junkVirtue = { name: "New Virtue", type: dataVirtues.VIRTUE_SELFISH };
    expect(canBuyVirtue(state, junkVirtue.name)).toBeFalsy();
    expect(canBuyVirtue(state, regularVirtue.name)).toBeTruthy();
    state.virtues[0].value = 5;
    expect(canBuyVirtue(state, regularVirtue.name)).toBeFalsy();
  });
});
