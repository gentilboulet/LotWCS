import { IInitialStateAction } from '../actions/initial';
import { IHeaderAction } from '../actions/header';
import { IChiAction } from '../actions/chi';
import { ISkillAction } from '../actions/skills';
import { ILoresheetAction } from '../actions/loresheets';
import { IHistoryAction } from '../actions/history';
import { IKungFuAction } from '../actions/kungfus';
import { IVirtueAction } from '../actions/virtues';

export type IAction =
  IInitialStateAction | IHeaderAction | ISkillAction | IHistoryAction |
  ILoresheetAction | IChiAction | IKungFuAction | IVirtueAction;
