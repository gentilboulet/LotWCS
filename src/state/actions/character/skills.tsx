import { createAction } from "typesafe-actions";

import { TSkillName } from "../../../data/skills";
import { ICost } from "../../models/character/costs";
import { historyMetaCreator } from "../meta";

export const skillsBuy = createAction(
  "skills/BUY",
  (name: TSkillName, cost: ICost) => ({ cost, name }),
  historyMetaCreator,
)();

export const skillSpecialityBuy = createAction(
  "skills/BUY_SPECIALITY",
  (skill: TSkillName, speciality: string, cost: ICost) => {
    if (speciality.length === 0) {
      throw new Error("Empty speciality");
    }
    return { cost, skill, speciality };
  },
  historyMetaCreator,
)();
