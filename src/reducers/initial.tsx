import { makeTypedFactory } from 'typed-immutable-record';
import * as Immutable from 'immutable';
import { IStoreStateJS, IStoreState,
  IStoreSkill, skillFactory,
  IStoreSkillSpecialityJS,
  IStoreLoresheet } from '../types/state';

import { resetToInitialState } from '../actions/initial';
import { IAction } from '../types/actions';
import { IDataSkill } from '../types/skills';
import { skills } from '../data/skills';

export const defaultStateJS: IStoreStateJS = {
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
  skills: Immutable.List<IStoreSkill>(skills.map((s: IDataSkill) => {
    return skillFactory({
      name: s.name,
      value: 0,
      specialities: Immutable.List<IStoreSkillSpecialityJS>(s.specialities.map(
        (spe: string) => { return {name: spe, bought: false}; }
      )),
    });
  })),

  loresheets: Immutable.List<IStoreLoresheet>([]),
  reductions: Immutable.List([]),
  bonuses: Immutable.List([]),

  history: Immutable.List<IAction>([resetToInitialState()]),
};

export const initialStateFactory = makeTypedFactory<IStoreStateJS, IStoreState>(defaultStateJS);
