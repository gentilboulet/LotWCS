import { createAction } from "typesafe-actions";

import { ARMOR_TYPE } from "../../../data/armor";
import { WEAPON_TYPE } from "../../../data/weapons";
import { ICost } from "../../models/character/costs";
import { historyMetaCreator } from "../meta";

export const armorBuy = createAction(
  "gear/ARMOR_BUY",
  (name: string, description: string, type: ARMOR_TYPE, cost: ICost) => {
    return { cost, description, name, type };
  },
  historyMetaCreator,
)();

export const armorCustomize = createAction(
  "gear/ARMOR_CUSTOM",
  (name: string, description: string) => {
    return { description, name };
  },
  historyMetaCreator,
)();

export const weaponBuy = createAction(
  "gear/WEAPON_BUY",
  (
    name: string,
    description: string,
    type: [WEAPON_TYPE] | [WEAPON_TYPE, WEAPON_TYPE],
    cost: ICost,
  ) => {
    return { cost, description, name, type };
  },
  historyMetaCreator,
)();

export const weaponCustomize = createAction(
  "gear/WEAPON_CUSTOM",
  (name: string, description: string) => {
    return { description, name };
  },
  historyMetaCreator,
)();
