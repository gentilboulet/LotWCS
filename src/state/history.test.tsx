import { IAction } from 'state/actions/types';
import { IStoreState } from 'state/types';

import * as header from 'state/actions/header';
import { resetToInitialState } from 'state/actions/initial';
import { initialStateFactory } from 'state/initial';

import { pushToHistory, replayHistory } from './history';

const initialState: IStoreState = initialStateFactory();

describe('Testing pushToHistory', () => {
  it('should push actions to history', () => {
    const action = header.setName('Dummy Name');
    expect( initialState.getIn(['history', 0]) ).toMatchObject( resetToInitialState() );

    const state = pushToHistory(initialState, action);
    expect( state.getIn(['history', 0]) ).toMatchObject( initialState.getIn(['history', 0]) );
    expect( state.getIn(['history', 1]) ).toMatchObject( action );
  });
});

describe('Testing replayHistory', () => {
  it('should replay an history of actions', () => {
    const actions: IAction[] = [
      resetToInitialState(),
      header.setName('Roberts'),
      header.setConcept('Dread pirate Robert'),
      resetToInitialState(),
      header.setName('John')
    ];
    const state = replayHistory(initialState, actions);
    expect( state ).toMatchSnapshot();
    expect( state.get('name') ).toBe('John');
    expect( state.get('concept') ).toBe('No Concept');
    expect( state.get('history').length === (actions.length + 1) );
  });
});
