import { produce } from "immer";
import { isActionOf } from "typesafe-actions";

import { ICharacterAction } from "../actions/types";
import { ICharacterState } from "../models/type";

import { initialStateFactory } from "../models/initial";

// Sub Reducers
import { chiReducer } from "./chi";
import { costReducer } from "./costs";
import { headerReducer } from "./header";
import { kungfuReducer } from "./kungfu";
import { loresheetsReducer } from "./loresheets";
import { perksReducer } from "./perks";
import { skillsReducer } from "./skills";
import { virtuesReducer } from "./virtues";

import * as chi from "../actions/chi";
import * as costs from "../actions/costs";
import * as header from "../actions/header";
import * as kungfu from "../actions/kungfu";
import * as loresheets from "../actions/loresheets";
import * as perks from "../actions/perks";
import * as skills from "../actions/skills";
import * as virtues from "../actions/virtues";

export function isCharacterAction(action: any): ICharacterAction | undefined {
  if (isActionOf(Object.values(chi), action)) {
    return action;
  }
  if (isActionOf(Object.values(costs), action)) {
    return action;
  }
  if (isActionOf(Object.values(header), action)) {
    return action;
  }
  if (isActionOf(Object.values(kungfu), action)) {
    return action;
  }
  if (isActionOf(Object.values(loresheets), action)) {
    return action;
  }
  if (isActionOf(Object.values(perks), action)) {
    return action;
  }
  if (isActionOf(Object.values(skills), action)) {
    return action;
  }
  if (isActionOf(Object.values(virtues), action)) {
    return action;
  }
  return undefined;
}

export function globalReducer(
  state: ICharacterState | undefined,
  action: ICharacterAction,
): ICharacterState {
  if (state === undefined) {
    return globalReducer(initialStateFactory(), action);
  }
  return produce(state, draft => {
    if (isActionOf(Object.values(chi), action)) {
      draft.chi = chiReducer(draft.chi, action);
    }
    if (isActionOf(Object.values(costs), action)) {
      return costReducer(draft, action);
    }
    if (isActionOf(Object.values(header), action)) {
      return headerReducer(draft, action);
    }
    if (isActionOf(Object.values(kungfu), action)) {
      draft.kungfu = kungfuReducer(draft.kungfu, action);
    }
    if (isActionOf(Object.values(loresheets), action)) {
      draft.loresheets = loresheetsReducer(draft.loresheets, action);
    }
    if (isActionOf(Object.values(perks), action)) {
      return perksReducer(draft, action);
    }
    if (isActionOf(Object.values(skills), action)) {
      draft.skills = skillsReducer(draft.skills, action);
    }
    if (isActionOf(Object.values(virtues), action)) {
      draft.virtues = virtuesReducer(draft.virtues, action);
    }
  });
}
