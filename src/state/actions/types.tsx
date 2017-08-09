import { IInitialStateAction } from './initial';
import { IHeaderAction } from './header';
import { IChiAction } from './chi';
import { ISkillAction } from './skills';
import { ILoresheetAction } from './loresheets';
import { IHistoryAction } from './history';
import { IKungFuAction } from './kungfus';
import { IVirtueAction } from './virtues';

export type IAction =
  IInitialStateAction | IHeaderAction | ISkillAction | IHistoryAction |
  ILoresheetAction | IChiAction | IKungFuAction | IVirtueAction;
