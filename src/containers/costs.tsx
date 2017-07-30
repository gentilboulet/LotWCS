import { ICost } from '../types/costs';
import { IDiscount } from '../types/discounts';
import { ILoresheetOptionPrerequisite } from '../types/loresheets';
import { IStoreSkillJS, IStoreSkillSpecialityJS, IStoreState } from '../types/state';

import * as constants from '../constants/discounts';
import { getLoresheetIndex, getLoresheetOptionIndex } from '../reducers/loresheets';

import * as derived from './derived';

import { optionLS } from '../data/loresheets';

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
  const idx = state.get('skills').findIndex((s: IStoreSkillJS) => (s.name === skill));
  const value = state.getIn(['skills', idx, 'value']);
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
  const specialityIdx = state.getIn(['skillsSpecialities'])
    .findIndex((spe: IStoreSkillSpecialityJS) => (spe.name === speciality && spe.skill === skill));

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
  const idx = getLoresheetIndex(state, uid);
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
  if ( getLoresheetIndex(state, lsUid) === -1) { return false; } // LS not open

  const dataOpt = optionLS(lsUid, uid);
  const idxOpt = getLoresheetOptionIndex(state, lsUid, uid);

  if (idxOpt === -1 && !dataOpt.repeatable) { return false; } // Already bought & not repeatable

  if (dataOpt.prerequisites.filter( // filter checked prereqs
      (p: ILoresheetOptionPrerequisite) => {
        if (typeof p === 'string') {
          return getLoresheetOptionIndex(state, lsUid, p) !== -1;
        } else if ( p.type === 'OR' ) {
          return p.prerequisites
            .filter((prerequisiteUid: string) => (getLoresheetOptionIndex(state, lsUid, prerequisiteUid) !== -1))
            .length > 0;
        } else if ( p.type === 'AND') {
          return p.prerequisites
            .filter((prerequisiteUid: string) => (getLoresheetOptionIndex(state, lsUid, prerequisiteUid) !== -1))
            .length === p.prerequisites.length;
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
