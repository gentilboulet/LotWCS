import { ICost } from '../types/costs';
import { IStoreState } from '../types/state';

import { updateDiscounts } from './discounts';

export function applyCost(oldState: IStoreState, cost: ICost): IStoreState {
  return oldState.withMutations(state => {
    state.set('destiny', state.get('destiny') - cost.destiny);
    state.set('entanglement', state.get('entanglement') - cost.entanglement);

    if (state.get('destiny') < 0) { throw new Error('Negative destiny reached'); }
    if (state.get('entanglement') < 0) { throw new Error('Negative entanglement reached'); }
    updateDiscounts(state, cost);
  });
}
