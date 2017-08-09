import { IChiAction } from '../actions/chi';
import { IStoreState } from '../state/types';
import * as constants from '../constants/chi';
import * as dataChi from '../data/chi';

// Sub Reducers
import { applyCost } from '../costs/reducer';
import { pushToHistory } from './history';

export function increaseValue(state: IStoreState, chiName: dataChi.IChiNames, value: number): void {
  state.updateIn(['chi', chiName], chi => { return chi + value; });
}

export function increaseCultivation(
  state: IStoreState, cultivationName: dataChi.IChiCultivations, value: number): void {
  const actualCultivation = state.getIn(['chi', cultivationName]);

  const chiName: dataChi.IChiNames = dataChi.fromCultivationToChiName(cultivationName);
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

export function getChiValue(state: IStoreState, chiName: dataChi.IChiNames): number {
  return state.getIn(['chi', chiName]);
}

export function chiReducer(oldState: IStoreState, action: IChiAction): IStoreState {
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
