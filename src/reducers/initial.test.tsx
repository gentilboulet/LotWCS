import { initialStateFactory } from './initial';

describe('Testing initialState', () => {
  it('initialStateFactory', () => {
    expect( initialStateFactory() ).toMatchSnapshot();
  });
});
