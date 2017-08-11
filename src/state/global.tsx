import { IAction } from 'state/actions/types';
import { IStoreState } from 'state/types';

// Sub Reducers
import * as header from 'constants/header';
import { headerReducer } from 'state/reducers/header';

import * as chi from 'constants/chi';
import { chiReducer } from 'state/reducers/chi';

import * as initial from 'constants/initial';
import { initialStateFactory } from 'state/initial';

import * as kungfus from 'constants/kungfus';
import { kungfuReducer } from 'state/reducers/kungfus';

import * as history from 'constants/history';
import { historyReducer } from 'state/reducers/history';

import * as skills from 'constants/skills';
import { skillsReducer } from 'state/reducers/skills';

import * as loresheets from 'constants/loresheets';
import { loresheetsReducer } from 'state/reducers/loresheets';

import * as virtues from 'constants/virtues';
import { virtuesReducer } from 'state/reducers/virtues';

export function globalReducer(state: IStoreState, action: IAction): IStoreState {
  switch (action.type) {
    case header.HEADER_SET_ARCHETYPE:
    case header.HEADER_SET_CONCEPT:
    case header.HEADER_SET_NAME:
    case header.HEADER_SET_RANK:
      return headerReducer(state, action);
    case chi.CHI_BUY:
      return chiReducer(state, action);
    case initial.INITIAL_STATE:
      return initialStateFactory();
    case kungfus.KUNGFU_OPEN_STYLE:
    case kungfus.KUNGFU_CUSTOM_NAME_FOR_STYLE:
    case kungfus.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    case kungfus.KUNGFU_BUY_TECHNIQUE:
      return kungfuReducer(state, action);
    case skills.SKILLS_BUY:
      return skillsReducer(state, action);
    case loresheets.LORESHEET_OPEN:
    case loresheets.LORESHEET_BUY_OPTION:
      return loresheetsReducer(state, action);
    case history.HISTORY_DELETE:
      return historyReducer(state, action);
    case virtues.VIRTUE_INCREASE:
      return virtuesReducer(state, action);
    default:
      return state;
  }
}
