import * as data from "../data/kungfu";
import { KUNGFU_EXTERNAL, KUNGFU_INTERNAL } from "../data/kungfu/types";
import * as kungfu from "./kungfu";

const _createStateWithAllStyles = () => {
  const state = kungfu.createState();

  data.externalKungfu.forEach(style => {
    kungfu.openStyle(state, KUNGFU_EXTERNAL, style.uid);
  });
  data.internalKungfu.forEach(style => {
    kungfu.openStyle(state, KUNGFU_INTERNAL, style.uid);
  });

  return state;
};

describe("Testing createState", () => {
  it("should create an empty state", () => {
    const state = kungfu.createState();
    expect(state).toMatchSnapshot();
    expect(Object.keys(state.KUNGFU_EXTERNAL).length).toBe(0);
    expect(Object.keys(state.KUNGFU_INTERNAL).length).toBe(0);
  });
});

describe("Testing openStyle", () => {
  it("should open an external style", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      kungfu.openStyle(state, KUNGFU_EXTERNAL, style.uid);
    });
    const keys = Object.keys(state.KUNGFU_EXTERNAL);
    data.externalKungfu.forEach(style => {
      expect(keys.find(k => k === style.uid)).toBeDefined();
    });
  });
  it("should open an internal style", () => {
    const state = kungfu.createState();
    data.internalKungfu.forEach(style => {
      kungfu.openStyle(state, KUNGFU_INTERNAL, style.uid);
    });
    const keys = Object.keys(state.KUNGFU_INTERNAL);
    data.internalKungfu.forEach(style => {
      expect(keys.find(k => k === style.uid)).toBeDefined();
    });
  });
  it("should not add duplicate styles", () => {
    const state = _createStateWithAllStyles();
    data.internalKungfu.forEach(style => {
      expect(() =>
        kungfu.openStyle(state, KUNGFU_INTERNAL, style.uid)
      ).toThrowError();
    });
  });
});

describe("Testing isStylePresent", () => {
  it("should not find anything in an empty state", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      expect(
        kungfu.isStylePresent(state, KUNGFU_EXTERNAL, style.uid)
      ).toBeFalsy();
    });
    data.internalKungfu.forEach(style => {
      expect(
        kungfu.isStylePresent(state, KUNGFU_INTERNAL, style.uid)
      ).toBeFalsy();
    });
  });

  it("should detect an existing style", () => {
    const state = _createStateWithAllStyles();

    data.externalKungfu.forEach(style => {
      expect(
        kungfu.isStylePresent(state, KUNGFU_EXTERNAL, style.uid)
      ).toBeTruthy();
    });
    data.internalKungfu.forEach(style => {
      expect(
        kungfu.isStylePresent(state, KUNGFU_INTERNAL, style.uid)
      ).toBeTruthy();
    });
  });
});

describe("Testing addKungFuTechnique", () => {
  it("should add techniques for an already opened style", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid);
        const index = state.KUNGFU_EXTERNAL[style.uid].findIndex(
          stateTechUid => {
            return stateTechUid === tech.uid;
          }
        );
        expect(index).toBeGreaterThanOrEqual(0);
      });
    });
  });
  it("should not add techniques for a not opened style", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(() =>
          kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid)
        ).toThrowError();
      });
    });
  });
  it("should not add duplicate techniques", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid);
      });
    });
    expect(state).toMatchSnapshot();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(() =>
          kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid)
        ).toThrowError();
      });
    });
  });
});

describe("Testing isStyleTechniquePresent", () => {
  it("should not find anything in an empty state", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.isStyleTechniquePresent(
            state,
            KUNGFU_EXTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
    data.internalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.isStyleTechniquePresent(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
  });
  it("should detect an existing external style technique", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid);
      });
      style.techniques.forEach(tech => {
        expect(
          kungfu.isStyleTechniquePresent(
            state,
            KUNGFU_EXTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeTruthy();
      });
    });
  });
  it("should detect an existing internal style technique", () => {
    const state = _createStateWithAllStyles();
    data.internalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_INTERNAL, style.uid, tech.uid);
      });
      style.techniques.forEach(tech => {
        expect(
          kungfu.isStyleTechniquePresent(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeTruthy();
      });
    });
  });
});

