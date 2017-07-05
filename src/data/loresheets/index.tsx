import { ILoresheet } from '../../types/loresheets';

// Core rulebook //
// Rivers and Lakes
import { jianghu } from './core/riversandlakes/jianghu';
import { crouchingtigersandhiddendragons } from './core/riversandlakes/crouchingtigersandhiddendragons';
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
  crouchingtigersandhiddendragons
);
