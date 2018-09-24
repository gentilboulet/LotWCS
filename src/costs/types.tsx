export interface ICost {
  destiny: number;
  discountIdx: number;
  discountNewValue: number;
  entanglement: number;
}

export const defaultCost: ICost = {
  destiny: 0,
  discountIdx: -1,
  discountNewValue: 0,
  entanglement: 0,
};
