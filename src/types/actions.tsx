import { IInitialStateAction } from '../actions/initial';
import { IHeaderAction } from '../actions/header';
import { ISkillAction } from '../actions/skills';
import { ILoresheetAction } from '../actions/loresheets';

export type IAction =
  IInitialStateAction |
  IHeaderAction |
  ISkillAction |
  ILoresheetAction;
