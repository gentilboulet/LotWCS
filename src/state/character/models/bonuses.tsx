import { ICharacterState } from "./type";

import { IBonus, isBonus } from "../../../perks/bonuses";
import * as constants from "../../../perks/constants/bonuses";

import * as chi from "./chi";

import { maxSkillBonus } from "./derived";
import * as skills from "./skills";

import * as loresheets from "./loresheets";

export type TBonusesState = IBonus[];

export function createState(): TBonusesState {
  return [];
}

export function applyBonuses(
  draftState: ICharacterState,
  bonuses: IBonus[]
): void {
  bonuses
    .filter((bonus: IBonus) => isBonus(bonus))
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
          // TODO : overflows
          skills.increase(draftState.skills, bonus.skill, max);
          break;
        case constants.BONUS_SPECIALITY:
          // TODO : already speciality
          skills.addSpeciality(
            draftState.skills,
            bonus.skill,
            bonus.speciality
          );
          break;
        case constants.BONUS_LORESHEET:
          loresheets.openLoresheet(draftState.loresheets, bonus.lsUid);
          break;
        case constants.BONUS_LORESHEET_OPTION:
          loresheets.buyLoresheetOption(
            draftState.loresheets,
            bonus.lsUid,
            bonus.uid,
            bonus.payload
          );
          break;
        default:
          break;
      }
    });
}
