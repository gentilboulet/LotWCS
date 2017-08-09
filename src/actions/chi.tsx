import * as constants from '../constants/chi';
import * as dataChi from '../data/chi';
import { ICost } from '../costs/types';

export interface IChiBuy {
  type: constants.CHI_BUY;
  chiType: dataChi.IChiNames;
  value: number;
  cost: ICost;
}

export type IChiAction = IChiBuy;

export function chiBuy(chi: dataChi.IChiNames, value: number, cost: ICost): IChiBuy {
  dataChi.validateChi(chi);
  return { type: constants.CHI_BUY, chiType: chi, value: value, cost: cost };
}
