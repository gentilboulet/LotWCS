import { ActionType } from "typesafe-actions";

import { initialStateFactory } from "../../models/character";
import { headerReducer } from "./header";

import * as dataRank from "../../../data/ranks";
import * as actions from "../../actions/character/header";

describe("Testing headerReducer", () => {
  it("should receive a HEADER_SET_NAME action", () => {
    expect(initialStateFactory().name).toBeUndefined();
    const action = actions.setName("Robert");
    const state = headerReducer(initialStateFactory(), action);
    expect(state.name).toBe("Robert");
  });

  it("should receive a HEADER_SET_CONCEPT action", () => {
    expect(initialStateFactory().concept).toBeUndefined();
    const action = actions.setConcept("The Black Dog of Jianghu");
    const state = headerReducer(initialStateFactory(), action);
    expect(state.concept).toBe("The Black Dog of Jianghu");
  });

  it("should receive a HEADER_SET_ARCHETYPE action", () => {
    expect(initialStateFactory().archetype).toBeUndefined();
    const action = actions.setArchetype("warrior");
    const state = headerReducer(initialStateFactory(), action);
    expect(state.archetype).toBe("warrior");
  });

  it("should receive a HEADER_SET_RANK action", () => {
    expect(initialStateFactory().rank).toBeUndefined();
    const action = actions.setRank(2);
    const state = headerReducer(initialStateFactory(), action);
    const r = dataRank.getRank(state.rank) as dataRank.IDataRank;
    expect(r.name).toBe("4th Rank");
  });

  it("should do nothing with a junk action", () => {
    const junk = { type: "JUNK_ACTION" };

    const state = headerReducer(
      initialStateFactory(),
      junk as ActionType<typeof actions>,
    );
    expect(state).toMatchObject(initialStateFactory());
  });
});
