import { initialStateFactory } from './initial';

it('initialStateFactory', () => {
  expect( initialStateFactory() ).toMatchSnapshot();
});
