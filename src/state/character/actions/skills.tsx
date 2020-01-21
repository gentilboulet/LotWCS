import { createAction } from "typesafe-actions";

import { TSkillName } from "../../../data/skills";
import { ICost } from "../models/costs";

export const skillsBuy = createAction(
  "skills/BUY",
  action => (name: TSkillName, cost: ICost) => action({ cost, name })
);

export const skillSpecialityBuy = createAction(
  "skills/BUY_SPECIALITY",
  action => (skill: TSkillName, speciality: string, cost: ICost) => {
    if (speciality.length === 0) {
      throw new Error("Empty speciality");
    }
    return action({ cost, skill, speciality });
  }
);
