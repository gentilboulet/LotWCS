import { produce, Draft } from "immer";
import { isActionOf } from "typesafe-actions";

import { ICharacterAction } from "../../actions/character";
import { ICharacterState } from "../../models/character";

// Sub Reducers
import { chiReducer } from "./chi";
import { costReducer } from "./costs";
import { headerReducer } from "./header";
import { kungfuReducer } from "./kungfu";
import { loresheetsReducer } from "./loresheets";
import { perksReducer } from "./perks";
import { skillsReducer } from "./skills";
import { virtuesReducer } from "./virtues";

import * as chi from "../../actions/character/chi";
import * as costs from "../../actions/character/costs";
import * as header from "../../actions/character/header";
import * as kungfu from "../../actions/character/kungfu";
import * as loresheets from "../../actions/character/loresheets";
import * as perks from "../../actions/character/perks";
import * as skills from "../../actions/character/skills";
import * as virtues from "../../actions/character/virtues";

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
