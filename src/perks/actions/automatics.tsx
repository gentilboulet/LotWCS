import { TSkillName } from "../../data/skills";
import { autoPerks as IPerk } from "../../perks/automatics";
import * as constants from "../constants/automatics";

import {
  IAutomaticArchetypeCondition,
  IAutomaticSkillCondition,
} from "../automatics";

export function conditionalOnSkill(
  skill: TSkillName,
  value: number,
  perks: IPerk[],
): IAutomaticSkillCondition {
  return { type: constants.AUTO_CONDITION_SKILL, skill, value, perks };
}

export function conditionalOnArchetype(
  archetype: string,
  perks: IPerk[],
): IAutomaticArchetypeCondition {
  return { type: constants.AUTO_CONDITION_ARCHETYPE, archetype, perks };
}
