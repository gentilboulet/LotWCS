import { produce, Draft } from "immer";
import { isActionOf } from "typesafe-actions";

import { ICharacterAction } from "../actions/types";
import { ICharacterState } from "../models/type";

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

export const globalReducer = produce(
  (draft: Draft<ICharacterState>, action: ICharacterAction) => {
    if (isActionOf(Object.values(chi), action)) {
      draft.chi = chiReducer(draft.chi, action);
    }
    if (isActionOf(Object.values(costs), action)) {
      costReducer(draft, action);
    }
    if (isActionOf(Object.values(header), action)) {
      headerReducer(draft, action);
    }
    if (isActionOf(Object.values(kungfu), action)) {
      draft.kungfu = kungfuReducer(draft.kungfu, action);
    }
    if (isActionOf(Object.values(loresheets), action)) {
      draft.loresheets = loresheetsReducer(draft.loresheets, action);
    }
    if (isActionOf(Object.values(perks), action)) {
      perksReducer(draft, action);
    }
    if (isActionOf(Object.values(skills), action)) {
      draft.skills = skillsReducer(draft.skills, action);
    }
    if (isActionOf(Object.values(virtues), action)) {
      draft.virtues = virtuesReducer(draft.virtues, action);
    }
  },
);
