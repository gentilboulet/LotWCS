import * as constants from '../constants/header';

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

export function headerSetRank(s: string): IHeaderSetRank {
  return {
    type: constants.HEADER_SET_RANK,
    rank: s
  };
}
