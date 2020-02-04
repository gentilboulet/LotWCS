import { createAction } from "typesafe-actions";
import { ICost } from "../../models/character/costs";
import { historyMetaCreator } from "../meta";

export const increase = createAction(
  "virtues/INCREASE",
  (name: string, value: number, cost: ICost) => ({ cost, name, value }),
  historyMetaCreator,
)();
