import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/chi";
import { TChiState } from "../../models/character/chi";

import { increase } from "../../models/character/chi";

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
