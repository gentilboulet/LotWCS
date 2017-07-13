import * as constants from '../constants/reductions';

export interface IReductionSkill {
  type: constants.REDUCTION_SKILL;
  skills: string[];
  value: number;
}

export interface IReductionLoresheet {
  type: constants.REDUCTION_LORESHEET;
  uids: string[];
  value: number;
}

export interface IReductionLoresheetOption {
  type: constants.REDUCTION_LORESHEET_OPTION;
  uids: { lsUid: string , optUid: string[]; }[];
  value: number;
}

export type IReduction =
  IReductionSkill
  | IReductionLoresheet
  | IReductionLoresheetOption;

/* tslint:disable:no-any */
export function isReduction(r: any): boolean {
  switch (r.type) {
    case constants.REDUCTION_SKILL:
    case constants.REDUCTION_LORESHEET:
    case constants.REDUCTION_LORESHEET_OPTION:
      return true;
    default:
      return false;
  }
}
