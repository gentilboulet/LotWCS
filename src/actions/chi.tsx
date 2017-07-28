import * as constants from '../constants/chi';
import { IChiNames } from '../types/state';
import { ICost } from '../types/costs';

export interface IChiBuy {
  type: constants.CHI_BUY;
  chiType: IChiNames;
  value: number;
  cost: ICost;
}

export type IChiActions = IChiBuy;

export function chiBuy(chi: IChiNames, value: number, cost: ICost): IChiBuy {
  return { type: constants.CHI_BUY, chiType: chi, value: value, cost: cost };
}
