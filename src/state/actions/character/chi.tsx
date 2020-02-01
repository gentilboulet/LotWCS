import { createAction } from "typesafe-actions";
import { historyMetaCreator } from "../meta";
import { ICost } from "../../models/character/costs";
import { TChiName } from "../../../data/chi";

export const chiBuy = createAction(
  "chi/BUY",
  (chi: TChiName, value: number, cost: ICost) => {
    return { chi, value, cost };
  },
  historyMetaCreator,
)();
