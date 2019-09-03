import { initialStateFactory } from "./initial";

import * as header from "./header";

import * as dataRank from "../data/ranks";
describe("setRank", () => {
  it("should add an existing rank to the state]", () => {
    dataRank.ranks.forEach(rank => {
      const state = initialStateFactory();
      header.setRank(state, rank.key);
      expect(state.rank).toBeDefined();
      if (state.rank) {
        expect(state.rank.name).toBe(rank.name);
        expect(state.rank.value).toBe(rank.value);
      }
    });
  });
});
