import { ILoresheet, ILoresheetOption } from '../../types/loresheets';
/* tslint:disable:ordered-imports */

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

export const loresheets: ILoresheet[] = Array(
  jianghu,
  crouchingtigersandhiddendragons,
  wulin,
  wulinsage
);

export const loresheetsCategories: string[] =
  loresheets.map( d => d.category )
            .filter( (value: string, index: number, self: string[]) => (self.indexOf(value) === index) );

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

export function optionLS(lsUid: string, optUid: string): ILoresheetOption {
  const idxLS = loresheets.findIndex(ls => (ls.uid === lsUid));
  const idxOpt = loresheets[idxLS].options.findIndex(o => (o.uid === optUid));
  return loresheets[idxLS].options[idxOpt];
}
