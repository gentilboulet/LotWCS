import { makeTypedFactory } from 'typed-immutable-record';
import { IStoreStateJS, IStoreState } from '../types';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

/* tslint:disable:no-console */

const defaultState: IStoreStateJS = {
  name: 'No Name',
  concept: 'No Concept',
  archetype: '',
  archetypeModified: false,
  rank: '',
  rankModified: false,
  skills: skills.map((s: IDataSkill) => {
    return {
      name: s.name,
      value: 0,
      specialities: []
    };
  }),
};

const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultState);

export const initialState: IStoreState = initialStateFactory();
