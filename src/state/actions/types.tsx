import { IInitialStateAction } from './initial';

import { IChiAction } from './chi';
import { IHeaderAction } from './header';
import { IHistoryAction } from './history';
import { IKungFuAction } from './kungfu';
import { ILoresheetAction } from './loresheets';
import { ISkillAction } from './skills';
import { IVirtueAction } from './virtues';

export type IAction =
  IInitialStateAction | IHeaderAction | ISkillAction | IHistoryAction |
  ILoresheetAction | IChiAction | IKungFuAction | IVirtueAction;
