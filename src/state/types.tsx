/* tslint:disable:object-literal-sort-keys */
import * as Immutable from 'immutable';
import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';

import { ChiState } from 'state/chi';

import * as dataVirtues from 'data/virtues';

import { IBonus } from 'perks/types/bonuses';
import { IDiscount } from 'perks/types/discounts';
import { IAction } from 'state/actions/types';

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

export interface IStoreKungFuTechniqueJS {
  name: string;
  uid: string;
}

export interface IStoreKungFuTechnique extends TypedRecord<IStoreKungFuTechnique>, IStoreKungFuTechniqueJS {}

export function techniqueFactory(technique: IStoreKungFuTechniqueJS): IStoreKungFuTechnique {
  const defaultTechnique: IStoreKungFuTechniqueJS = { name: 'error', uid: 'error' };
  const f = makeTypedFactory<IStoreKungFuTechniqueJS, IStoreKungFuTechnique>(defaultTechnique);
  return f(technique);
}

export interface IStoreKungFuJS {
  name: string;
  uid: string;
  techniques: Immutable.List<IStoreKungFuTechnique>;
}

export function kungfuFactory(kungfu: IStoreKungFuJS): IStoreKungFu {
  const defaultKungfu: IStoreKungFuJS = { name: 'error', uid: 'error', techniques: Immutable.List() };
  const f = makeTypedFactory<IStoreKungFuJS, IStoreKungFu>(defaultKungfu);
  return f(kungfu);
}

export interface IStoreKungFu extends TypedRecord<IStoreKungFu>, IStoreKungFuJS {}

export interface IStoreVirtueJS {
  name: string;
  type: dataVirtues.IDataVirtueType;
  value: number;
}

export function virtueFactory(name: string, type: dataVirtues.IDataVirtueType): IStoreVirtue {
  const defaultVirtue: IStoreVirtueJS = { name: 'error', type: '' as dataVirtues.IDataVirtueType, value: 0 };
  const f = makeTypedFactory<IStoreVirtueJS, IStoreVirtue>(defaultVirtue);
  return f({name, type, value: 0 });
}

export interface IStoreVirtue extends TypedRecord<IStoreVirtue>, IStoreVirtueJS {}

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
  skills: Immutable.List<IStoreSkill>;
  skillSpecialities: Immutable.List<IStoreSkillSpeciality>;
  loresheets: Immutable.List<IStoreLoresheet>;
  loresheetOptions: Immutable.List<IStoreLoresheetOption>;
  discounts: Immutable.List<IDiscount>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
  chi: ChiState ;
  externalKungFus: Immutable.List<IStoreKungFu>;
  internalKungFus: Immutable.List<IStoreKungFu>;
  virtues: Immutable.List<IStoreVirtue>;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
