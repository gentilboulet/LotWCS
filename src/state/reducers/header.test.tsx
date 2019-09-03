import { IHeaderAction } from "../actions/header";
import { emptyStateFactory } from "../initial";
import { IStoreState } from "../type";

import { globalReducer } from "./global";
import { headerReducer } from "./header";

import * as actions from "../actions/header";

const initialState: IStoreState = emptyStateFactory();

describe("Testing headerReducer", () => {
  test("should receive a HEADER_SET_NAME action", () => {
    expect(initialState.name).toBeUndefined();
    const action = actions.setName("Robert");
    const state = headerReducer(initialState, action);
    expect(state.name).toBe("Robert");
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  test("should receive a HEADER_SET_CONCEPT action", () => {
    expect(initialState.concept).toBeUndefined();
    const action = actions.setConcept("The Black Dog of Jianghu");
    const state = headerReducer(initialState, action);
    expect(state.concept).toBe("The Black Dog of Jianghu");
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  test("should receive a HEADER_SET_ARCHETYPE action", () => {
    expect(initialState.archetype).toBeUndefined();
    const action = actions.setArchetype("warrior");
    const state = headerReducer(initialState, action);
    expect(state.archetype).toBe("warrior");
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  test("should receive a HEADER_SET_RANK action", () => {
    expect(initialState.rank).toBeUndefined();
    const action = actions.setRank("4th_rank");
    const state = headerReducer(initialState, action);
    expect(state.rank ? state.rank.name : undefined).toBe("4th Rank");
    expect(globalReducer(initialState, action)).toMatchObject(state);
  });

  test("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };
    expect(
      headerReducer(initialState, junk as IHeaderAction)
    ).toMatchSnapshot();
  });
});
