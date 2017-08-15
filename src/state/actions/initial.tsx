import * as constants from 'state/constants/initial';

export interface IInitialState {
  type: constants.INITIAL_STATE;
}

export type IInitialStateAction = IInitialState;

export function resetToInitialState(): IInitialState {
  return {type: constants.INITIAL_STATE};
}
