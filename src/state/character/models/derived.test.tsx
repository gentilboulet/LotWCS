import { initialStateFactory } from "./initial";

import * as derived from "./derived";
import * as header from "./header";

import * as dataRank from "../../../data/ranks";
describe("chiAura", () => {
  it("should return zero with an empty state", () => {
    const state = initialStateFactory();
    expect(derived.chiAura(state)).toBe(0);
  });
  it("should return a value computed according to the rank", () => {
    const state = initialStateFactory();
    dataRank.ranks.forEach(rank => {
      header.setRank(state, rank.value);
      expect(derived.chiAura(state)).toBe(rank.value);
    });
  });
});

describe("lake", () => {
  it("should return zero with an empty state", () => {
    const state = initialStateFactory();
    expect(derived.lake(state)).toBe(5);
  });
  it("should return a value computed according to the rank", () => {
    const state = initialStateFactory();
    dataRank.ranks.forEach(rank => {
      header.setRank(state, rank.value);
      expect(derived.lake(state)).toBe(rank.value + 5);
    });
  });
});

describe("river", () => {
  it("should return 1 with an empty state", () => {
    const state = initialStateFactory();
    expect(derived.river(state)).toBe(1);
  });
  it("should return a value computed according to the rank", () => {
    const state = initialStateFactory();
    dataRank.ranks.forEach(rank => {
      header.setRank(state, rank.value);
      if (rank.value === 0) {
        expect(derived.river(state)).toBe(1);
      } else {
        expect(derived.river(state)).toBe(rank.value);
      }
    });
  });
});

describe("joss", () => {
  it("should return 1 with an empty state", () => {
    const state = initialStateFactory();
    expect(derived.joss(state)).toBe(1);
  });
  it("should return a value computed according to the rank", () => {
    const state = initialStateFactory();
    dataRank.ranks.forEach(rank => {
      header.setRank(state, rank.value);
      if (rank.value === 0) {
        expect(derived.joss(state)).toBe(1);
      } else {
        expect(derived.joss(state)).toBe(rank.value);
      }
    });
  });

  describe("chiResplenish", () => {
    it("should return 0 with an empty state", () => {
      const state = initialStateFactory();
      expect(derived.chiResplenish(state)).toBe(0);
    });
    it("should return a value computed according to the rank", () => {
      const state = initialStateFactory();
      dataRank.ranks.forEach(rank => {
        header.setRank(state, rank.value);
        if (rank.value === 0) {
          expect(derived.chiResplenish(state)).toBe(0);
        } else {
          expect(derived.chiResplenish(state)).toBe(rank.value);
        }
      });
    });
  });

  describe("maxSkillBonus", () => {
    it("should return 5 with an empty state", () => {
      const state = initialStateFactory();
      expect(derived.maxSkillBonus(state)).toBe(5);
    });
    it("should return a value computed according to the rank", () => {
      const state = initialStateFactory();
      dataRank.ranks.forEach(rank => {
        header.setRank(state, rank.value);
        if (rank.value === 0) {
          expect(derived.maxSkillBonus(state)).toBe(5);
        } else {
          expect(derived.maxSkillBonus(state)).toBe(5 * rank.value);
        }
      });
    });
  });
});
