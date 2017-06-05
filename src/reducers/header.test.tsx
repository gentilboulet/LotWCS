import * as Immutable from 'immutable';
import { IStoreState } from '../types';

import * as actions from '../actions/header';
import { headerReducer } from './header';

const initialState: IStoreState  = Immutable.fromJS({
  name: 'Bob',
  concept: 'The Bobbest',
  stuff: 'Data',
});

it('HEADER_SET_NAME', () => {
  expect( headerReducer(initialState, actions.headerSetName('Robert') ) ).toMatchSnapshot();
});

it('HEADER_SET_CONCEPT', () => {
  expect( headerReducer(initialState, actions.headerSetConcept('Sir Robert') ) ).toMatchSnapshot();
});
