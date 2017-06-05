import { initialState } from './initial';

it('initialState', () => {
  expect( initialState ).toMatchSnapshot();
});
