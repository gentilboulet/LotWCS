/* tslint:disable:max-classes-per-file */
import * as Immutable from 'immutable';

import * as dataChi from 'data/chi';

class ChiInnerState extends Immutable.Record({value: 0, cultivation: 0}) {};

const defaultChi = {
  general: new ChiInnerState(),

  earth: new ChiInnerState(),
  fire: new ChiInnerState(),
  metal: new ChiInnerState(),
  water: new ChiInnerState(),
  wood: new ChiInnerState(),

  corrupt: new ChiInnerState(),
  enlightened: new ChiInnerState(),
};

export class ChiState extends Immutable.Record(defaultChi) {
  public getChi(chiName: dataChi.IChiNames): number {
    return this.getIn([chiName, 'value']);
  }

  public getCultivation(chiName: dataChi.IChiNames): number {
    return this.getIn([chiName, 'cultivation']);
  }

  public increaseChi(chiName: dataChi.IChiNames, value: number): ChiState {
    const chi = this.getChi(chiName);
    return this.setIn([chiName, 'value'], chi+value) as ChiState;
  }

  public increaseCultivation(chiName: dataChi.IChiNames, value: number): ChiState {
    const actualCultivation = this.getCultivation(chiName);
    const actualChi = this.getChi(chiName);

    let newCultivation = actualCultivation + value;
    let newChiValue = actualChi;
    while (newCultivation >= newChiValue) {
      newChiValue ++;
      newCultivation -= newChiValue;
    }

    return this.setIn([chiName, 'value'], newChiValue)
               .setIn([chiName, 'cultivation'], newCultivation) as ChiState;
  }
}
