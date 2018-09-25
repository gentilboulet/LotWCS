import * as constants from 'perks/constants/bonuses';
import { IBonus, isBonus } from 'perks/types/bonuses';

import { IStoreState } from 'state/types';

import * as skills from 'state/skills';

export function applyBonuses(oldState: IStoreState, bonuses: IBonus[]): IStoreState {
  const ret = oldState.withMutations(state => {
    bonuses.filter((bonus: IBonus) => isBonus(bonus))
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
        case constants.BONUS_CHI:
          state.update('chi', chi => chi.increaseChi(bonus.chi, bonus.value) );
          break;
        case constants.BONUS_CULTIVATION:
	        state.update('chi', chi => chi.increaseCultivation(bonus.cultivation, bonus.value) );
          break;
        case constants.BONUS_SKILL_RANK:
          skills.increaseValue(state, bonus.skill);
          break;
        case constants.BONUS_SPECIALITY:
          skills.addSpeciality(state, bonus.skill, bonus.speciality);
          break;
        default:
          return;
      }
    });
  });
  return ret;
}
