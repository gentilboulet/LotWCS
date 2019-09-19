import { createAction } from "typesafe-actions";

import * as dataKungFu from "../../data/kungfu";
import { KUNGFU_TYPE } from "../../data/kungfu/types";
import { ICost } from "../costs";

export const openStyle = createAction(
  "kungfu/OPEN_STYLE",
  action => (uid: string, kungfuType: KUNGFU_TYPE, cost: ICost) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, uid);
    return action({ uid, kungfuType, cost });
  }
);

export const buyTechnique = createAction(
  "kungfu/BUY_TECHNIQUE",
  action => (
    styleUid: string,
    uid: string,
    kungfuType: KUNGFU_TYPE,
    cost: ICost
  ) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, styleUid);
    dataKungFu.validateKungFuTechnique(kungfuType, styleUid, uid);
    return action({
      cost,
      kungfuType,
      styleUid,
      uid
    });
  }
);

export const customStyleName = createAction(
  "kungfu/CUSTOM_NAME_FOR_STYLE",
  action => (uid: string, kungfuType: KUNGFU_TYPE, name: string) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, uid);
    if (name.length < 1) {
      throw new Error("Invalid new name");
    }
    return action({
      kungfuType,
      name,
      uid
    });
  }
);

export const customTechniqueName = createAction(
  "kungfu/CUSTOM_NAME_FOR_TECHNIQUE",
  action => (
    styleUid: string,
    uid: string,
    kungfuType: KUNGFU_TYPE,
    name: string
  ) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, styleUid);
    dataKungFu.validateKungFuTechnique(kungfuType, styleUid, uid);
    if (name.length < 1) {
      throw new Error("Invalid new name");
    }
    return action({
      kungfuType,
      name,
      styleUid,
      uid
    });
  }
);
