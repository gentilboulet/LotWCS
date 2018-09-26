import { ICost } from 'costs/types';
import { TChiName } from 'data/chi';
import * as constants from 'state/constants/chi';

export interface IChiBuy {
  type: constants.CHI_BUY;
  chi: TChiName;
  value: number;
  cost: ICost;
}

export type IChiAction = IChiBuy;

export function chiBuy(chi: TChiName, value:number, cost: ICost): IChiBuy {
  return { chi, cost, type: constants.CHI_BUY, value };
}
