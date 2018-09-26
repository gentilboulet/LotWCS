import { IStoreState } from 'state/type';

export function chiAura(state: IStoreState): number | undefined {
  if(state.rank) {
    return state.rank.value;
  }
  return undefined;
}

export function chiResplenish(state: IStoreState): number | undefined{
  if(state.rank) {
    return state.rank.value;
  }
  return undefined;
}

export function lake(state: IStoreState): number | undefined{
  if(state.rank) {
    return state.rank.value + 5;
  }
  return undefined;
}

export function river(state: IStoreState): number | undefined{
  if(state.rank) {
    return  Math.max(1, state.rank.value);
  }
  return undefined;
}

export function joss(state: IStoreState): number | undefined{
  if(state.rank) {
    return  Math.max(1, state.rank.value);
  }
  return undefined;
}

export function maxSkillBonus(state: IStoreState): number | undefined{
  if(state.rank) {
    return  Math.max(5, state.rank.value);
  }
  return undefined;
}
