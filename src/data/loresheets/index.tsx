/* tslint:disable:import-sources-order named-imports-order ordered-imports*/
/* eslint-disable import/first */
import { IBonus } from "../../perks/bonuses";
import { IDiscount } from "../../perks/discounts";
import { IEffect } from "../../perks/effects";

import { SAGE_LORESHEET, SECRET_ARTS } from "./types";

// TODO perks/index.tsx
export type IPerk = IBonus | IDiscount | IEffect;

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

interface IDataGenericLoresheetOption {
  uid: string;
  name?: string;
  type: string;
  cost: number | { min: number; max: number };
  description: string;
  prerequisites: IDataLoresheetOptionPrerequisite[];
  perks: IPerk[];
}

interface IDataGenericLoresheet {
  uid: string;
  name: string;
  category: string;
  type: string;
  cost: number;
  description: string;
  ruleset: string;
  options: IDataGenericLoresheetOption[];
}

export interface IDataSecretArtTechnique extends IDataGenericLoresheetOption {
  name: string;
}

export interface IDataSecretArt extends IDataGenericLoresheet {
  cost: number;
  type: SECRET_ARTS;
  options: IDataSecretArtTechnique[];
}

export interface IDataLoresheetOption extends IDataGenericLoresheetOption {
  repeatable: boolean;
  payload?: string;
}
export interface IDataLoresheet extends IDataGenericLoresheet {
  type: SAGE_LORESHEET;
  options: IDataLoresheetOption[];
}

export type IDataLoresheetFilter = (arg0: IDataGenericLoresheet) => boolean;

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
import { secretartofbattle } from "./secret-arts/thewarriorsart/thesecretartofbattle";
import { extraordinarywarriortechniques } from "./secret-arts/thewarriorsart/extraordinarywarriortechniques";

const loresheets: IDataGenericLoresheet[] = [
  jianghu,
  crouchingtigersandhiddendragons,
  wulin,
  wulinsage,
  secretartofbattle,
  extraordinarywarriortechniques
];

export function getLoresheets(
  filter: IDataLoresheetFilter
): IDataGenericLoresheet[] {
  return loresheets.filter(ls => filter(ls));
}

export function getLoresheetCategories(filter: IDataLoresheetFilter): string[] {
  return loresheets
    .filter(ls => filter(ls))
    .map(ls => ls.category)
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    );
}

export function validateLoresheet(uid: string): void {
  if (!loresheets.find((loresheet: IDataLoresheet) => loresheet.uid === uid)) {
    throw new Error('Invalid loresheet "' + uid + '"');
  }
}

export function validateLoresheetOption(lsUid: string, uid: string): void {
  validateLoresheet(lsUid);
  const idxLS = loresheets.findIndex(ls => ls.uid === lsUid);
  if (
    !loresheets[idxLS].options.find(
      (option: IDataLoresheetOption) => option.uid === uid
    )
  ) {
    throw new Error('Invalid loresheet option " + uid + "');
  }
}

export function getLoresheetData(lsUid: string): IDataGenericLoresheet {
  const idxLS = loresheets.findIndex(ls => ls.uid === lsUid);
  return loresheets[idxLS];
}

export function isLoresheet(ls: any): boolean {
  return ls.type === SAGE_LORESHEET;
}

export function isSecretArts(ls: any): boolean {
  return ls.type === SECRET_ARTS;
}

export function gotName(lsUid: string): boolean {
  const data = getLoresheetData(lsUid);
  return data.type === SECRET_ARTS;
}

export function gotPayload(lsUid: string, uid: string): boolean {
  if (isSecretArts(lsUid)) {
    return false;
  }
  const data = getLoresheetOptionData(lsUid, uid) as IDataLoresheetOption;
  return data.payload !== undefined;
}

export function isRepeatable(lsUid: string): boolean {
  const data = getLoresheetData(lsUid);
  return data.type === SAGE_LORESHEET;
}

export function getLoresheetOptionData(
  lsUid: string,
  optUid: string
): IDataGenericLoresheetOption {
  const data = getLoresheetData(lsUid);
  const idxOpt = data.options.findIndex(o => o.uid === optUid);
  return data.options[idxOpt];
}
