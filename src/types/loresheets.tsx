import { IPerk } from '../types/perks';

export interface ILoresheetOption {
  uid: string;
  type: string;
  cost: string;
  description: string;
  perks: IPerk[];
}

export interface ILoresheet {
  uid: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  ruleset: string;
  options: ILoresheetOption[];
}
