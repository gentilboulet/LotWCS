// import * as actions from './kungfus';
// import * as dataKungfu from '../data/kungfus';

describe('Testing external kungfu action creator', () => {
  const noCost = {
    destiny: 0, entanglement: 0,
    discountIdx: -1, discountNewValue: 0
  };

  it('placeholder for no actions', () => {
    expect( noCost ).toMatchObject( noCost );
  });
});
describe('Testing internal kungfu action creator', () => {
  it('placeholder for no actions', () => {
    expect( true ).toBeTruthy();
  });
});
