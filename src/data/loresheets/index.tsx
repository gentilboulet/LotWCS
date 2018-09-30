/* tslint:disable:import-sources-order named-imports-order ordered-imports*/

// Core rulebook //
// Rivers and Lakes
import { jianghu } from './core/riversandlakes/jianghu';
import { crouchingtigersandhiddendragons } from './core/riversandlakes/crouchingtigersandhiddendragons';
import { wulin } from './core/riversandlakes/wulin';
import { wulinsage } from './core/riversandlakes/wulinsage';
// Wulin Factions
// Orthodox Factions
// Unorthodox Factions
// The Wulin Greats
// Forest and Mountains
// The Philosophies of Shen Zhou
// Relationship in Shen Zhou
// Heretic Lores
// Secrets Arts

import { IBonus } from 'state/bonuses';
import { IDiscount } from 'state/discounts';
import { IEffect } from 'state/effects';

type IPerk = IBonus | IDiscount | IEffect;

export interface IDataLoresheetOptionPrerequisiteAND {
  type: 'AND';
  prerequisites: string[];
}

export interface IDataLoresheetOptionPrerequisiteOR {
  type: 'OR';
  prerequisites: string[];
}

export type IDataLoresheetOptionPrerequisite =
  string
  | IDataLoresheetOptionPrerequisiteOR
  | IDataLoresheetOptionPrerequisiteAND;

export interface IDataLoresheetOption {
  uid: string;
  type: string;
  cost: string;
  description: string;
  repeatable: boolean;
  prerequisites: IDataLoresheetOptionPrerequisite[];
  perks: IPerk[];
}

export interface IDataLoresheet {
  uid: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  ruleset: string;
  options: IDataLoresheetOption[];
}

export const loresheets: IDataLoresheet[] = Array(
  jianghu,
  crouchingtigersandhiddendragons,
  wulin,
  wulinsage
);

export const loresheetsCategories: string[] =
  loresheets.map( ls => ls.category )
            .filter( (value: string, index: number, self: string[]) => (self.indexOf(value) === index) );

export function validateLoresheet(uid: string): void {
  if (! loresheets.find((loresheet: IDataLoresheet) => (loresheet.uid === uid)) ) {
    throw new Error('Invalid loresheet "' + uid + '"');
  }
}

export function validateLoresheetOption(lsUid: string, uid: string): void {
  validateLoresheet(lsUid);
  const loresheetIndex = loresheets.findIndex((ls: IDataLoresheet) => (ls.uid === lsUid));
  if (! loresheets[loresheetIndex].options.find((option: IDataLoresheetOption) => (option.uid === uid))) {
    throw new Error('Invalid loresheet option " + uid + "');
  }
}

export function lsOptionCostToValues(costStr: string): number[] {
  const DEFAULT_MAXIMUM = 10;
  const single = new RegExp(/^\d+$/);
  const singlePlus = new RegExp(/^(\d+)\+$/);
  const range = new RegExp(/^(\d+)-(\d+)$/);
  if (single.test(costStr)) {
    return [Number(costStr)];
  } else if (singlePlus.test(costStr)) {
    const arr = singlePlus.exec(costStr);
    const min = Number((arr as string[])[1]);
    return Array.from(new Array(DEFAULT_MAXIMUM).keys()).filter((v: number) => (min <= v));
  } else if (range.test(costStr)) {
    const arr = range.exec(costStr);
    const min = Number((arr as string[])[1]);
    const max = Number((arr as string[])[2]);
    return Array.from(new Array(DEFAULT_MAXIMUM + 1).keys()).filter((v: number) => (min <= v && v <= max));
  } else {
    throw new Error('lsOptionCostToValues unknown cost "' + costStr + '"');
  }
}

export function optionLoresheetData(lsUid: string, optUid: string): IDataLoresheetOption {
  const idxLS = loresheets.findIndex(ls => (ls.uid === lsUid));
  const idxOpt = loresheets[idxLS].options.findIndex(o => (o.uid === optUid));
  return loresheets[idxLS].options[idxOpt];
}
