import { TypedRecord } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from '../types/actions';

export interface IStoreStateSkillJS {
  name: string;
  value: number;
  specialities: Immutable.List<{name: string; bought: boolean}>;
}

export interface IStoreLoresheetsJS {
  name: string;
  bonus: Immutable.List<string>;
}

export interface ICostReductionJS {
  name: string;
}

export interface IStoreStateJS {
  name: string;
  concept: string;
  archetype: string;
  archetypeModified: boolean;
  rank: string;
  rankModified: boolean;
  skills: Immutable.List<IStoreStateSkillJS>;
  loresheets: Immutable.List<IStoreLoresheetsJS>;
  costReductions: Immutable.List<ICostReductionJS>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
