import { createAction } from "typesafe-actions";
import { ICost } from "../../models/character/costs";
import { TChiName } from "../../../data/chi";
import { historyMetaCreator } from "../meta";

export const chiBuy = createAction(
  "chi/BUY",
  (chi: TChiName, value: number, cost: ICost) => {
    return { cost, chi, value };
  },
  historyMetaCreator,
)();
