import * as dataVirtues from 'data/virtues';
import * as constants from 'state/constants/virtues';
import { ICost } from 'state/costs';

export interface IVirtueIncrease {
  type: constants.VIRTUE_INCREASE;
  name: string;
  virtueType: dataVirtues.IDataVirtueType;
  value: number;
  cost: ICost;
}

export type IVirtueAction = IVirtueIncrease;

export function increase(name: string, virtueType: dataVirtues.IDataVirtueType, value: number, cost: ICost): IVirtueIncrease {
  return { type: constants.VIRTUE_INCREASE, name, virtueType, value, cost };
}
