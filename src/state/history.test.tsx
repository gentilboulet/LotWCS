import { IAction } from 'state/actions/types';
import { IStoreState } from 'state/type';

import * as header from 'state/actions/header';
import { resetToInitialState } from 'state/actions/initial';
import { initialStateFactory } from 'state/initial';

import { replayHistory } from './history';

const initialState: IStoreState = initialStateFactory();

describe('Testing pushToHistory', () => {
  it('should push actions to history', () => {
    const action = header.setName('Dummy Name');
    expect( initialState.history[0] ).toMatchObject( resetToInitialState() );

    const state = Object.assign({}, initialState);
    state.history.push(action);
    expect( state.history[0] ).toMatchObject( initialState.history[0] );
    expect( state.history[1] ).toMatchObject( action );
  });
});

describe('Testing replayHistory', () => {
  it('should replay an history of actions', () => {
    const actions: IAction[] = [
      resetToInitialState(),
      header.setName('Roberts'),
      header.setConcept('Dread pirate Roberts'),
      resetToInitialState(),
      header.setName('John')
    ];
    const state = replayHistory(initialState, actions);
    expect( state ).toMatchSnapshot();
    expect( state.name ).toBe('John');
    expect( state.concept ).toBeUndefined();
    expect( state.history.length === (actions.length + 1) );
  });
});
