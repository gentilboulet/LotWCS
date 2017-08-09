import * as constants from 'constants/virtues';
import * as dataVirtues from 'data/virtues';

import { ICost } from 'costs/types';

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
