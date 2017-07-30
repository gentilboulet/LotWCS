import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IAction } from '../types/actions';
import { IDiscount } from '../types/discounts';
import { IBonus } from '../types/bonuses';

// Used as an object, not needed as an immutable map
export interface IStoreSkillSpecialityJS {
  name: string;
  skill: string;
}

export interface IStoreSkillSpeciality extends TypedRecord<IStoreSkillSpeciality>, IStoreSkillSpecialityJS {}

export function specialityFactory(s: IStoreSkillSpecialityJS): IStoreSkillSpeciality {
  const defaultSpeciality: IStoreSkillSpecialityJS = { name: 'error', skill: 'error' };
  const f = makeTypedFactory<IStoreSkillSpecialityJS, IStoreSkillSpeciality>(defaultSpeciality);
  return f(s);
}

export interface IStoreSkillJS {
  name: string;
  value: number;
}

export interface IStoreSkill extends TypedRecord<IStoreSkill>, IStoreSkillJS {}

export function skillFactory(s: IStoreSkillJS): IStoreSkill {
  const defaultSkill: IStoreSkillJS = { name: 'error', value: NaN };
  const f = makeTypedFactory<IStoreSkillJS, IStoreSkill>(defaultSkill);
  return f(s);
}

export interface IStoreLoresheetJS {
  uid: string;
}

export interface IStoreLoresheet extends TypedRecord<IStoreLoresheet>, IStoreLoresheetJS {}

export function loresheetFactory(ls: IStoreLoresheetJS): IStoreLoresheet {
  const defaultLS: IStoreLoresheetJS = { uid: 'error' };
  const f = makeTypedFactory<IStoreLoresheetJS, IStoreLoresheet>(defaultLS);
  return f(ls);
}

export interface IStoreLoresheetOptionJS { loresheetUid: string; uid: string; }

export interface IStoreLoresheetOption extends TypedRecord<IStoreLoresheetOption>, IStoreLoresheetOptionJS {}

export function loresheetOptionFactory(option: IStoreLoresheetOptionJS): IStoreLoresheetOption {
  const defaultOpt = { loresheetUid: 'error', uid: 'error' };
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
  skillSpecialities: Immutable.List<IStoreSkillSpeciality>;
  loresheets: Immutable.List<IStoreLoresheet>;
  loresheetOptions: Immutable.List<IStoreLoresheetOption>;
  discounts: Immutable.List<IDiscount>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
