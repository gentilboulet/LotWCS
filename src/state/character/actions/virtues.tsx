import { createAction } from "typesafe-actions";
import { ICost } from "../models/costs";

export const increase = createAction(
  "virtues/INCREASE",
  (name: string, value: number, cost: ICost) => ({ name, value, cost }),
)();
