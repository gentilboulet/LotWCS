import { IStoreState } from '../types/state';
import { ICost } from '../types/costs';

import { updateReductions } from './reductions';

export function applyCost(oldState: IStoreState, cost: ICost): IStoreState {
  return oldState.withMutations(state => {
    state.set('destiny', state.get('destiny') - cost.destiny);
    state.set('entanglement', state.get('entanglement') - cost.entanglement);

    if (state.get('destiny') < 0) { throw 'Negative destiny reached'; }
    if (state.get('entanglement') < 0) { throw 'Negative entanglement reached'; }
    updateReductions(state, cost);
  });
}
