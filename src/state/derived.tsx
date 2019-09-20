import { IStoreState } from "./type";

export function chiAura(state: IStoreState): number {
  if (state.rank) {
    return state.rank;
  }
  return 0;
}

export function chiResplenish(state: IStoreState): number {
  if (state.rank) {
    return state.rank;
  }
  return 0;
}

export function lake(state: IStoreState): number {
  if (state.rank) {
    return state.rank + 5;
  }
  return 5;
}

export function river(state: IStoreState): number {
  if (state.rank) {
    return Math.max(1, state.rank);
  }
  return 1;
}

export function joss(state: IStoreState): number {
  if (state.rank) {
    return Math.max(1, state.rank);
  }
  return 1;
}

export function maxSkillBonus(state: IStoreState): number {
  if (state.rank) {
    return Math.max(5, 5 * state.rank);
  }
  return 5;
}
