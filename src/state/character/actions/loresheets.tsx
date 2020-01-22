import { createAction } from "typesafe-actions";

import * as dataLoresheets from "../../../data/loresheets";
import { ICost } from "../models/costs";

export const open = createAction(
  "loresheet/OPEN",
  (uid: string, cost: ICost) => {
    dataLoresheets.validateLoresheet(uid);
    return { cost, uid };
  },
)();

export const buyOption = createAction(
  "loresheet/BUY_OPTION",
  (lsUid: string, uid: string, cost: ICost, payload?: string) => {
    dataLoresheets.validateLoresheetOption(lsUid, uid);
    return { cost, lsUid, uid, payload };
  },
)();
