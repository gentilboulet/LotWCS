import { TChiName } from 'data/chi';
import { WEAPON_TYPE } from 'data/weapons';
import { IEffect } from 'state/effects';

// Constants used to differentiate between kungfu
export const KUNGFU_EXTERNAL = 'KUNGFU_EXTERNAL';
export type KUNGFU_EXTERNAL = typeof KUNGFU_EXTERNAL;

export const KUNGFU_INTERNAL = 'KUNGFU_INTERNAL';
export type KUNGFU_INTERNAL = typeof KUNGFU_INTERNAL;

export type KUNGFU_TYPE = KUNGFU_INTERNAL | KUNGFU_EXTERNAL;

export interface IDataExternalKungfuStatistics {
    speed: 0|5|10|15|20;
    footwork: 0|5|10|15|20;
    strike: 0|5|10|15|20;
    damage: 0|5|10|15|20;
    block: 0|5|10|15|20;
    toughness: 0|5|10|15|20;
}

export interface IDataExternalKungfuPrerequisite { uid: string };

export interface IDataExternalKungfuTechnique {
    name: string;
    cost: number;
    description: string;
    effect: IEffect;
    uid: string;
    prerequisites?: IDataExternalKungfuPrerequisite[];
}

export interface IDataInternalKungfuTechnique {
    name: string;
    level: number; // 1 | 2 | 3 | 4 | 5;
    description: string;
    effect: IEffect;
    uid: string;
}

export interface IDataExternalKungfu {
  name: string;
  laugths: string;
  fears: string;
  weapons: WEAPON_TYPE[];
  statistics: IDataExternalKungfuStatistics;
  techniques: IDataExternalKungfuTechnique[];
  uid: string;
}

export interface IDataInternalKungfu {
  name: string;
  element: TChiName;
  techniques: IDataInternalKungfuTechnique[];
  uid: string;
}
