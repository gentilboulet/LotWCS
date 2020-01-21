import { ActionType } from "typesafe-actions";

import * as chi from "../actions/chi";
import * as header from "../actions/header";
import * as history from "../actions/history";
import * as kungfu from "../actions/kungfu";
import * as loresheets from "../actions/loresheets";
import * as skills from "../actions/skills";
import * as virtues from "../actions/virtues";

export type IAction =
  | ActionType<typeof chi>
  | ActionType<typeof header>
  | ActionType<typeof history>
  | ActionType<typeof kungfu>
  | ActionType<typeof loresheets>
  | ActionType<typeof skills>
  | ActionType<typeof virtues>;
