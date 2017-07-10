import { IStoreState } from '../types/state';
import { IAction } from '../types/actions';

import { initialStateFactory } from './initial';
import { globalReducer } from './global';

const initialState: IStoreState  = initialStateFactory();

it('JUNK', () => {
  const junk = { type: 'JUNK_ACTION' };
  expect( globalReducer(initialState, junk as IAction )).toMatchSnapshot();
});
