import { produce, Draft } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/chi";
import { TChiState } from "../models/chi";

import { increase } from "../models/chi";

export type IChiAction = ActionType<typeof actions>;

export const chiReducer = produce(
  (draft: Draft<TChiState>, action: IChiAction) => {
    switch (action.type) {
      case getType(actions.chiBuy):
        increase(draft, action.payload.chi, action.payload.value);
        break;
      default:
    }
  },
);
