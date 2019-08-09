import * as constants from "../constants/header";

import * as dataArchetypes from "../../data/archetypes";
import * as dataRanks from "../../data/ranks";

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

export type IHeaderAction =
  | IHeaderSetName
  | IHeaderSetConcept
  | IHeaderSetArchetype
  | IHeaderSetRank;

export function setName(name: string): IHeaderSetName {
  return { type: constants.HEADER_SET_NAME, name };
}

export function setConcept(concept: string): IHeaderSetConcept {
  return { type: constants.HEADER_SET_CONCEPT, concept };
}

export function setArchetype(archetype: string): IHeaderSetArchetype {
  dataArchetypes.validateArchetype(archetype);
  return { archetype, type: constants.HEADER_SET_ARCHETYPE };
}

export function setRank(rank: string): IHeaderSetRank {
  dataRanks.validateRank(rank);
  return { rank, type: constants.HEADER_SET_RANK };
}
