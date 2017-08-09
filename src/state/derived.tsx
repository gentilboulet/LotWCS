import { IStoreState } from '../state/types';

export function chiAura(state: IStoreState): number {
  return state.get('rankValue');
}

export function chiResplenish(state: IStoreState): number {
  return state.get('rankValue');
}

export function lake(state: IStoreState): number {
  return 5 + state.get('rankValue');
}

export function river(state: IStoreState): number {
  return Math.max(1, state.get('rankValue'));
}

export function joss(state: IStoreState): number {
  return Math.max(1, state.get('rankValue'));
}

export function maxSkillBonus(state: IStoreState): number {
  return Math.max(5, state.get('rankValue') * 5);
}
