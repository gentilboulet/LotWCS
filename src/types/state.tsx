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

interface IStoreChiJS {
  general: number;
  generalCultivation: number;
  wood: number;
  woodCultivation: number;
  fire: number;
  fireCultivation: number;
  earth: number;
  earthCultivation: number;
  water: number;
  waterCultivation: number;
  metal: number;
  metalCultivation: number;
  enlightened: number;
  enlightenedCultivation: number;
  demon: number;
  demonCultivation: number;
}

export type IChiNames = 'general' | 'wood' | 'fire' | 'earth' | 'water' | 'metal' | 'enlightened' | 'demon';
export type IChiCultivations = 'generalCultivation' | 'woodCultivation' | 'fireCultivation' | 'earthCultivation'
  | 'waterCultivation' | 'metalCultivation' | 'enlightenedCultivation' | 'demonCultivation';

export function fromChiToCultivationName(chi: IChiNames): IChiCultivations {
  return chi.concat('Cultivation') as IChiCultivations;
}

export function fromCultivationToChiName(cultivation: IChiCultivations): IChiNames {
  return cultivation.split('Cultivation')[0] as IChiNames;
}

export interface IStoreChi extends TypedRecord<IStoreChi>, IStoreChiJS {}

export function defaultChiFactory(): IStoreChi {
  const defaultChi: IStoreChiJS = {
    general: 0, generalCultivation: 0,
    wood: 0, woodCultivation: 0,
    fire: 0, fireCultivation: 0,
    earth: 0, earthCultivation: 0,
    water: 0, waterCultivation: 0,
    metal: 0, metalCultivation: 0,
    enlightened: 0, enlightenedCultivation: 0,
    demon: 0, demonCultivation: 0
  };

  const f = makeTypedFactory<IStoreChiJS, IStoreChi>(defaultChi);
  return f(defaultChi);
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
  skills: Immutable.List<IStoreSkill>;
  skillSpecialities: Immutable.List<IStoreSkillSpeciality>;
  loresheets: Immutable.List<IStoreLoresheet>;
  loresheetOptions: Immutable.List<IStoreLoresheetOption>;
  discounts: Immutable.List<IDiscount>;
  bonuses: Immutable.List<IBonus>;
  history: Immutable.List<IAction>;
  chi: IStoreChi;
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
