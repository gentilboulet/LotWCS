import { IStoreState,
  IStoreStateSkillJS, IStoreStateSkillSpecialityJS,
  IStoreLoresheetsJS, IStoreLoresheetOptionJS } from '../types/state';
import { IReduction } from '../types/reductions';
import { ILoresheetOptionPrerequisite } from '../types/loresheets';
import { ICost } from '../types/costs';
import * as constants from '../constants/reductions';
import * as derived from './derived';

import { optionLS } from '../data/loresheets';

// helper functions
function _canHandleCost(state: IStoreState, cost: ICost): boolean {
  if ( (state.get('destiny') - cost.destiny) < 0 ) { return false; }
  if ( (state.get('entanglement') - cost.entanglement) < 0 ) { return false; }
  return true;
}

function _handleReduction(state: IStoreState, idx: number, cost: number): ICost {
  if (idx === -1) {
    return { destiny: cost, entanglement: 0, reductionIdx: idx, reductionNewValue: 0};
  } else {
    const reduction = state.getIn(['reductions', idx]).value;
    const remainingCost = Math.max(0, cost - reduction);
    const usedReductionValue = cost - remainingCost;
    return {
      destiny: remainingCost,
      entanglement: 0,
      reductionIdx: idx,
      reductionNewValue: reduction - usedReductionValue
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
  const skills: IStoreStateSkillJS[] = state.get('skills');
  const idx = skills.findIndex((s: IStoreStateSkillJS) => { return s.name === skill; });
  const stateSkill: IStoreStateSkillJS = state.getIn(['skills', idx]);
  if ( (stateSkill.value + 5) > derived.maxSkillBonus(state) ) { return false; }
  const cost = getCostSkill(state, skill);
  return _canHandleCost(state, cost);
}

export function getCostSkill(state: IStoreState, skill: string): ICost {
  const defCost = 2;

  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_SKILL )
      && (r.skills.findIndex((s: string) => { return s === skill; }) >= 0);
    });

  return _handleReduction(state, idx, defCost);
}

export function canBuySpeciality(state: IStoreState, skill: string, speciality: string): boolean {
  const skills: IStoreStateSkillJS[] = state.get('skills');
  const skillIdx = skills.findIndex((s: IStoreStateSkillJS) => { return s.name === skill; });
  const stateSkill: IStoreStateSkillJS = state.getIn(['skills', skillIdx]);
  const specialityIdx = stateSkill.specialities
    .findIndex((spe: IStoreStateSkillSpecialityJS) => { return spe.name === speciality; });

  const stateSpeciality: IStoreStateSkillSpecialityJS =
    stateSkill.specialities.getIn([specialityIdx]);

  if ( specialityIdx < 0 || stateSpeciality.bought ) { return false; }

  const cost = getCostSpeciality(state, skill, speciality);
  return _canHandleCost(state, cost);
}

export function getCostSpeciality(state: IStoreState, skill: string, speciality: string): ICost {
  const defCost = 1;

  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_SKILL )
      && (r.skills.findIndex((s: string) => { return s === skill; }) >= 0);
    });

  return _handleReduction(state, idx, defCost);
}

export function canOpenLoresheet(state: IStoreState, uid: string, openCost: number): boolean {
  const idx = state.get('loresheets').findIndex((ls: IStoreLoresheetsJS) => { return ls.uid === uid; });
  if (idx !== -1) { return false; } // Already opened
  const cost: ICost = getCostOpenLoresheet(state, uid, openCost);
  return _canHandleCost(state, cost);
}

export function getCostOpenLoresheet(state: IStoreState, uid: string, cost: number): ICost {
  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_LORESHEET )
      && (r.uids.findIndex((id: string) => { return id === uid; }) >= 0);
    });
  return _handleReduction(state, idx, cost);
}

export function canBuyOptionLoresheet(state: IStoreState, lsUid: string, uid: string, buyCost: number): boolean {
  const idxLS = state.get('loresheets').findIndex((ls: IStoreLoresheetsJS) => { return ls.uid === lsUid; });
  if (idxLS === -1) { return false; } // LS not open

  const dataOpt = optionLS(lsUid, uid);
  const stateOpts = state.getIn(['loresheets', idxLS]).options;

  const idxOpt = stateOpts.findIndex((o: IStoreLoresheetOptionJS) => { return o.uid === uid; });

  if (idxOpt === -1 && !dataOpt.repeatable) { return false; } // Already bought & not repeatable
  if (dataOpt.prerequisites.filter( // filter checked prereqs
      (p: ILoresheetOptionPrerequisite) => {
        if (typeof p === 'string') {
          return stateOpts.findIndex((o: IStoreLoresheetOptionJS) => { return o.uid === p; }) !== -1;
        } else if ( p.type === 'OR' ) {
          return p.prerequisites.filter((i: string) => {
            return stateOpts.findIndex((o: IStoreLoresheetOptionJS) => { return o.uid === i; }) !== -1;
          }).length > 0;
        } else if ( p.type === 'AND') {
          return p.prerequisites.filter((i: string) => {
            return stateOpts.findIndex((o: IStoreLoresheetOptionJS) => { return o.uid === i; }) !== -1;
          }).length === p.prerequisites.length;
        }
        return false;
      }
    ).length !== dataOpt.prerequisites.length ) { return false; } // prereqs not cleared

  const cost: ICost = getCostBuyOptionLoresheet(state, lsUid, uid, buyCost);
  return _canHandleCost(state, cost);
}

export function getCostBuyOptionLoresheet(state: IStoreState, lsUid: string, uid: string, cost: number): ICost {
  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_LORESHEET_OPTION )
      && (r.uids.findIndex(id => { return id.lsUid === lsUid &&
        id.optUid.findIndex(optUid => { return optUid === uid; }) >= 0; })
      >= 0);
    });
  return _handleReduction(state, idx, cost);
}
