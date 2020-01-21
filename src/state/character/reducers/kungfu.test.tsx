import { ActionType } from "typesafe-actions";

import { testingStateFactory } from "../models/initial";
import { ICharacterState } from "../models/type";

import * as data from "../../../data/kungfu";
import * as types from "../../../data/kungfu/types";
import { zeroCost } from "../models/costs";

import * as actions from "../actions/kungfu";

import { kungfuReducer } from "./kungfu";

const testingState: ICharacterState = testingStateFactory();

describe("Testing openStyle action", () => {
  it("should accept a new external style", () => {
    data.externalKungfu.forEach(style => {
      const newStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_EXTERNAL,
        zeroCost
      );
      expect(Object.keys(testingState.kungfu.KUNGFU_EXTERNAL).length).toBe(0);
      const result = kungfuReducer(testingState, newStyle);
      expect(Object.keys(result.kungfu.KUNGFU_EXTERNAL).length).toBe(1);
    });
  });

  it("should accept a new internal style", () => {
    data.internalKungfu.forEach(style => {
      const newStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_INTERNAL,
        zeroCost
      );
      expect(Object.keys(testingState.kungfu.KUNGFU_INTERNAL).length).toBe(0);
      const result = kungfuReducer(testingState, newStyle);
      expect(Object.keys(result.kungfu.KUNGFU_INTERNAL).length).toBe(1);
    });
  });
});

describe("Testing addStyleTechnique action", () => {
  it("should add a new external style technique", () => {
    data.externalKungfu.forEach(style => {
      const externalStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_EXTERNAL,
        zeroCost
      );
      const stateWithStyle = kungfuReducer(testingState, externalStyle);
      style.techniques.forEach(tech => {
        const addTechnique = actions.buyTechnique(
          style.uid,
          tech.uid,
          types.KUNGFU_EXTERNAL,
          zeroCost
        );

        expect(stateWithStyle.kungfu.KUNGFU_EXTERNAL[style.uid].length).toBe(0);
        const stateWithTechnique = kungfuReducer(stateWithStyle, addTechnique);
        expect(
          stateWithTechnique.kungfu.KUNGFU_EXTERNAL[style.uid].length
        ).toBe(1);
      });
    });
  });

  it("should add a new internal style technique", () => {
    data.internalKungfu.forEach(style => {
      const internalKungfu = actions.openStyle(
        style.uid,
        types.KUNGFU_INTERNAL,
        zeroCost
      );
      const stateWithStyle = kungfuReducer(testingState, internalKungfu);
      style.techniques
        .filter(tech => tech.level > 1) // level 1 is free on style buy
        .forEach(tech => {
          const addTechnique = actions.buyTechnique(
            style.uid,
            tech.uid,
            types.KUNGFU_INTERNAL,
            zeroCost
          );

          expect(stateWithStyle.kungfu.KUNGFU_INTERNAL[style.uid].length).toBe(
            1
          );
          const stateWithTechnique = kungfuReducer(
            stateWithStyle,
            addTechnique
          );
          expect(
            stateWithTechnique.kungfu.KUNGFU_INTERNAL[style.uid].length
          ).toBe(2);
        });
    });
  });
});

describe("Testing kungfuReducer", () => {
  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      kungfuReducer(testingState, junk as ActionType<typeof actions>)
    ).toMatchSnapshot();
  });
});
