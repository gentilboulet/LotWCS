import * as actions from './chi';
import * as dataChi from '../data/chi';

describe('Testing chi action creator', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  it('should create a chi buy action', () => {
    const chiType: dataChi.IChiNames = 'fire';
    const value = 123;
    const action = actions.chiBuy(chiType, value, noCost);
    expect( action.chiType ).toBe(chiType);
    expect( action.value ).toBe(value);
    expect( action ).toMatchSnapshot();
  });

  it('should not create an invalid chi buy action', () => {
    const chiType = 'totally not fire';
    const value = 123;
    expect( () => actions.chiBuy(chiType as dataChi.IChiNames, value, noCost) ).toThrow();
  });
});
