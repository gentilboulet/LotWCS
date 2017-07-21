import { IStoreState } from '../types/state';

import { initialStateFactory } from './initial';
import * as actions from '../actions/bonuses';
import { applyBonuses } from './bonuses';

const initialState: IStoreState  = initialStateFactory();

it('BONUS_DESTINY', () => {
  expect( applyBonuses(initialState, [actions.destiny(12)] ) ).toMatchSnapshot();
});

it('BONUS_ENTANGLEMENT', () => {
  expect( applyBonuses(initialState, [actions.entanglement(13)] ) ).toMatchSnapshot();
});

it('BONUS_STARTING_CHI', () => {
  expect( applyBonuses(initialState, [actions.startingChi(12)] ) ).toMatchSnapshot();
});
