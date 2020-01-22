import { produce } from "immer";
import { isActionOf } from "typesafe-actions";

import { ICharacterAction } from "../actions/types";
import { ICharacterState } from "../models/type";

import { initialStateFactory } from "../models/initial";

// Sub Reducers
import { chiReducer } from "./chi";
import { headerReducer } from "./header";
import { kungfuReducer } from "./kungfu";
import { loresheetsReducer } from "./loresheets";
import { skillsReducer } from "./skills";
import { virtuesReducer } from "./virtues";

import * as chi from "../actions/chi";
import * as header from "../actions/header";
import * as kungfu from "../actions/kungfu";
import * as loresheets from "../actions/loresheets";
import * as skills from "../actions/skills";
import * as virtues from "../actions/virtues";

export function isCharacterAction(action: any): boolean {
  if (isActionOf(Object.values(chi), action)) {
    return true;
  }
  if (isActionOf(Object.values(header), action)) {
    return true;
  }
  if (isActionOf(Object.values(kungfu), action)) {
    return true;
  }
  if (isActionOf(Object.values(loresheets), action)) {
    return true;
  }
  if (isActionOf(Object.values(skills), action)) {
    return true;
  }
  if (isActionOf(Object.values(virtues), action)) {
    return true;
  }
  return false;
}

export function globalReducer(
  state: ICharacterState | undefined,
  action: ICharacterAction,
): ICharacterState {
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

export function playActions(
  state: ICharacterState,
  toPlay: ICharacterAction[],
): ICharacterState {
  return produce(state, draft => {
    let newState = draft;
    toPlay.forEach(action => {
      newState = globalReducer(newState, action);
    });
    return newState;
  });
}
