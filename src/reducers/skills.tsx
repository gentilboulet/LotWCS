import { ISkillAction } from '../actions/skills';
import { IStoreState, IStoreSkillJS } from '../types/state';
import * as constants from '../constants/skills';

// Sub Reducers
import { applyCost } from './costs';
import { pushToHistory } from './history';

export function skillsReducer(oldState: IStoreState, action: ISkillAction): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
      return oldState.withMutations(state => {
        applyCost(state, action.cost);

        const idx = state.get('skills')
            .findIndex((s: IStoreSkillJS) => { return s.name === action.name; });

        state.updateIn(['skills', idx, 'value'], v => { return v + 5; });

        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}
