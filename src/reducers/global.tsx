import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';

// Sub Reducers
import * as header from '../constants/header';
import { headerReducer } from '../reducers/header';

import * as initial from '../constants/initial';
import { initialStateFactory } from '../reducers/initial';

import * as history from '../constants/history';
import { historyReducer } from '../reducers/history';

import * as skills from '../constants/skills';
import { skillsReducer } from '../reducers/skills';

import * as loresheets from '../constants/loresheets';
import { loresheetsReducer } from '../reducers/loresheets';

export function globalReducer(state: IStoreState, action: IAction): IStoreState {
  switch (action.type) {
    case header.HEADER_SET_ARCHETYPE:
    case header.HEADER_SET_CONCEPT:
    case header.HEADER_SET_NAME:
    case header.HEADER_SET_RANK:
      return headerReducer(state, action);
    case initial.INITIAL_STATE:
      return initialStateFactory();
    case skills.SKILLS_BUY:
      return skillsReducer(state, action);
    case loresheets.LORESHEET_OPEN:
    case loresheets.LORESHEET_BUY_OPTION:
      return loresheetsReducer(state, action);
    case history.HISTORY_DELETE:
      return historyReducer(state, action);
    default:
      return state;
  }
}
