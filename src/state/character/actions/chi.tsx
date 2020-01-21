import { createAction } from "typesafe-actions";
import { TChiName } from "../../../data/chi";
import { ICost } from "../models/costs";

export const chiBuy = createAction(
  "chi/BUY",
  action => (chi: TChiName, value: number, cost: ICost) => {
    return action({ chi, value, cost });
  }
);
