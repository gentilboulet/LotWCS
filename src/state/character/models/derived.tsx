import { ICharacterState } from "./type";

export function chiAura(state: ICharacterState): number {
  if (state.rank) {
    return state.rank;
  }
  return 0;
}

export function chiResplenish(state: ICharacterState): number {
  if (state.rank) {
    return state.rank;
  }
  return 0;
}

export function lake(state: ICharacterState): number {
  if (state.rank) {
    return state.rank + 5;
  }
  return 5;
}

export function river(state: ICharacterState): number {
  if (state.rank) {
    return Math.max(1, state.rank);
  }
  return 1;
}

export function joss(state: ICharacterState): number {
  if (state.rank) {
    return Math.max(1, state.rank);
  }
  return 1;
}

export function maxSkillBonus(state: ICharacterState): number {
  if (state.rank) {
    return Math.max(5, 5 * state.rank);
  }
  return 5;
}
