import { testingStateFactory } from './initial';

describe('Testing testingStateFactory', () => {
  it('should be constant', () => {
    expect( testingStateFactory() ).toMatchSnapshot();
  });
});
