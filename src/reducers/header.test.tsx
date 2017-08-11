import { IStoreState } from '../types/state';
import { IHeaderAction } from '../actions/header';

import { initialStateFactory } from './initial';
import * as actions from '../actions/header';
import { headerReducer } from './header';
import { globalReducer } from './global';

const initialState: IStoreState  = initialStateFactory();

describe('Testing headerReducer', () => {
  it('should receive a HEADER_SET_NAME action', () => {
    expect( initialState.get('name') ).toBe('No Name');
    const action = actions.setName('Robert');
    const state = headerReducer(initialState, action);
    expect ( state.get('name') ).toBe('Robert');
    expect( globalReducer(initialState, action) ).toMatchObject(state);
  });

  it('should receive a HEADER_SET_CONCEPT action', () => {
    expect( initialState.get('concept') ).toBe('No Concept');
    const action = actions.setConcept('The Black Dog of Jianghu');
    const state = headerReducer(initialState, action);
    expect ( state.get('concept') ).toBe('The Black Dog of Jianghu');
    expect( globalReducer(initialState, action) ).toMatchObject(state);
  });

  it('should receive a HEADER_SET_ARCHETYPE action', () => {
    expect( initialState.get('archetype') ).toBe('');
    const action = actions.setArchetype('warrior');
    const state = headerReducer(initialState, action);
    expect ( state.get('archetype') ).toBe('warrior');
    expect( globalReducer(initialState, action) ).toMatchObject(state);
  });

  it('should receive a HEADER_SET_RANK action', () => {
    expect( initialState.get('rank') ).toBe('');
    const action = actions.setRank('4th_rank');
    const state = headerReducer(initialState, action);
    expect ( state.get('rank') ).toBe('4th_rank');
    expect( globalReducer(initialState, action) ).toMatchObject(state);
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( headerReducer(initialState, junk as IHeaderAction )).toMatchSnapshot();
  });
});
