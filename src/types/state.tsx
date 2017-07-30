import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from '../types/actions';
import { IDiscount } from '../types/discounts';
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

export interface IStoreLoresheetJS {
  uid: string;
  options: Immutable.List<IStoreLoresheetOptionJS>;
}

export interface IStoreLoresheet extends TypedRecord<IStoreLoresheet>, IStoreLoresheetJS {}

export function loresheetFactory(ls: IStoreLoresheetJS): IStoreLoresheet {
  const defaultLS = { uid: 'error', options: Immutable.List<IStoreLoresheetOption>() };
  const f = makeTypedFactory<IStoreLoresheetJS, IStoreLoresheet>(defaultLS);
  return f(ls);
}

export interface IStoreLoresheetOptionJS { uid: string; }

export interface IStoreLoresheetOption extends TypedRecord<IStoreLoresheetOption>, IStoreLoresheetOptionJS {}

export function loresheetOptionFactory(option: IStoreLoresheetOptionJS): IStoreLoresheetOption {
  const defaultOpt = { uid: 'error' };
  const f = makeTypedFactory<IStoreLoresheetOptionJS, IStoreLoresheetOption>(defaultOpt);
  return f(option);
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
  loresheets: Immutable.List<IStoreLoresheet>;
  discounts: Immutable.List<IDiscount>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
