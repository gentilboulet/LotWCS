import produce from "immer"

import * as constants from 'perks/constants/bonuses';
import { IBonus, isBonus } from 'perks/types/bonuses';

import * as chi from 'state/chi';
import { maxSkillBonus } from 'state/derived';
import * as skills from 'state/skills';

import { IStoreState } from 'state/type';

export function applyBonuses(baseState: IStoreState, bonuses: IBonus[]): IStoreState {
  const nextState = produce(baseState, draftState => {
    bonuses.filter((bonus: IBonus) => isBonus(bonus))
    .forEach((bonus: IBonus) => {
      switch (bonus.type) {
        case constants.BONUS_DESTINY:
        draftState.destiny += bonus.value;
        break;
        case constants.BONUS_ENTANGLEMENT:
        draftState.entanglement += bonus.value;
        break;
        case constants.BONUS_CHI:
        chi.increase(draftState.chi, bonus.chi, bonus.value);
        break;
        case constants.BONUS_CULTIVATION:
        chi.increaseCultivation(draftState.chi, bonus.chi, bonus.value);
        break;
        case constants.BONUS_SKILL_RANK:
        const max = maxSkillBonus(draftState);
        skills.increase(draftState.skills, bonus.skill, max ? max : 0);
        break;
        case constants.BONUS_SPECIALITY:
        skills.addSpeciality(draftState.skills, bonus.skill, bonus.speciality);
        break;
        default:
        return;
      }
    });
  });
  return nextState;
}
