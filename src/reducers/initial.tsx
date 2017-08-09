import * as Immutable from 'immutable';
import { makeTypedFactory } from 'typed-immutable-record';

import {
  defaultChiFactory,
  IStoreKungFu,
  IStoreLoresheet, IStoreLoresheetOption,
  IStoreSkill, IStoreSkillSpeciality,
  IStoreState, IStoreStateJS,
  IStoreVirtue,
  skillFactory, virtueFactory
} from '../state/types';

import { resetToInitialState } from '../actions/initial';

import { IAction } from '../actions/types';

import * as dataSkills from '../data/skills';
import * as dataVirtues from '../data/virtues';

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
  chi: defaultChiFactory(),
  externalKungFus: Immutable.List<IStoreKungFu>([]),
  internalKungFus: Immutable.List<IStoreKungFu>([]),
  virtues: Immutable.List<IStoreVirtue>(dataVirtues.virtues.map(v => virtueFactory(v.name, v.type)))
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultStateJS);
