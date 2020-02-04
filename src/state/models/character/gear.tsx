import { ARMOR_TYPE } from "../../../data/armor";
import { WEAPON_TYPE } from "../../../data/weapons";

export interface IArmor {
  type: ARMOR_TYPE;
  name: string;
  description: string;
}
export interface IWeapon {
  type: [WEAPON_TYPE] | [WEAPON_TYPE, WEAPON_TYPE];
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
    weapons: [],
  };
}

export function getArmorByName(state: TGearState, name: string) {
  return state.armors.find(a => a.name === name);
}

export function getWeaponByName(state: TGearState, name: string) {
  return state.weapons.find(a => a.name === name);
}
