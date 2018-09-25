import * as Immutable from 'immutable';
import { makeTypedFactory } from 'typed-immutable-record';

import {
  IStoreKungFu,
  IStoreLoresheet, IStoreLoresheetOption,
  IStoreSkill, IStoreSkillSpeciality,
  IStoreState, IStoreStateJS,
  IStoreVirtue,
  skillFactory, virtueFactory
} from './types';

import { ChiState } from 'state/chi';

import { resetToInitialState } from './actions/initial';
import { IAction } from './actions/types';

import * as dataSkills from 'data/skills';
import * as dataVirtues from 'data/virtues';

/* tslint:disable:object-literal-sort-keys */
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
  skills: Immutable.List<IStoreSkill>(dataSkills.skills.map((s: dataSkills.IDataSkill) => {
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
  chi: new ChiState(),
  externalKungFus: Immutable.List<IStoreKungFu>([]),
  internalKungFus: Immutable.List<IStoreKungFu>([]),
  virtues: Immutable.List<IStoreVirtue>(dataVirtues.virtues.map(v => virtueFactory(v.name, v.type)))
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultStateJS);
