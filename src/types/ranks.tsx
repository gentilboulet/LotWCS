import { IPerk } from '../types/perks';

export interface IDataRank {
  name: string;
  desc: string;
  key: string;
  value: 0|1|2|3|4|5|6;
  perks: IPerk[];
}

export interface IDataRanks extends Array<IDataRank> {}
