import { Draft, produce } from "immer";
import { ActionType, getType } from "typesafe-actions";

import * as actions from "../../actions/character/gear";
import {
  getArmorByName,
  getWeaponByName,
  TGearState,
} from "../../models/character/gear";

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
        const armor = getArmorByName(draft, action.payload.name);
        if (armor === undefined) {
          throw new Error("Armor to customize not found !");
        }
        armor.description = action.payload.description;
        break;
      case getType(actions.weaponBuy):
        draft.weapons.push({
          description: action.payload.description,
          name: action.payload.name,
          type: action.payload.type,
        });
        break;
      case getType(actions.weaponCustomize):
        const weapon = getWeaponByName(draft, action.payload.name);
        if (weapon === undefined) {
          throw new Error("Weapon to customize not found !");
        }
        weapon.description = action.payload.description;
        break;
      default:
    }
  },
);
