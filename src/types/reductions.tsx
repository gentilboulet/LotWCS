import * as constants from '../constants/reductions';

export interface IReductionSkill {
  type: constants.REDUCTION_SKILL;
  skills: string[];
  value: number;
}

export type IReduction =
  IReductionSkill;

/* tslint:disable:no-any */
export function isReduction(r: any): boolean {
  switch (r.type) {
    case constants.REDUCTION_SKILL: return true;
    default:
      return false;
  }
}