describe("Testing getExternalKungFuStatistics", () => {
  it("should return data statistics for a non open style", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      expect(
        kungfu.getExternalKungFuStatistics(state, style.uid)
      ).toMatchObject(style.statistics);
    });
  });
  it("should return modified statistics for a style with techniques", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid);
      });
      expect(
        kungfu.getExternalKungFuStatistics(state, style.uid)
      ).toMatchSnapshot();
    });
  });
});

describe("Testing canOpenKungFu", () => {
  it("should allow for opening style to an empty state", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      expect(
        kungfu.canOpenKungFu(state, KUNGFU_EXTERNAL, style.uid)
      ).toBeTruthy();
    });
    data.internalKungfu.forEach(style => {
      expect(
        kungfu.canOpenKungFu(state, KUNGFU_INTERNAL, style.uid)
      ).toBeTruthy();
    });
  });
  it("should disallow an external style already open", () => {
    const state = _createStateWithAllStyles();

    data.externalKungfu.forEach(style => {
      expect(
        kungfu.canOpenKungFu(state, KUNGFU_EXTERNAL, style.uid)
      ).toBeFalsy();
    });
  });
  it("should disallow an internal style already open", () => {
    const state = _createStateWithAllStyles();

    data.internalKungfu.forEach(style => {
      expect(
        kungfu.canOpenKungFu(state, KUNGFU_INTERNAL, style.uid)
      ).toBeFalsy();
    });
  });
});

describe("Testing canBuyKungFuTechnique", () => {
  it("should disallow buying any techniques for non opened style", () => {
    const state = kungfu.createState();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_EXTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
    data.internalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
  });
  it("should allow buying any technique for an external style", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_EXTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeTruthy();
      });
    });
  });
  it("should allow buying techniques in increasing order of level for internal style", () => {
    const state = _createStateWithAllStyles();
    data.internalKungfu.forEach(style => {
      const techniquesByLevel: string[] = [];
      let lowestTechLevel = 0;
      style.techniques
        .sort((a, b) => {
          return a.level - b.level;
        })
        .forEach(tech => {
          if (tech.level === lowestTechLevel + 1) {
            techniquesByLevel.push(tech.uid);
            lowestTechLevel++;
          }
        });
      expect(lowestTechLevel).toBe(5);
      techniquesByLevel.forEach(techUid => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            techUid
          )
        ).toBeTruthy();
        kungfu.addKungFuTechnique(state, KUNGFU_INTERNAL, style.uid, techUid);
      });
    });
  });
  it("should disallow buying already present techniques", () => {
    const state = _createStateWithAllStyles();
    data.externalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        kungfu.addKungFuTechnique(state, KUNGFU_EXTERNAL, style.uid, tech.uid);
      });
      style.techniques.forEach(tech => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_EXTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
  });
  it("should disallow buying internal technique of an already bought level for a given style", () => {
    const state = _createStateWithAllStyles();
    data.internalKungfu.forEach(style => {
      let lowestTechLevel = 0;
      style.techniques.forEach(tech => {
        if (tech.level === lowestTechLevel + 1) {
          state.KUNGFU_INTERNAL[style.uid].push(tech.uid);
          lowestTechLevel++;
        }
      });
      expect(lowestTechLevel).toBe(5);
      style.techniques.forEach(tech => {
        if (
          kungfu.isStyleTechniquePresent(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ) {
          return;
        } // skip existing tech
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeFalsy();
      });
    });
  });
  it("should allow buying any techniques for an internal style whose level restrictions are lifted", () => {
    const state = _createStateWithAllStyles();
    data.internalKungfu.forEach(style => {
      state.noRestrictionInternal.push(style.uid);
    });
    data.internalKungfu.forEach(style => {
      style.techniques.forEach(tech => {
        expect(
          kungfu.canBuyKungFuTechnique(
            state,
            KUNGFU_INTERNAL,
            style.uid,
            tech.uid
          )
        ).toBeTruthy();
      });
    });
  });
});
