import { ARMOR_TYPE } from "../data/armor";
import { WEAPON_TYPE } from "../data/weapons";

export interface IArmor {
  type: ARMOR_TYPE;
  name: string;
  description: string;
}
export interface IWeapon {
  type: WEAPON_TYPE;
  special?: WEAPON_TYPE;
  name: string;
  description: string;
}

export interface TGearState {
  armors: IArmor[];
  weapons: IWeapon[];
}

export function createState(): TGearState {
  return {
    armors: [],
    weapons: []
  };
}
