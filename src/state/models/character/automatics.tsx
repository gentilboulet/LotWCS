import { ICharacterState } from "./index";

import * as dataLoresheet from "../../../data/loresheets";
import {
  IAutomaticCondition,
  isAutomaticCondition,
} from "../../../perks/automatics";
import * as constants from "../../../perks/constants/automatics";

import { getSkill } from "./skills";

export type TAutomaticsState = IAutomaticCondition[];

export function createState(): TAutomaticsState {
  return getAutomatics();
}

export function isAutomaticConditionChanged(
  oldState: ICharacterState,
  newState: ICharacterState,
) {
  if (oldState.archetype !== newState.archetype) {
    return true;
  }
  if (oldState.skills !== newState.skills) {
    return true;
  }
  return false;
}

export function getAutomatics(): IAutomaticCondition[] {
  const retval: IAutomaticCondition[] = [];

  {
    const data = dataLoresheet
      .getLoresheets(ls => ls.perks !== undefined)
      .map(ls => (!ls.perks ? [] : ls.perks))
      .filter(p => isAutomaticCondition(p))
      .reduce(
        (acc: IAutomaticCondition[], val: IAutomaticCondition[]) =>
          acc.concat(val),
        [],
      ) as IAutomaticCondition[];

    retval.push(...data);
  }

  return retval;
}

export function isApplicable(
  state: ICharacterState,
  auto: IAutomaticCondition,
): boolean {
  switch (auto.type) {
    case constants.AUTO_CONDITION_ARCHETYPE:
      return auto.archetype === state.archetype;
    case constants.AUTO_CONDITION_SKILL:
      return auto.value >= getSkill(state.skills, auto.skill).value;
  }
  // return false;
}
