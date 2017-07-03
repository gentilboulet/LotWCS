import { makeTypedFactory } from 'typed-immutable-record';
import { IStoreStateJS, IStoreState } from '../types/state';

import { resetToInitialState } from '../actions/initial';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

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
  history: [resetToInitialState()],
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultState);
