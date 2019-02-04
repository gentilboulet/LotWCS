import { getDiscountIndexes, IDiscount, updateDiscounts } from "./discounts";
import { IStoreState } from "./type";

export interface ICost {
  canPay: boolean;
  destiny: number;
  discounts?: Array<{
    idx: number;
    newValue: number;
  }>;
  original: number;
}

export const zeroCost: ICost = {
  canPay: true,
  destiny: 0,
  original: 0
};
export function _costFactory(
  state: IStoreState,
  costValue: number,
  discountIdx?: number[]
): ICost {
  if (discountIdx) {
    let remainingCost = costValue;
    const discounts = discountIdx.map((idx: number) => {
      const stateDiscount: IDiscount = state.discounts[idx];
      const effectiveDiscount = Math.min(remainingCost, stateDiscount.value);
      const newValue = stateDiscount.value - effectiveDiscount;
      remainingCost -= effectiveDiscount;
      return { idx, newValue };
    });
    return {
      canPay: state.destiny >= remainingCost,
      destiny: remainingCost,
      discounts,
      original: costValue
    };
  } else {
    return {
      canPay: state.destiny >= costValue,
      destiny: costValue,
      original: costValue
    };
  }
}

export function applyCost(state: IStoreState, cost: ICost): void {
  if (!cost.canPay) {
    throw new Error("Unpayable cost");
  }
  state.destiny -= cost.destiny;
  // state.entanglement -= cost.entanglement;

  if (state.destiny < 0) {
    throw new Error("Negative destiny reached");
  }
  // if (state.entanglement < 0) {
  //   throw new Error("Negative entanglement reached");
  // }
  updateDiscounts(state, cost);
}

import { TSkillName } from "../data/skills";
import { DISCOUNT_SKILL } from "./constants/perks/discounts";
export function getCostSkill(state: IStoreState, skillName: TSkillName): ICost {
  const defaultCost = 2;

  const skillDiscountIdx = getDiscountIndexes(state, (d: IDiscount) => {
    if (d.type !== DISCOUNT_SKILL) {
      return false;
    }
    if (d.skills.length === 0) {
      return true;
    }
    return -1 !== d.skills.findIndex((s: TSkillName) => s === skillName);
  });
  return _costFactory(state, defaultCost, skillDiscountIdx);
}

export function getCostSpeciality(state: IStoreState): ICost {
  const defaultCost = 2;
  return _costFactory(state, defaultCost, []);
}

import { TChiName } from "../data/chi";
import { DISCOUNT_CHI } from "./constants/perks/discounts";
export function getCostChi(state: IStoreState, chiName: TChiName): ICost {
  const chiValue = state.chi[chiName].value;
  const chiMultiplicator =
    chiName === "general"
      ? 1
      : chiName === "corrupt" || chiName === "enlightened"
      ? 10
      : 5;
  const expectedCost =
    chiValue < 1 ? chiMultiplicator : chiMultiplicator * chiValue;
  const defaultCost = Math.max(
    0,
    expectedCost - state.chi[chiName].cultivation
  );

  const chiDiscountIdx = getDiscountIndexes(state, (d: IDiscount) => {
    if (d.type !== DISCOUNT_CHI) {
      return false;
    }
    if (d.chis.length === 0) {
      return true;
    }
    return -1 !== d.chis.findIndex((s: TChiName) => s === chiName);
  });
  return _costFactory(state, defaultCost, chiDiscountIdx);
}

import { getLoresheetData } from "../data/loresheets";
import { DISCOUNT_LORESHEET } from "./constants/perks/discounts";
export function getCostOpenLoresheet(state: IStoreState, uid: string): ICost {
  const lsData = getLoresheetData(uid);
  const defaultCost = lsData.cost;

  const lsDiscountIdx = getDiscountIndexes(state, (d: IDiscount) => {
    if (d.type !== DISCOUNT_LORESHEET) {
      return false;
    }
    if (d.uids.length === 0) {
      return true;
    }
    return -1 !== d.uids.findIndex((s: string) => s === uid);
  });
  return _costFactory(state, defaultCost, lsDiscountIdx);
}

import { getLoresheetOptionData } from "../data/loresheets";
import { DISCOUNT_LORESHEET_OPTION } from "./constants/perks/discounts";

function _getCostBuyLoresheetOptionOneCost(
  state: IStoreState,
  lsUid: string,
  uid: string,
  cost: number
): ICost {
  const lsDiscountIdx = getDiscountIndexes(state, (d: IDiscount) => {
    if (d.type !== DISCOUNT_LORESHEET_OPTION) {
      return false;
    }
    if (d.uids.length === 0) {
      return true;
    }

    return (
      -1 !==
      d.uids.findIndex(
        opt =>
          opt.lsUid === lsUid &&
          -1 !== opt.optUid.findIndex(discountOptUid => uid === discountOptUid)
      )
    );
  });
  return _costFactory(state, cost, lsDiscountIdx);
}

export function getCostBuyLoresheetOption(
  state: IStoreState,
  lsUid: string,
  uid: string
): ICost[] {
  const lsData = getLoresheetOptionData(lsUid, uid);
  const defaultCost = lsData.cost;
  if (typeof defaultCost === "number") {
    return [_getCostBuyLoresheetOptionOneCost(state, lsUid, uid, defaultCost)];
  } else {
    const lenght = defaultCost.max - defaultCost.min + 1;
    return Array.from(new Array(lenght).keys())
      .map((v: number) => defaultCost.min + v)
      .map(cost => _getCostBuyLoresheetOptionOneCost(state, lsUid, uid, cost));
  }
}

export function getCostVirtue(state: IStoreState): ICost {
  return _costFactory(state, 5);
}

export function getCostKungFuStyle(state: IStoreState): ICost {
  return _costFactory(state, 10);
}

import { kungfuTechniqueData } from "../data/kungfu";
import {
  IDataExternalKungfuTechnique,
  IDataInternalKungfuTechnique,
  KUNGFU_EXTERNAL,
  KUNGFU_TYPE
} from "../data/kungfu/types";
export function getCostKungFuTechnique(
  state: IStoreState,
  type: KUNGFU_TYPE,
  styleUid: string,
  uid: string
): ICost {
  /*
   DISCOUNT !
  */
  const kfData = kungfuTechniqueData(type, styleUid, uid);
  const defaultCost =
    type === KUNGFU_EXTERNAL
      ? (kfData as IDataExternalKungfuTechnique).cost
      : (kfData as IDataInternalKungfuTechnique).level;

  return _costFactory(state, defaultCost);
}
