import { initialStateFactory } from "./index";

import * as header from "./header";

import * as dataRank from "../../../data/ranks";
describe("setRank", () => {
  it("should add an existing rank to the state", () => {
    dataRank.ranks.forEach(rank => {
      const state = initialStateFactory();
      header.setRank(state, rank.value);
      expect(state.rank).toBeDefined();
      if (state.rank) {
        expect(state.rank).toBe(rank.value);
      }
    });
  });
});
