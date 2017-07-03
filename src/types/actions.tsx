import { IInitialStateAction } from '../actions/initial';
import { IHeaderAction } from '../actions/header';
import { ISkillAction } from '../actions/skills';

export type IAction = IInitialStateAction | IHeaderAction | ISkillAction;
