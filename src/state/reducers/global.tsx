import { IAction } from "../../state/actions/types";
import { IStoreState } from "../../state/type";

// Sub Reducers
import * as header from "../../state/constants/header";
import { headerReducer } from "../../state/reducers/header";

import * as chi from "../../state/constants/chi";
import { chiReducer } from "../../state/reducers/chi";

import * as initial from "../../state/constants/initial";
import { initialStateFactory } from "../../state/initial";

import * as kungfu from "../../state/constants/kungfu";
import { kungfuReducer } from "../../state/reducers/kungfu";

import * as history from "../../state/constants/history";
import { historyReducer } from "../../state/reducers/history";

import * as skills from "../../state/constants/skills";
import { skillsReducer } from "../../state/reducers/skills";

import * as loresheets from "../../state/constants/loresheets";
import { loresheetsReducer } from "../../state/reducers/loresheets";

import * as virtues from "../../state/constants/virtues";
import { virtuesReducer } from "../../state/reducers/virtues";

export function globalReducer(
  state: IStoreState | undefined,
  action: IAction
): IStoreState {
  if (!state) {
    return globalReducer(initialStateFactory(), action);
  }
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
    case kungfu.KUNGFU_OPEN_STYLE:
    case kungfu.KUNGFU_CUSTOM_NAME_FOR_STYLE:
    case kungfu.KUNGFU_CUSTOM_NAME_FOR_TECHNIQUE:
    case kungfu.KUNGFU_BUY_TECHNIQUE:
      return kungfuReducer(state, action);
    case skills.SKILLS_BUY:
    case skills.SKILLS_SPECIALITY_BUY:
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
