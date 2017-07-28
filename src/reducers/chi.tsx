import { IChiActions } from '../actions/chi';
import { IStoreState, IChiNames, IChiCultivations, fromCultivationToChiName }
  from '../types/state';
import * as constants from '../constants/chi';

// Sub Reducers
import { applyCost } from './costs';
import { pushToHistory } from './history';

export function increaseValue(state: IStoreState, chiName: IChiNames, value: number): void {
  state.updateIn(['chi', chiName], chi => { return chi + value; });
}

export function increaseCultivation(state: IStoreState, cultivationName: IChiCultivations, value: number): void {
  const actualCultivation = state.getIn(['chi', cultivationName]);

  const chiName: IChiNames = fromCultivationToChiName(cultivationName);
  const actualChi = state.getIn(['chi', chiName]);

  let newCultivation = actualCultivation + value;
  let newChiValue = actualChi;
  while (newCultivation >= newChiValue) {
    newCultivation -= actualChi;
    newChiValue ++;
  }

  state.updateIn(['chi', cultivationName], cultivation => { return cultivation + value; });
  increaseValue(state, chiName, newChiValue - actualChi);
}

export function getChiValue(state: IStoreState, chiName: IChiNames): number {
  return state.getIn(['chi', chiName]);
}

export function chiReducer(oldState: IStoreState, action: IChiActions): IStoreState {
  switch (action.type) {
    case constants.CHI_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        increaseValue(state, action.chiType, action.value);

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}
