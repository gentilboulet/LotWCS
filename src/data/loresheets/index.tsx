import { ILoresheet } from '../../types/loresheets';

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
  loresheets.map( d => { return d.category; })
            .filter(
              (value: string, index: number, self: Array<string>) => { return self.indexOf(value) === index; }
            );
