import * as Immutable from 'immutable';
import { makeTypedFactory } from 'typed-immutable-record';

import {
  defaultChiFactory,
  IStoreKungFu, 
  IStoreLoresheet, IStoreLoresheetOption,
  IStoreSkill, IStoreSkillSpeciality,
  IStoreState, IStoreStateJS,
  skillFactory,
} from '../types/state';

import { resetToInitialState } from '../actions/initial';

import { IAction } from '../types/actions';

import { IDataSkill, skills } from '../data/skills';

export const defaultStateJS: IStoreStateJS = {
  name: 'No Name',
  concept: 'No Concept',
  archetype: '',
  archetypeModified: false,
  rank: '',
  rankValue: -1,
  rankModified: false,
  entanglement: 0,
  destiny: 0,
  skills: Immutable.List<IStoreSkill>(skills.map((s: IDataSkill) => {
    return skillFactory({
      name: s.name,
      value: 0,
    });
  })),
  skillSpecialities: Immutable.List<IStoreSkillSpeciality>([]),
  loresheets: Immutable.List<IStoreLoresheet>([]),
  loresheetOptions: Immutable.List<IStoreLoresheetOption>([]),
  discounts: Immutable.List([]),
  bonuses: Immutable.List([]),
  history: Immutable.List<IAction>([resetToInitialState()]),
  chi: defaultChiFactory(),
  externalKungFus: Immutable.List<IStoreKungFu>([]),
  internalKungFus: Immutable.List<IStoreKungFu>([]),
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultStateJS);
