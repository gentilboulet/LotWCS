export interface ICost {
  destiny: number;
  entanglement: number;
  reductionIdx: number;
  reductionNewValue: number;
}

export const defaultCost: ICost = {
  destiny: 0,
  entanglement: 0,
  reductionIdx: -1,
  reductionNewValue: 0,
};
