import { ActionType } from "typesafe-actions";
import { initialStateFactory } from "../models/initial";

import { globalReducer } from "./global";
import { headerReducer } from "./header";

import * as dataRank from "../../../data/ranks";

import * as actions from "../actions/header";

const initialState = () => initialStateFactory();

describe("Testing headerReducer", () => {
  it("should receive a HEADER_SET_NAME action", () => {
    expect(initialState().name).toBeUndefined();
    const action = actions.setName("Robert");
    const state = headerReducer(initialState(), action);
    expect(state.name).toBe("Robert");
    expect(globalReducer(initialState(), action)).toMatchObject(state);
  });

  it("should receive a HEADER_SET_CONCEPT action", () => {
    expect(initialState().concept).toBeUndefined();
    const action = actions.setConcept("The Black Dog of Jianghu");
    const state = headerReducer(initialState(), action);
    expect(state.concept).toBe("The Black Dog of Jianghu");
    expect(globalReducer(initialState(), action)).toMatchObject(state);
  });

  it("should receive a HEADER_SET_ARCHETYPE action", () => {
    expect(initialState().archetype).toBeUndefined();
    const action = actions.setArchetype("warrior");
    const state = headerReducer(initialState(), action);
    expect(state.archetype).toBe("warrior");
    expect(globalReducer(initialState(), action)).toMatchObject(state);
  });

  it("should receive a HEADER_SET_RANK action", () => {
    expect(initialState().rank).toBeUndefined();
    const action = actions.setRank(2);
    const state = headerReducer(initialState(), action);
    const r = dataRank.getRank(state.rank) as dataRank.IDataRank;
    expect(r.name).toBe("4th Rank");
    expect(globalReducer(initialState(), action)).toMatchObject(state);
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };

    const state = headerReducer(initialState(), junk as ActionType<
      typeof actions
    >);
    expect(state).toMatchObject(initialState());
  });
});
