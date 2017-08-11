import * as dataChi from '../../data/chi';
import { IEffect } from '../../types/effects';

export type IWeaponType = 'Flexible'|'Massive'|'Paired'|'Ranged'|'Saber'|'Staff'|'Spear'|'Sword'|'Unarmed';

export interface IDataExternalKungfuStatistics {
    speed: 0|5|10|15|20;
    footwork: 0|5|10|15|20;
    strike: 0|5|10|15|20;
    damage: 0|5|10|15|20;
    block: 0|5|10|15|20;
    toughness: 0|5|10|15|20;
}

export type IDataExternalKungfuPrerequisite = { uid: string } | { name: string };

export interface IDataExternalKungfuTechnique {
    name: string;
    cost: number;
    description: string;
    effect: IEffect;
    uid?: string;
    prerequisites?: IDataExternalKungfuPrerequisite[];
}

export interface IDataInternalKungfuTechnique {
    name: string;
    level: number; // 1 | 2 | 3 | 4 | 5;
    description: string;
    effect: IEffect;
    uid?: string;
}

export interface IDataExternalKungfu {
  name: string;
  laugths: string;
  fears: string;
  weapons: IWeaponType[];
  statistics: IDataExternalKungfuStatistics;
  techniques: IDataExternalKungfuTechnique[];
  uid?: string;
}

export interface IDataInternalKungfu {
  name: string;
  element: dataChi.IChiNames;
  techniques: IDataInternalKungfuTechnique[];
  uid?: string;
}

export type IDataExternalKungfus = Array<IDataExternalKungfu>;
export type IDataInternalKungfus = Array<IDataInternalKungfu>;

import { blossomHarvest } from './externals/blossom-harvest';

export const externalKungfus: IDataExternalKungfus = Array(
  blossomHarvest
);

import { boundlessProsperityManual } from './internals/boundless-prosperity-manual';
export const internalKungfus: IDataInternalKungfus = Array(
  boundlessProsperityManual
);
