import { ICost } from 'costs/types';
import * as dataChi from 'data/chi';
import * as constants from 'state/constants/chi';

export interface IChiBuy {
  type: constants.CHI_BUY;
  chiType: dataChi.IChiNames;
  value: number;
  cost: ICost;
}

export type IChiAction = IChiBuy;

export function chiBuy(chi: dataChi.IChiNames, val:number, c: ICost): IChiBuy {
  dataChi.validateChi(chi);
  return { 
    chiType: chi, 
    cost: c, 
    type: constants.CHI_BUY, 
    value: val
  };
}
