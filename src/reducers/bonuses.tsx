import { IBonus, isBonus } from '../types/bonuses';
import { IStoreState } from '../types/state';
import * as constants from '../constants/bonuses';

export function applyBonuses(oldState: IStoreState, bonuses: IBonus[]): IStoreState {
  return oldState.withMutations(state => {
    bonuses
      .filter((bonus: IBonus) => { return isBonus(bonus); })
      .forEach((bonus: IBonus) => {
        switch (bonus.type) {
          case constants.BONUS_DESTINY:
            const d = state.get('destiny');
            state.set('destiny', d + bonus.value);
            break;
          case constants.BONUS_ENTANGLEMENT:
            const e = state.get('entanglement');
            state.set('entanglement', e + bonus.value);
            break;
          case constants.BONUS_STARTING_CHI:
            state.set('chi', bonus.value);
            break;
          default:
            return;
        }
    });
  });
}
