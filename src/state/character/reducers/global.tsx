import { produce } from "immer";
import { isActionOf } from "typesafe-actions";

import { IAction } from "../../state/actions/types";
import { IStoreState } from "../../state/type";

import { initialStateFactory } from "../../state/initial";

// Sub Reducers
import { chiReducer } from "../../state/reducers/chi";
import { headerReducer } from "../../state/reducers/header";
import { historyReducer } from "../../state/reducers/history";
import { kungfuReducer } from "../../state/reducers/kungfu";
import { loresheetsReducer } from "../../state/reducers/loresheets";
import { skillsReducer } from "../../state/reducers/skills";
import { virtuesReducer } from "../../state/reducers/virtues";

import * as chi from "../actions/chi";
import * as header from "../actions/header";
import * as history from "../actions/history";
import * as kungfu from "../actions/kungfu";
import * as loresheets from "../actions/loresheets";
import * as skills from "../actions/skills";
import * as virtues from "../actions/virtues";

export function globalReducer(
  state: IStoreState | undefined,
  action: IAction
): IStoreState {
  if (!state) {
    return globalReducer(initialStateFactory(), action);
  }

  return produce(state, draftState => {
    if (isActionOf(Object.values(chi), action)) {
      draftState = chiReducer(state, action);
    }
    if (isActionOf(Object.values(header), action)) {
      draftState = headerReducer(state, action);
    }
    if (isActionOf(Object.values(history), action)) {
      draftState = historyReducer(state, action);
    }
    if (isActionOf(Object.values(kungfu), action)) {
      draftState = kungfuReducer(state, action);
    }
    if (isActionOf(Object.values(loresheets), action)) {
      draftState = loresheetsReducer(state, action);
    }
    if (isActionOf(Object.values(skills), action)) {
      draftState = skillsReducer(state, action);
    }
    if (isActionOf(Object.values(virtues), action)) {
      draftState = virtuesReducer(state, action);
    }
    return draftState;
  });
}
