/* tslint:disable:import-sources-order named-imports-order ordered-imports*/

// Core rulebook //
// Rivers and Lakes
import { jianghu } from "./core/riversandlakes/jianghu";
import { crouchingtigersandhiddendragons } from "./core/riversandlakes/crouchingtigersandhiddendragons";
import { wulin } from "./core/riversandlakes/wulin";
import { wulinsage } from "./core/riversandlakes/wulinsage";
// Wulin Factions
// Orthodox Factions
// Unorthodox Factions
// The Wulin Greats
// Forest and Mountains
// The Philosophies of Shen Zhou
// Relationship in Shen Zhou
// Heretic Lores
// Secrets Arts

import { IBonus } from "state/bonuses";
import { IDiscount } from "state/discounts";
import { IEffect } from "state/effects";

type IPerk = IBonus | IDiscount | IEffect;

export interface IDataLoresheetOptionPrerequisiteAND {
  type: "AND";
  prerequisites: string[];
}

export interface IDataLoresheetOptionPrerequisiteOR {
  type: "OR";
  prerequisites: string[];
}

export type IDataLoresheetOptionPrerequisite =
  | string
  | IDataLoresheetOptionPrerequisiteOR
  | IDataLoresheetOptionPrerequisiteAND;

export interface IDataLoresheetOption {
  uid: string;
  type: string;
  cost: number | { min: number; max: number };
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

export const loresheetsCategories: string[] = loresheets
  .map(ls => ls.category)
  .filter(
    (value: string, index: number, self: string[]) =>
      self.indexOf(value) === index
  );

export function validateLoresheet(uid: string): void {
  if (!loresheets.find((loresheet: IDataLoresheet) => loresheet.uid === uid)) {
    throw new Error('Invalid loresheet "' + uid + '"');
  }
}

export function validateLoresheetOption(lsUid: string, uid: string): void {
  validateLoresheet(lsUid);
  const loresheetIndex = loresheets.findIndex(
    (ls: IDataLoresheet) => ls.uid === lsUid
  );
  if (
    !loresheets[loresheetIndex].options.find(
      (option: IDataLoresheetOption) => option.uid === uid
    )
  ) {
    throw new Error('Invalid loresheet option " + uid + "');
  }
}

export function getLoresheetData(lsUid: string): IDataLoresheet {
  const idxLS = loresheets.findIndex(ls => ls.uid === lsUid);
  return loresheets[idxLS];
}

export function getLoresheetOptionData(
  lsUid: string,
  optUid: string
): IDataLoresheetOption {
  const idxLS = loresheets.findIndex(ls => ls.uid === lsUid);
  const idxOpt = loresheets[idxLS].options.findIndex(o => o.uid === optUid);
  return loresheets[idxLS].options[idxOpt];
}
