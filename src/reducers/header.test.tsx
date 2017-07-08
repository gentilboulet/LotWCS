import { IStoreState } from '../types/state';

import { initialStateFactory } from './initial';
import * as actions from '../actions/header';
import { headerReducer } from './header';

const initialState: IStoreState  = initialStateFactory();

it('HEADER_SET_NAME', () => {
  expect( headerReducer(initialState, actions.headerSetName('Robert') ) ).toMatchSnapshot();
});

it('HEADER_SET_CONCEPT', () => {
  expect( headerReducer(initialState, actions.headerSetConcept('Sir Robert') ) ).toMatchSnapshot();
});

it('HEADER_SET_ARCHETYPE', () => {
  expect( headerReducer(initialState, actions.headerSetArchetype('warrior') ) ).toMatchSnapshot();
});
