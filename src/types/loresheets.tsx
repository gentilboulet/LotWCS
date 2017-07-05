export interface ILoresheetBonus {
  uid: string;
  type: string;
  cost: string;
  description: string;
  bonus: number[];
}

export interface ILoresheet {
  uid: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  ruleset: string;
  bonuses: ILoresheetBonus[];
}
