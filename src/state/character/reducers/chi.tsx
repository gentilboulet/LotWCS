import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/chi";
import { TChiState } from "../models/chi";

import { increase } from "../models/chi";

export type IChiAction = ActionType<typeof actions>;

export function chiReducer(chi: TChiState, action: IChiAction): TChiState {
  return produce(chi, draft => {
    switch (action.type) {
      case getType(actions.chiBuy):
        increase(draft, action.payload.chi, action.payload.value);
        break;
      default:
    }
  });
}
