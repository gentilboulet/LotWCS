import { IBonus, isBonus } from '../types/bonuses';
import { IStoreState, IStoreSkillJS, IStoreSkillSpecialityJS } from '../types/state';
import * as constants from '../constants/bonuses';
import * as derived from '../containers/derived';

export function applyBonuses(oldState: IStoreState, bonuses: IBonus[]): IStoreState {
  return oldState.withMutations(state => {
    bonuses.filter((bonus: IBonus) => { return isBonus(bonus); })
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
        case constants.BONUS_SKILL_RANK:
          const idx = state.get('skills')
            .findIndex((s: IStoreSkillJS) => { return s.name === bonus.skill; });

          if (state.getIn(['skills', idx]).value + 5 >  derived.maxSkillBonus(state)) {
            throw 'Something went wrong, skill overflow';
          }

          state.updateIn(['skills', idx], (s: IStoreSkillJS) => {
            s.value += 5; return s;
          });
          break;
        case constants.BONUS_SPECIALITY:
          const skillIdx = state.get('skills')
            .findIndex((s: IStoreSkillJS) => { return s.name === bonus.skill; });
          const specialities = state.getIn(['skills', skillIdx]).specialities;
          const speIdx = specialities.findIn((spe: IStoreSkillSpecialityJS) => {
            return spe.name === bonus.speciality;
          });

          if (state.getIn(['skills', skillIdx]).specialities[speIdx].bought) {
            throw 'Something went wrong, speciality already bought';
          }

          state.setIn(['skills', skillIdx, 'specialities', speIdx, 'bought'], true);

          break;
        default:
          return;
      }
    });
  });
}
