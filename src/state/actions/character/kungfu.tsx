import { createAction } from "typesafe-actions";

import * as dataKungFu from "../../../data/kungfu";
import { KUNGFU_TYPE } from "../../../data/kungfu/types";
import { ICost } from "../../models/character/costs";
import { bonusCultivation } from "../../../perks/actions/bonuses";

export const openStyle = createAction(
  "kungfu/OPEN_STYLE",
  (uid: string, kungfuType: KUNGFU_TYPE, cost: ICost) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, uid);

    return {
      uid,
      kungfuType,
      cost,
      perks: [
        bonusCultivation(
          dataKungFu.getKungfuChi(kungfuType, uid),
          cost.original,
        ),
      ],
    };
  },
)();

export const buyTechnique = createAction(
  "kungfu/BUY_TECHNIQUE",
  (styleUid: string, uid: string, kungfuType: KUNGFU_TYPE, cost: ICost) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, styleUid);
    dataKungFu.validateKungFuTechnique(kungfuType, styleUid, uid);
    return {
      cost,
      kungfuType,
      styleUid,
      uid,
      perks: [
        bonusCultivation(
          dataKungFu.getKungfuChi(kungfuType, styleUid),
          cost.original,
        ),
      ],
    };
  },
)();

export const customStyleName = createAction(
  "kungfu/CUSTOM_NAME_FOR_STYLE",
  (uid: string, kungfuType: KUNGFU_TYPE, name: string) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, uid);
    if (name.length < 1) {
      throw new Error("Invalid new name");
    }
    return {
      kungfuType,
      name,
      uid,
    };
  },
)();

export const customTechniqueName = createAction(
  "kungfu/CUSTOM_NAME_FOR_TECHNIQUE",
  (styleUid: string, uid: string, kungfuType: KUNGFU_TYPE, name: string) => {
    dataKungFu.validateKungFuType(kungfuType);
    dataKungFu.validateKungFuStyle(kungfuType, styleUid);
    dataKungFu.validateKungFuTechnique(kungfuType, styleUid, uid);
    if (name.length < 1) {
      throw new Error("Invalid new name");
    }
    return {
      kungfuType,
      name,
      styleUid,
      uid,
    };
  },
)();