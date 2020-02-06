import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/gear";
import { TGearState } from "../../models/character/gear";

export const gearReducer = produce(
  (draft: Draft<TGearState>, action: ActionType<typeof actions>) => {
    switch (action.type) {
      case getType(actions.armorBuy):
        draft.armors.push({
          description: action.payload.description,
          name: action.payload.name,
          type: action.payload.type,
        });
        break;
      case getType(actions.armorCustomize):
        draft.armors[action.payload.armorIdx].description =
          action.payload.description;
        break;
      case getType(actions.weaponBuy):
        draft.weapons.push({
          description: action.payload.description,
          name: action.payload.name,
          type: action.payload.type,
        });
        break;
      case getType(actions.weaponCustomize):
        draft.weapons[action.payload.weaponIdx].description =
          action.payload.description;
        break;
      default:
    }
  },
);
