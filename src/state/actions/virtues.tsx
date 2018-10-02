import * as constants from 'state/constants/virtues';
import { ICost } from 'state/costs';

export interface IVirtueIncrease {
  type: constants.VIRTUE_INCREASE;
  name: string;
  value: number;
  cost: ICost;
}

export type IVirtueAction = IVirtueIncrease;

export function increase(name: string, value: number, cost: ICost): IVirtueIncrease {
  return { type: constants.VIRTUE_INCREASE, name, value, cost };
}
