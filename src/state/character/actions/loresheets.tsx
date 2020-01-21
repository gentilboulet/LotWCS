import { createAction } from "typesafe-actions";

import * as dataLoresheets from "../../../data/loresheets";
import { ICost } from "../models/costs";

export const open = createAction(
  "loresheet/OPEN",
  action => (uid: string, cost: ICost) => {
    dataLoresheets.validateLoresheet(uid);
    return action({ cost, uid });
  }
);

export const buyOption = createAction(
  "loresheet/BUY_OPTION",
  action => (lsUid: string, uid: string, cost: ICost, payload?: string) => {
    dataLoresheets.validateLoresheetOption(lsUid, uid);
    return action({ cost, lsUid, uid, payload });
  }
);
