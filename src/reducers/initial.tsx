import { makeTypedFactory } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IStoreStateJS, IStoreState,
  IStoreStateSkillJS, IStoreLoresheetsJS } from '../types/state';

import { resetToInitialState } from '../actions/initial';
import { IAction } from '../types/actions';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

const defaultState: IStoreStateJS = {
  name: 'No Name',
  concept: 'No Concept',
  archetype: '',
  archetypeModified: false,
  rank: '',
  rankValue: -1,
  chi: 0,
  rankModified: false,
  entanglement: 0,
  destiny: 0,
  skills: Immutable.List<IStoreStateSkillJS>(skills.map((s: IDataSkill) => {
    return {
      name: s.name,
      value: 0,
      specialities: Immutable.List<{name: string; bought: boolean; }>(s.specialities.map(
        (spe: string) => { return {name: spe, bought: false}; }
      )),
    };
  })),

  loresheets: Immutable.List<IStoreLoresheetsJS>(),
  reductions: Immutable.List(),
  bonuses: Immutable.List(),

  history: Immutable.List<IAction>([resetToInitialState()]),
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultState);
