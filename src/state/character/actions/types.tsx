import { ActionType } from "typesafe-actions";

import * as chi from "./chi";
import * as cost from "./costs";
import * as header from "./header";
import * as kungfu from "./kungfu";
import * as loresheets from "./loresheets";
import * as perks from "./perks";
import * as skills from "./skills";
import * as virtues from "./virtues";

export type ICharacterAction =
  | ActionType<typeof chi>
  | ActionType<typeof cost>
  | ActionType<typeof header>
  | ActionType<typeof kungfu>
  | ActionType<typeof loresheets>
  | ActionType<typeof perks>
  | ActionType<typeof skills>
  | ActionType<typeof virtues>;
