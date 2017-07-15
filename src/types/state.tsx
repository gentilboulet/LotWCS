import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from '../types/actions';
import { IReduction } from '../types/reductions';
import { IBonus } from '../types/bonuses';

// Used as an object, not needed as an immutable map
export interface IStoreSkillSpecialityJS {
  name: string;
  bought: boolean;
}

export interface IStoreSkillJS {
  name: string;
  value: number;
  specialities: Immutable.List<IStoreSkillSpecialityJS>;
}

export interface IStoreSkill extends TypedRecord<IStoreSkill>, IStoreSkillJS {}

export function skillFactory(s: IStoreSkillJS): IStoreSkill {
  const defaultSkill = { name: 'error', value: NaN,
    specialities: Immutable.List<IStoreSkillSpecialityJS>() };
  const f = makeTypedFactory<IStoreSkillJS, IStoreSkill>(defaultSkill);
  return f(s);
}

export interface IStoreLoresheetOptionJS { uid: string; }

export interface IStoreLoresheetsJS {
  uid: string;
  options: Immutable.List<IStoreLoresheetOptionJS>;
}

export interface IStoreLoresheets extends TypedRecord<IStoreLoresheets>, IStoreLoresheetsJS {}

export function loresheetFactory(ls: IStoreLoresheetsJS): IStoreLoresheets {
  const defaultLS = { uid: '', options: Immutable.List<IStoreLoresheetsJS>() };
  const f = makeTypedFactory<IStoreLoresheetsJS, IStoreLoresheets>(defaultLS);
  return f(ls);
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
  skills: Immutable.List<IStoreSkill>;
  loresheets: Immutable.List<IStoreLoresheetsJS>;
  reductions: Immutable.List<IReduction>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
