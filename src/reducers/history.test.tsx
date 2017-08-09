import { pushToHistory, replayHistory } from './history';
import { initialStateFactory } from './initial';
import { IAction } from '../actions/types';
import { IStoreState } from '../state/types';

import * as header from '../actions/header';
import { resetToInitialState } from '../actions/initial';
import { historyDeleteUpTo, IHistoryAction } from '../actions/history';
import { historyReducer } from './history';

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

describe('Testing historyReducer', () => {
  it('should receive an HISTORY_DELETE action', () => {
    const actions: IAction[] = [
      resetToInitialState(),
      header.setName('Roberts'),
      header.setConcept('Dread pirate Roberts'),
      header.setArchetype('warrior'),
      header.setRank('4th_rank'),
    ];
    const stateBefore = replayHistory(initialState, actions);
    expect( stateBefore ).toMatchSnapshot();
    const state = replayHistory(stateBefore, [historyDeleteUpTo(1)]);
    expect( state ).toMatchSnapshot();
    expect( state.get('name') ).toBe('Roberts');
    expect( state.get('concept') ).toBe('No Concept');
    expect( state.get('history').length === (1 + 1) );
  });

  it('should do nothing with a junk action', () => {
    const junk = { type: 'JUNK_ACTION' };
    expect( historyReducer(initialState, junk as IHistoryAction )).toMatchSnapshot();
  });
});
