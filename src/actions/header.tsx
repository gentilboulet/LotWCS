import * as constants from '../constants/header';

import { archetypes } from '../data/archetypes';
import { ranks } from '../data/ranks';
import { IDataArchetype } from '../types/archetypes';
import { IDataRank } from '../types/ranks';

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
}

export type IHeaderAction = IHeaderSetName | IHeaderSetConcept | IHeaderSetArchetype | IHeaderSetRank;

export function setName(name: string): IHeaderSetName {
  return { type: constants.HEADER_SET_NAME, name };
}

export function setConcept(concept: string): IHeaderSetConcept {
  return { type: constants.HEADER_SET_CONCEPT, concept };
}

export function setArchetype(archetype: string): IHeaderSetArchetype {
  const foundArchetype = archetypes.find((dataArchetype: IDataArchetype) => (dataArchetype.key === archetype) );
  if (! foundArchetype ) { throw new Error('Unknown archetype "' + archetype + '"'); }
  return { archetype, type: constants.HEADER_SET_ARCHETYPE };
}

export function setRank(rank: string): IHeaderSetRank {
  const foundRank = ranks.find((dataRank: IDataRank) => (dataRank.key === rank) );
  if (! foundRank ) { throw new Error('Unknown rank "' + rank + '"'); }
  return { rank, type: constants.HEADER_SET_RANK, value: foundRank.value };
}
