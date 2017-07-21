import { IInitialStateAction } from '../actions/initial';
import { IHeaderAction } from '../actions/header';
import { ISkillAction } from '../actions/skills';
import { ILoresheetAction } from '../actions/loresheets';
import { IHistoryAction } from '../actions/history';

export type IAction =
  IInitialStateAction | IHeaderAction | ISkillAction | IHistoryAction | ILoresheetAction;
