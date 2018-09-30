import * as actions from './chi';

describe('Testing chi action creator', () => {
  const noCost = {
    destiny: 0, discountIdx: -1, discountNewValue: 0,
    entanglement: 0
  };

  it('should create a chi buy action', () => {
    const chiType = 'fire';
    const value = 123;
    const action = actions.chiBuy(chiType, value, noCost);
    expect( action.chi ).toBe(chiType);
    expect( action.value ).toBe(value);
    expect( action ).toMatchSnapshot();
  });
});
