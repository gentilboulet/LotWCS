import { ActionType } from "typesafe-actions";

import * as data from "../../../data/kungfu";
import * as types from "../../../data/kungfu/types";
import { zeroCost } from "../../models/character/costs";

import * as actions from "../../actions/character/kungfu";
import { kungfuReducer } from "./kungfu";

import { ICharacterState } from "../../models/character";
import { testingStateFactory } from "../../models/character/testing";

const testingState: ICharacterState = testingStateFactory();

describe("Testing openStyle action", () => {
  it("should accept a new external style", () => {
    data.externalKungfu.forEach(style => {
      const newStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_EXTERNAL,
        zeroCost,
      );
      expect(Object.keys(testingState.kungfu.KUNGFU_EXTERNAL).length).toBe(0);
      const result = kungfuReducer(testingState.kungfu, newStyle);
      expect(Object.keys(result.KUNGFU_EXTERNAL).length).toBe(1);
    });
  });

  it("should accept a new internal style", () => {
    data.internalKungfu.forEach(style => {
      const newStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_INTERNAL,
        zeroCost,
      );
      expect(Object.keys(testingState.kungfu.KUNGFU_INTERNAL).length).toBe(0);
      const result = kungfuReducer(testingState.kungfu, newStyle);
      expect(Object.keys(result.KUNGFU_INTERNAL).length).toBe(1);
    });
  });
});

describe("Testing addStyleTechnique action", () => {
  it("should add a new external style technique", () => {
    data.externalKungfu.forEach(style => {
      const externalStyle = actions.openStyle(
        style.uid,
        types.KUNGFU_EXTERNAL,
        zeroCost,
      );
      const stateWithStyle = kungfuReducer(testingState.kungfu, externalStyle);
      style.techniques.forEach(tech => {
        const addTechnique = actions.buyTechnique(
          style.uid,
          tech.uid,
          types.KUNGFU_EXTERNAL,
          zeroCost,
        );

        expect(stateWithStyle.KUNGFU_EXTERNAL[style.uid].length).toBe(0);
        const stateWithTechnique = kungfuReducer(stateWithStyle, addTechnique);
        expect(stateWithTechnique.KUNGFU_EXTERNAL[style.uid].length).toBe(1);
      });
    });
  });

  it("should add a new internal style technique", () => {
    data.internalKungfu.forEach(style => {
      const internalKungfu = actions.openStyle(
        style.uid,
        types.KUNGFU_INTERNAL,
        zeroCost,
      );
      const stateWithStyle = kungfuReducer(testingState.kungfu, internalKungfu);
      style.techniques
        .filter(tech => tech.level > 1) // level 1 is free on style buy
        .forEach(tech => {
          const addTechnique = actions.buyTechnique(
            style.uid,
            tech.uid,
            types.KUNGFU_INTERNAL,
            zeroCost,
          );

          expect(stateWithStyle.KUNGFU_INTERNAL[style.uid].length).toBe(1);
          const stateWithTechnique = kungfuReducer(
            stateWithStyle,
            addTechnique,
          );
          expect(stateWithTechnique.KUNGFU_INTERNAL[style.uid].length).toBe(2);
        });
    });
  });
});

describe("Testing kungfuReducer", () => {
  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      kungfuReducer(testingState.kungfu, junk as ActionType<typeof actions>),
    ).toMatchSnapshot();
  });
});
