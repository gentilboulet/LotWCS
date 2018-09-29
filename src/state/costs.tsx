import { IStoreState } from 'state/type';

import { TSkillName } from 'data/skills';

export interface ICost {
  destiny: number;
  discountIdx?: number;
  discountNewValue?: number;
  entanglement: number;
}

function _costFactory(destiny: number, entanglement: number): ICost {
  return { destiny, entanglement };
}

export const emptyCost: ICost = _costFactory(0, 0);

export function canPayCost(state:IStoreState, cost: ICost): boolean {
  if(state.destiny < cost.destiny ) { return false; }
  if(state.entanglement < cost.entanglement ) { return false; }
  return true;
}

export function getCostSkill(state: IStoreState, skillName: TSkillName): ICost {
  const defaultCost = 2;
/*
    const idx = state.get('discounts')
      .findIndex((r: IDiscount) => {
        return ( r.type === constants.DISCOUNT_SKILL )
        && (r.skills.findIndex((s: string) => (s === skill) ) >= 0);
      });

    return _handleDiscount(state, idx, defCost);
  }
*/
  return _costFactory(defaultCost, 0);
}

/*
export function applyCost(baseState: IStoreState, cost: ICost): IStoreState {
    state.set('destiny', state.get('destiny') - cost.destiny);
    state.set('entanglement', state.get('entanglement') - cost.entanglement);

    if (state.get('destiny') < 0) { throw new Error('Negative destiny reached'); }
    if (state.get('entanglement') < 0) { throw new Error('Negative entanglement reached'); }
    updateDiscounts(state, cost);
  });
  return baseState;
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

export function canBuySpeciality(state: IStoreState, skill: string, speciality: string): boolean {
  const specialityIdx = state.get('skills').getSpecialityIndex(state, skill, speciality);

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
*/
