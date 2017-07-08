import { TypedRecord } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from './actions';

export interface IStoreStateSkillJS {
  name: string;
  value: number;
  specialities: Immutable.List<{name: string; bought: boolean}>;
}

export interface IStoreStateJS {
  name: string;
  concept: string;
  archetype: string;
  archetypeModified: boolean;
  rank: string;
  rankModified: boolean;
  skills: Immutable.List<IStoreStateSkillJS>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
