import { IStoreState, IStoreStateSkillJS, IStoreStateSkillSpecialityJS } from '../types/state';
import { IReduction } from '../types/reductions';
import { ICost, defaultCost } from '../types/costs';
import * as constants from '../constants/reductions';
import * as derived from './derived';

import { ILoresheetsOptionsCostCharacterLoresheetsProps } from '../components/CharacterLoresheets';

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

  if ( (state.get('destiny') - cost.destiny) < 0 ) { return false; }
  if ( (state.get('entanglement') - cost.entanglement) < 0 ) { return false; }

  return true;
}

export function getCostSkill(state: IStoreState, skill: string): ICost {
  const defCost = 2;

  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_SKILL )
      && (r.skills.findIndex((s: string) => { return s === skill; }) >= 0);
    });

  if (idx < 0) {
    return { destiny: defCost, entanglement: 0, reductionIdx: idx, reductionNewValue: 0};
  } else {
    const reduction = state.getIn(['reductions', idx]).value;
    const remainingCost = Math.max(0, defCost - reduction);
    const usedReductionValue = defCost - remainingCost;
    return {
      destiny: remainingCost,
      entanglement: 0,
      reductionIdx: idx,
      reductionNewValue: reduction - usedReductionValue
    };
  }
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

  if ( (state.get('destiny') - cost.destiny) < 0 ) { return false; }
  if ( (state.get('entanglement') - cost.entanglement) < 0 ) { return false; }

  return true;
}

export function getCostSpeciality(state: IStoreState, skill: string, speciality: string): ICost {
  const defCost = 1;

  const idx = state.get('reductions')
    .findIndex((r: IReduction) => {
      return ( r.type === constants.REDUCTION_SKILL )
      && (r.skills.findIndex((s: string) => { return s === skill; }) >= 0);
    });

  if (idx < 0) {
    return { destiny: defCost, entanglement: 0, reductionIdx: idx, reductionNewValue: 0};
  } else {
    const reduction = state.getIn(['reductions', idx]).value;
    const remainingCost = Math.max(0, defCost - reduction);
    const usedReductionValue = defCost - remainingCost;
    return {
      destiny: remainingCost,
      entanglement: 0,
      reductionIdx: idx,
      reductionNewValue: reduction - usedReductionValue
    };
  }
}

export function canOpenLoresheet(state: IStoreState, uid: string, cost: number): boolean {
  return false;
}

export function getCostOpenLoresheet(state: IStoreState, uid: string, cost: number): ICost {
  return defaultCost;
}

function canBuyOptionLoresheet(state: IStoreState, lsUid: string, uid: string, cost: string): boolean {
  return false;
}

export function getCostsArrayBuyOptionLoresheet(
  state: IStoreState, lsUid: string, uid: string, cost: string): ILoresheetsOptionsCostCharacterLoresheetsProps[] {
  return [{originalCost: -1, cost: defaultCost, canBuy: canBuyOptionLoresheet(state, lsUid, uid, cost)}];
}
