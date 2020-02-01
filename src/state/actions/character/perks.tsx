import { createAction } from "typesafe-actions";

import { IBonus } from "../../../perks/bonuses";
import { IDiscount } from "../../../perks/discounts";

export const applyBonus = createAction(
  "perks/APPLY_BONUSES",
  (bonuses: IBonus[]) => {
    return { bonuses };
  },
  () => {
    return { skipHistory: true };
  },
)();

export const pushDiscount = createAction(
  "perks/PUSH_DISCOUNTS",
  (discounts: IDiscount[]) => {
    return { discounts };
  },
  () => {
    return { skipHistory: true };
  },
)();
