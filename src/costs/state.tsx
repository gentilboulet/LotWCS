import { ICost } from 'costs/types';
import { IDiscount } from 'perks/types/discounts';
import { IStoreState } from 'state/types';

import * as constants from 'perks/constants/discounts';
import * as dataLoresheets from 'data/loresheets';
import * as loresheets from 'state/loresheets';
import * as skills from 'state/skills';

import * as derived from 'state/derived';

// helper functions
function _canHandleCost(state: IStoreState, cost: ICost): boolean {
  if ( (state.get('destiny') - cost.destiny) < 0 ) { return false; }
  if ( (state.get('entanglement') - cost.entanglement) < 0 ) { return false; }
  return true;
}

function _handleDiscount(state: IStoreState, idx: number, cost: number): ICost {
  if (idx === -1) {
    return { destiny: cost, discountIdx: idx, discountNewValue: 0, entanglement: 0, };
  } else {
    const discount = state.getIn(['discounts', idx]).value;
    const remainingCost = Math.max(0, cost - discount);
    const usedDiscountValue = cost - remainingCost;
    return {
      destiny: remainingCost,
      discountIdx: idx,
      discountNewValue: discount - usedDiscountValue,
      entanglement: 0,
    };
  }
}

/*
  Export canBuy and getCost for some actions. Available :
    canBuySkill
    getCostSkill
    canBuySpeciality
    getCostSpeciality
    canOpenLoresheet
    getCostOpenLoresheet
    canBuyOptionLoresheet
    getCostsArrayBuyOptionLoresheet
 */

export function canBuySkill(state: IStoreState, skill: string): boolean {
  const value = skills.getSkillValue(state, skill);
  if ( (value + 5) > derived.maxSkillBonus(state) ) { return false; }
  const cost = getCostSkill(state, skill);
  return _canHandleCost(state, cost);
}

export function getCostSkill(state: IStoreState, skill: string): ICost {
  const defCost = 2;

  const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_SKILL )
      && (r.skills.findIndex((s: string) => (s === skill) ) >= 0);
    });

  return _handleDiscount(state, idx, defCost);
}

export function canBuySpeciality(state: IStoreState, skill: string, speciality: string): boolean {
  const specialityIdx = skills.getSpecialityIndex(state, skill, speciality);

  if ( specialityIdx < 0 ) { return false; }

  const cost = getCostSpeciality(state, skill, speciality);
  return _canHandleCost(state, cost);
}

export function getCostSpeciality(state: IStoreState, skill: string, speciality: string): ICost {
  const defCost = 1;

  const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_SKILL )
        && (r.skills.findIndex((s: string) => (s === skill)) >= 0);
    });

  return _handleDiscount(state, idx, defCost);
}

export function canOpenLoresheet(state: IStoreState, uid: string, openCost: number): boolean {
  const idx = loresheets.getLoresheetIndex(state, uid);
  if (idx !== -1) { return false; } // Already opened
  const cost: ICost = getCostOpenLoresheet(state, uid, openCost);
  return _canHandleCost(state, cost);
}

export function getCostOpenLoresheet(state: IStoreState, uid: string, cost: number): ICost {
  const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_LORESHEET )
      && (r.uids.findIndex((id: string) => (id === uid)) >= 0);
    });
  return _handleDiscount(state, idx, cost);
}

export function canBuyOptionLoresheet(state: IStoreState, lsUid: string, uid: string, buyCost: number): boolean {
  if ( loresheets.getLoresheetIndex(state, lsUid) === -1) { return false; } // LS not open

  const dataOpt = dataLoresheets.optionLS(lsUid, uid);
  const idxOpt = loresheets.getLoresheetOptionIndex(state, lsUid, uid);

  if (idxOpt === -1 && !dataOpt.repeatable) { return false; } // Already bought & not repeatable

  if (dataOpt.prerequisites.filter( // filter checked prereqs
      (p: dataLoresheets.IDataLoresheetOptionPrerequisite) => {
        if (typeof p === 'string') {
          return loresheets.getLoresheetOptionIndex(state, lsUid, p) !== -1;
        } else if ( p.type === 'OR' ) {
          return p.prerequisites
            .filter(
              (prerequisiteUid: string) => (loresheets.getLoresheetOptionIndex(state, lsUid, prerequisiteUid) !== -1)
            ).length > 0;
        } else if ( p.type === 'AND') {
          return p.prerequisites
            .filter(
              (prerequisiteUid: string) => (loresheets.getLoresheetOptionIndex(state, lsUid, prerequisiteUid) !== -1)
            ).length === p.prerequisites.length;
        }
        return false;
      }
    ).length !== dataOpt.prerequisites.length ) { return false; } // prereqs not cleared

  const cost: ICost = getCostBuyOptionLoresheet(state, lsUid, uid, buyCost);
  return _canHandleCost(state, cost);
}

export function getCostBuyOptionLoresheet(state: IStoreState, lsUid: string, uid: string, cost: number): ICost {
  const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_LORESHEET_OPTION )
      && (r.uids.findIndex(id => { return id.lsUid === lsUid &&
        id.optUid.findIndex(optUid => (optUid === uid)) >= 0; })
      >= 0);
    });
  return _handleDiscount(state, idx, cost);
}
