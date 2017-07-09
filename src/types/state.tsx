import { TypedRecord } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from '../types/actions';
import { IReduction } from '../types/reductions';
import { IBonus } from '../types/bonuses';

export interface IStoreStateSkillSpecialityJS {
  name: string;
  bought: boolean;
}

export interface IStoreStateSkillJS {
  name: string;
  value: number;
  specialities: Immutable.List<IStoreStateSkillSpecialityJS>;
}

export interface IStoreLoresheetsJS {
  name: string;
  bonus: Immutable.List<string>;
}

export interface IStoreStateJS {
  name: string;
  concept: string;
  archetype: string;
  archetypeModified: boolean;
  rank: string;
  rankValue: number;
  rankModified: boolean;
  entanglement: number;
  destiny: number;
  chi: number;
  skills: Immutable.List<IStoreStateSkillJS>;
  loresheets: Immutable.List<IStoreLoresheetsJS>;
  reductions: Immutable.List<IReduction>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
