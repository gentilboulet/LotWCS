import { chiNames, TChiName } from 'data/chi';
import { canPayCost, getCostChi } from 'state/costs';
import { IStoreState } from 'state/type';

export type TChiState = {
  [chi in TChiName]: { value: number, cultivation: number};
}

export function createState(): TChiState {
  const state = {} as TChiState;
  chiNames.forEach((chi: TChiName) => {
    state[chi] = { value: 0, cultivation: 0};
  });
  return state;
}

export function increase(state: TChiState, name: TChiName, value: number): void {
   state[name].value += value;
}

export function increaseCultivation(state: TChiState, name: TChiName, value: number): void {
  const actualCultivation = state[name].cultivation;
  const actualChi = state[name].value;

  let newCultivation = actualCultivation + value;
  let newChiValue = actualChi;
  while (newCultivation >= newChiValue) {
    newChiValue ++;
    newCultivation -= newChiValue;
  }
  state[name].value = newChiValue;
  state[name].cultivation = newCultivation;
}

export function canBuyChi(state: IStoreState, chiName: TChiName): boolean {
  // const value = state.chi[chiName].value;
  const cost = getCostChi(state, chiName);
  return canPayCost(state, cost);
}
