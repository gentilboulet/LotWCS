import { pushToHistory, replayHistory } from './history';
import { initialStateFactory } from './initial';
import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';

import * as header from '../actions/header';
import { resetToInitialState } from '../actions/initial';
import { historyDelete, IHistoryAction } from '../actions/history';
import { historyReducer } from './history';

const initialState: IStoreState = initialStateFactory();

it('initialState', () => {
  expect( initialState ).toMatchSnapshot();
});

it('pushToHistory', () => {
  expect( pushToHistory(initialState, header.headerSetName('Dummy name'))).toMatchSnapshot();
});

it('replayHistory', () => {
  const actions: IAction[] = [
    resetToInitialState(),
    header.headerSetName('Name'),
    header.headerSetConcept('Concept'),
    resetToInitialState(),
    header.headerSetName('Name2')
  ];
  expect( replayHistory(initialState, actions)).toMatchSnapshot();
});

it('deleteHistory', () => {
  const actions: IAction[] = [
    resetToInitialState(),
    header.headerSetName('SetName'),
    header.headerSetConcept('SetConcept'),
    header.headerSetArchetype('warrior'),
    header.headerSetRank('4th_rank'),
    historyDelete(2)
  ];
  expect( replayHistory(initialState, actions)).toMatchSnapshot();
});

it('JUNK_ACTION', () => {
  const junk = { type: 'JUNK_ACTION' };
  expect( historyReducer(initialState, junk as IHistoryAction )).toMatchSnapshot();
});
