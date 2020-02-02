import { createAction } from "typesafe-actions";
import { ICost } from "../../models/character/costs";

export const payCost = createAction("character/COST_PAY", (cost: ICost) => {
  return { cost };
})();
