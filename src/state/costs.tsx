import { IDiscount, updateDiscounts } from 'state/discounts';
import { IStoreState } from 'state/type';


export interface ICost {
  destiny: number;
  discountIdx?: number;
  discountNewValue?: number;
  entanglement: number;
}

function _costFactory(state: IStoreState, idx: number, cost: number): ICost {
  if (idx === -1) {  return { destiny: cost, entanglement: 0 }; }
  else {
    const discount = state.discounts[idx].value;
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

export const emptyCost: ICost = { destiny: 0, entanglement: 0 };

export function canPayCost(state:IStoreState, cost: ICost): boolean {
  if(state.destiny < cost.destiny ) { return false; }
  if(state.entanglement < cost.entanglement ) { return false; }
  return true;
}

export function applyCost(state: IStoreState, cost: ICost): void {
    state.destiny -= cost.destiny;
    state.entanglement -= cost.entanglement;

    if (state.destiny < 0) { throw new Error('Negative destiny reached'); }
    if (state.entanglement < 0) { throw new Error('Negative entanglement reached'); }
    updateDiscounts(state, cost);

}

import { TSkillName } from 'data/skills';
import { DISCOUNT_SKILL } from 'state/constants/perks/discounts';
export function getCostSkill(state: IStoreState, skillName: TSkillName): ICost {
  const defaultCost = 2;

  const idx = state.discounts.findIndex((d:IDiscount) => {
    if(d.type !== DISCOUNT_SKILL) { return false }
    if(d.skills.length === 0) { return true; } // Any skills
    return -1 !== d.skills.findIndex((s: TSkillName) => s === skillName);
  })

  return _costFactory(state, idx, defaultCost);
}

export function getCostSpeciality(state: IStoreState, skillName: TSkillName, speciality: string): ICost {
  const defaultCost = 1;

  const idx = state.discounts.findIndex((d:IDiscount) => {
    if(d.type !== DISCOUNT_SKILL) { return false }
    if(d.skills.length === 0) { return true; } // Any skills
    return -1 !== d.skills.findIndex((s: TSkillName) => s === skillName);
  })

  return _costFactory(state, idx, defaultCost);
}

import { TChiName } from 'data/chi';
import { DISCOUNT_CHI } from 'state/constants/perks/discounts';
export function getCostChi(state: IStoreState, chiName: TChiName): ICost {
  const defaultCost = state.chi[chiName].value; // TODO cultivation

  const idx = state.discounts.findIndex((d:IDiscount) => {
    if(d.type !== DISCOUNT_CHI) { return false }
    if(d.chis.length === 0) { return true; } // Any chi
    return -1 !== d.chis.findIndex((s: TChiName) => s === chiName);
  })

  return _costFactory(state, idx, defaultCost);
}

export function getCostOpenLoresheet(state: IStoreState, uid: string): ICost {
/*  const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_LORESHEET )
      && (r.uids.findIndex((id: string) => (id === uid)) >= 0);
    });
  return _handleDiscount(state, idx, cost);
*/
  return _costFactory(state, -1, 1);
}

export function getCostBuyLoresheetOption(state: IStoreState, lsUid: string, uid: string): ICost {
  /*const idx = state.get('discounts')
    .findIndex((r: IDiscount) => {
      return ( r.type === constants.DISCOUNT_LORESHEET_OPTION )
      && (r.uids.findIndex(id => { return id.lsUid === lsUid &&
        id.optUid.findIndex(optUid => (optUid === uid)) >= 0; })
      >= 0);
    });
  return _handleDiscount(state, idx, cost);*/
  return _costFactory(state, -1, 1);
}

/*


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

*/

export function getCostVirtue(state: IStoreState, name: string): ICost {
  /*
   DISCOUNT !

  */
  return _costFactory(state, -1, 5);
}

export function getCostKungFuStyle(state: IStoreState, type: any, uid: string): ICost {
  /*
   DISCOUNT !
  */
  return _costFactory(state, -1, 10);
}

export function getCostKungFuTechnique(state: IStoreState, type: any, styleUid: string, uid: string): ICost {
  /*
   DISCOUNT !
  */
  return _costFactory(state, -1, 10);
}
