import { createAction } from "typesafe-actions";
import { ICost } from "../models/costs";

export const increase = createAction(
  "virtues/INCREASE",
  action => (name: string, value: number, cost: ICost) =>
    action({ name, value, cost }),
);
