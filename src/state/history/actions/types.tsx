import { ActionType } from "typesafe-actions";

import * as history from "./history";

export type IHistoryAction = ActionType<typeof history>;
