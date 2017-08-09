import { initialStateFactory } from './initial';

describe('Testing initialStateFactory', () => {
  it('should be constant', () => {
    expect( initialStateFactory() ).toMatchSnapshot();
  });
});
