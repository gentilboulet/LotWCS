import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';

// Sub Reducers
import * as header from '../constants/header';
import { headerReducer } from '../reducers/header';

import * as initial from '../constants/initial';
import { initialStateFactory } from '../reducers/initial';

import * as skills from '../constants/skills';
import { skillsReducer } from '../reducers/skills';

/* tslint:disable:no-console */
function doReducer(state: IStoreState, action: IAction): IStoreState {
  switch (action.type) {
    case header.HEADER_SET_ARCHETYPE:
    case header.HEADER_SET_CONCEPT:
    case header.HEADER_SET_NAME:
    case header.HEADER_SET_RANK:
      return headerReducer(state, action);
    case initial.INITIAL_STATE:
      return initialStateFactory();
    case skills.SKILLS_BUY:
    case skills.SKILLS_DO_STUFF:
     return skillsReducer(state, action);
    default:
      return state;
  }
}

export function globalReducer(state: IStoreState, action: IAction): IStoreState {
  const out = doReducer(state, action);
  console.log(out);
  return out;
}
