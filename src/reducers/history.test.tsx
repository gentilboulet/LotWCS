import { pushToHistory, replayHistory } from './history';
import { initialStateFactory } from './initial';
import { IAction } from '../types/actions';
import { IStoreState } from '../types/state';

import { headerSetName, headerSetConcept } from '../actions/header';
import { resetToInitialState } from '../actions/initial';

const initialState: IStoreState = initialStateFactory();

it('initialState', () => {
  expect( initialState ).toMatchSnapshot();
});

it('pushToHistory', () => {
  expect( pushToHistory(initialState, headerSetName('Dummy name'))).toMatchSnapshot();
});

it('replayHistory', () => {
  const actions: IAction[] = [
    resetToInitialState(),
    headerSetName('Name'),
    headerSetConcept('Concept'),
    resetToInitialState(),
    headerSetName('Name2')
  ];
  expect( replayHistory(initialState, actions)).toMatchSnapshot();
});
