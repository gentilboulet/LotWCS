import { IDataVirtue, IDataVirtueType, virtues } from "../../../data/virtues";
import { ICharacterState } from "./type";

export interface IVirtueState {
  name: string;
  value: number;
  type: IDataVirtueType;
}

export type TVirtuesState = IVirtueState[];

export function createState(): TVirtuesState {
  return virtues.map((virtue: IDataVirtue) => {
    return { name: virtue.name, value: 0, type: virtue.type };
  });
}

export function add(
  state: TVirtuesState,
  name: string,
  type: IDataVirtueType,
  value: number
): void {
  if (isVirtuePresent(state, name)) {
    throw new Error("Internal Error : virtue already present " + name);
  }
  state.push({ name, value, type });
}

export function increase(
  state: TVirtuesState,
  name: string,
  value: number
): void {
  if (!isVirtuePresent(state, name)) {
    throw new Error("Internal Error : unknwon new virtue " + name);
  }
  state.forEach(virtue => {
    if (virtue.name === name) {
      virtue.value += value;
    }
  });
}

export function isVirtuePresent(state: TVirtuesState, name: string): boolean {
  return state.findIndex(virtue => name === virtue.name) !== -1;
}

export function canBuyVirtue(state: ICharacterState, name: string): boolean {
  const findIndex = state.virtues.findIndex(v => name === v.name);
  if (findIndex === -1) {
    return false;
  }
  const virtue = state.virtues[findIndex];
  if (virtue.value + 1 > 5) {
    return false;
  } else {
    return true;
  }
}
