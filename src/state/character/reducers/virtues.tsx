import produce from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/virtues";
import { increase, TVirtuesState } from "../models/virtues";

export function virtuesReducer(
  state: TVirtuesState,
  action: ActionType<typeof actions>,
): TVirtuesState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.increase):
        increase(draft, action.payload.name, action.payload.value);
        break;
      default:
    }
  });
}
