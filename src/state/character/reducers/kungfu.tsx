import { produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../actions/kungfu";
import { addKungFuTechnique, openStyle, IKungFuState } from "../models/kungfu";

export function kungfuReducer(
  state: IKungFuState,
  action: ActionType<typeof actions>,
): IKungFuState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.openStyle):
        openStyle(draft, action.payload.kungfuType, action.payload.uid);
        break;
      case getType(actions.buyTechnique):
        addKungFuTechnique(
          draft,
          action.payload.kungfuType,
          action.payload.styleUid,
          action.payload.uid,
        );
        break;
      case getType(actions.customStyleName):
      case getType(actions.customTechniqueName):
      default:
    }
  });
}
