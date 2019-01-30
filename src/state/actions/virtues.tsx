import * as constants from "../constants/virtues";
import { ICost } from "../costs";

export interface IVirtueIncrease {
  type: constants.VIRTUE_INCREASE;
  name: string;
  value: number;
  cost: ICost;
}

export type IVirtueAction = IVirtueIncrease;

export function increase(
  name: string,
  value: number,
  cost: ICost
): IVirtueIncrease {
  return { type: constants.VIRTUE_INCREASE, name, value, cost };
}
