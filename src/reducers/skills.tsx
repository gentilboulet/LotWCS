import { ISkillAction } from '../actions/skills';
import { IStoreState, IStoreStateSkillJS } from '../types/state';
import * as constants from '../constants/skills';

// Sub Reducers
import { applyCost } from './costs';
import { pushToHistory } from './history';

export function skillsReducer(oldState: IStoreState, action: ISkillAction): IStoreState {
  switch (action.type) {
    case constants.SKILLS_BUY:
      return oldState.withMutations(state => {

        const idx = state.get('skills')
            .findIndex((s: IStoreStateSkillJS) => { return s.name === action.name; });

        state.updateIn(['skills', idx], (s: IStoreStateSkillJS) => {
          s.value += 5; return s;
        });

        applyCost(state, action.cost);
        pushToHistory(state, action);
      });
    default:
  }
  return oldState;
}
