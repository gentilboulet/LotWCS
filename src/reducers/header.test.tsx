import { IStoreState } from '../types/state';
import { IHeaderAction } from '../actions/header';

import { initialStateFactory } from './initial';
import * as actions from '../actions/header';
import { headerReducer } from './header';
import { globalReducer } from './global';

const initialState: IStoreState  = initialStateFactory();

it('HEADER_SET_NAME', () => {
  const refState = headerReducer(initialState, actions.headerSetName('Robert'));
  expect( refState ).toMatchSnapshot();
  expect( globalReducer(initialState, actions.headerSetName('Robert') ) ).toMatchObject(refState);
});

it('HEADER_SET_CONCEPT', () => {
  const refState = headerReducer(initialState, actions.headerSetConcept('Sir Robert') );
  expect( refState ).toMatchSnapshot();
  expect( globalReducer(initialState, actions.headerSetConcept('Sir Robert') ) ).toMatchObject(refState);
});

it('HEADER_SET_ARCHETYPE', () => {
  const refState = headerReducer(initialState, actions.headerSetArchetype('warrior') );
  expect( refState ).toMatchSnapshot();
  expect( globalReducer(initialState, actions.headerSetArchetype('warrior') ) ).toMatchObject(refState);
});

it('HEADER_SET_RANK', () => {
  const refState = headerReducer(initialState, actions.headerSetRank('4th_rank') );
  expect( refState ).toMatchSnapshot();
  expect( globalReducer(initialState, actions.headerSetRank('4th_rank') ) ).toMatchObject(refState);
});

it('JUNK', () => {
  const junk = { type: 'JUNK_ACTION' };
  expect( headerReducer(initialState, junk as IHeaderAction )).toMatchSnapshot();
});
