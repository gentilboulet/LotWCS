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
      expect(
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
  it("should return data statistics for a non open style");
  it("should return modified statistics for a style with techniques");
});

describe("Testing canOpenKungFu", () => {
  it("should allow for opening style to an empty state");
  it("should disallow an external style already open");
  it("should disallow an internal style already open");
});

describe("Testing canBuyKungFuTechnique", () => {
  it("should disallow buying any techniques for non opened style");
  it("should allow buying any technique for an external style");
  it(
    "should allow buying techniques in increasing order of level for internal style"
  );
  it(
    "should disallow buying internal technique of an already bought level for a given style"
  );
  it(
    "should allow buying any techniques for an external style whose level  restrictions are lifted"
  );
});
