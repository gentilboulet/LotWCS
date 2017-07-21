import { IPerk } from '../types/perks';

export interface ILoresheetOptionPrerequisiteAND {
  type: 'AND';
  prerequisites: string[];
}

export interface ILoresheetOptionPrerequisiteOR {
  type: 'OR';
  prerequisites: string[];
}

export type ILoresheetOptionPrerequisite =
  string
  | ILoresheetOptionPrerequisiteOR
  | ILoresheetOptionPrerequisiteAND;

export interface ILoresheetOption {
  uid: string;
  type: string;
  cost: string;
  description: string;
  repeatable: boolean;
  prerequisites: ILoresheetOptionPrerequisite[];
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
