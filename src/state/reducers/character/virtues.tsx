import { produce, Draft } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/virtues";
import { increase, TVirtuesState } from "../../models/character/virtues";

export const virtuesReducer = produce(
  (draft: Draft<TVirtuesState>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.increase):
        increase(draft, action.payload.name, action.payload.value);
        break;
      default:
    }
  },
);
