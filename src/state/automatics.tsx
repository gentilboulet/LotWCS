import { IStoreState } from "./type";

import { IAutomaticCondition, isAutomaticCondition } from "../perks/automatics";
import * as constants from "../perks/constants/automatics";

import * as dataLoresheet from "../data/loresheets";

export function isAutomaticConditionChanged(
  oldState: IStoreState,
  newState: IStoreState
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
      .map(p => isAutomaticCondition(p))
      .flat();
    retval.push(...data);
  }

  return retval;
}

export function isApplicable(
  state: IStoreState,
  auto: IAutomaticCondition
): boolean {
  switch (auto.type) {
    case constants.AUTO_CONDITION_ARCHETYPE:
      return auto.archetype === state.archetype;
    case constants.AUTO_CONDITION_SKILL:
      return auto.value >= state.skills[auto.skill].value;
  }
  return false;
}
