export interface ICost {
  destiny: number;
  entanglement: number;
  discountIdx: number;
  discountNewValue: number;
}

export const defaultCost: ICost = {
  destiny: 0,
  entanglement: 0,
  discountIdx: -1,
  discountNewValue: 0,
};
