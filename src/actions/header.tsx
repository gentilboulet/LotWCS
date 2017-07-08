import * as constants from '../constants/header';
import { IPerk } from '../types/perks';
import { IDataRank } from '../types/ranks';
import { ranks } from '../data/ranks';

export interface IHeaderSetName {
  type: constants.HEADER_SET_NAME;
  name: string;
}

export interface IHeaderSetConcept {
  type: constants.HEADER_SET_CONCEPT;
  concept: string;
}

export interface IHeaderSetArchetype {
  type: constants.HEADER_SET_ARCHETYPE;
  archetype: string;
}

export interface IHeaderSetRank {
  type: constants.HEADER_SET_RANK;
  rank: string;
  value: number;
  perks: IPerk[];
}

export type IHeaderAction = IHeaderSetName | IHeaderSetConcept | IHeaderSetArchetype | IHeaderSetRank;

export function headerSetName(s: string): IHeaderSetName {
  return {
    type: constants.HEADER_SET_NAME,
    name: s
  };
}

export function headerSetConcept(s: string): IHeaderSetConcept {
  return {
    type: constants.HEADER_SET_CONCEPT,
    concept: s
  };
}

export function headerSetArchetype(s: string): IHeaderSetArchetype {
  return {
    type: constants.HEADER_SET_ARCHETYPE,
    archetype: s
  };
}
/* tslint:disable:no-console */
export function headerSetRank(rank: string): IHeaderSetRank {
  const foundRank = ranks.find((rk: IDataRank) => { return rk.key === rank; });
  if (! foundRank ) { throw 'Unknown rank "' + rank + '"'; }
  return {
    type: constants.HEADER_SET_RANK,
    rank: rank,
    value: foundRank.value,
    perks: foundRank.perks as IPerk[],
  };
}
