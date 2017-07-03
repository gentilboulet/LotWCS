import { TypedRecord } from 'typed-immutable-record';
import { IAction } from './actions';

export interface IStoreStateSkillJS {
  name: string;
  value: number;
  specialities: string[];
}

export interface IStoreStateJS {
  name: string;
  concept: string;
  archetype: string;
  archetypeModified: boolean;
  rank: string;
  rankModified: boolean;
  skills: IStoreStateSkillJS[];
  history: IAction[];
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
