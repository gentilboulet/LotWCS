import { chiNames, TChiName } from "../../../data/chi";

export type TChiState = {
  [chi in TChiName]: { value: number; cultivation: number };
};

export function createState(): TChiState {
  const state = {} as TChiState;
  chiNames.forEach((chi: TChiName) => {
    state[chi] = { value: 0, cultivation: 0 };
  });
  return state;
}

export function increase(
  state: TChiState,
  name: TChiName,
  value: number,
): void {
  state[name].value += value;
}

export function increaseCultivation(
  state: TChiState,
  name: TChiName,
  increaseValue: number,
): void {
  let cultivation = state[name].cultivation + increaseValue;
  let chiValue = state[name].value;

  const costMultiplier =
    name === "enlightened" || name === "corrupt"
      ? 10
      : name !== "general"
      ? 5
      : 1;

  while (cultivation - costMultiplier * Math.max(1, chiValue) >= 0) {
    cultivation -= costMultiplier * Math.max(1, chiValue);
    chiValue++;
  }

  state[name].value = chiValue;
  state[name].cultivation = cultivation;
}

export function canBuyChi(): boolean {
  return true;
}
