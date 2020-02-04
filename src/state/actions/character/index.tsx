import { ActionType, isActionOf } from "typesafe-actions";

import * as chi from "./chi";
import * as cost from "./costs";
import * as gear from "./gear";
import * as header from "./header";
import * as kungfu from "./kungfu";
import * as loresheets from "./loresheets";
import * as perks from "./perks";
import * as skills from "./skills";
import * as virtues from "./virtues";

export type ICharacterAction =
  | ActionType<typeof chi>
  | ActionType<typeof cost>
  | ActionType<typeof gear>
  | ActionType<typeof header>
  | ActionType<typeof kungfu>
  | ActionType<typeof loresheets>
  | ActionType<typeof perks>
  | ActionType<typeof skills>
  | ActionType<typeof virtues>;

export const actions = {
  ...chi,
  ...cost,
  ...gear,
  ...header,
  ...kungfu,
  ...loresheets,
  ...perks,
  ...skills,
  ...virtues,
};

export const isCharacterAction = (
  action: any,
): ICharacterAction | undefined => {
  if (isActionOf(Object.values(actions), action)) {
    return action;
  }
  return undefined;
};
