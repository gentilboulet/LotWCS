import { IStoreState } from '../types/state';
import { ICost } from '../types/costs';

import { updateReductions } from './reductions';

export function applyCost(oldState: IStoreState, cost: ICost): IStoreState {
  // I don't know why, tests do not trigger a tslint error
  if (typeof cost === 'undefined') { throw 'Internal error - undefined cost'; }
  return oldState.withMutations(state => {
    state.set('destiny', state.get('destiny') - cost.destiny);
    state.set('entanglement', state.get('entanglement') - cost.entanglement);

    if (state.get('destiny') < 0) { throw 'Negative destiny reached'; }
    if (state.get('entanglement') < 0) { throw 'Negative entanglement reached'; }
    updateReductions(state, cost);
  });
}
