import { TypedRecord } from 'typed-immutable-record';

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
}

export interface IStoreState extends TypedRecord<IStoreState>, IStoreStateJS {}
