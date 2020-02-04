import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/kungfu";
import {
  addKungFuTechnique,
  IKungFuState,
  openStyle,
} from "../../models/character/kungfu";

export const kungfuReducer = produce(
  (draft: Draft<IKungFuState>, action: ActionType<typeof actions>) => {
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
  },
);
