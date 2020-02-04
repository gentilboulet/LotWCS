import { actions as characterActions } from "../../actions/character";
import { globalReducer } from "../../reducers/character";
import { zeroCost } from "./costs";
import { initialStateFactory } from "./index";

export const testingStateFactory = () => {
  const actions = [
    characterActions.setName("Testing state"),
    characterActions.setRank(2),
    characterActions.skillsBuy("Awareness", zeroCost),
    characterActions.skillSpecialityBuy(
      "Confidence",
      "Appear steadfast",
      zeroCost,
    ),
    characterActions.skillSpecialityBuy(
      "Confidence",
      "Another speciality",
      zeroCost,
    ),
    characterActions.armorBuy(
      "heavy han armor",
      "Heavy armor worn by soldiers of the Forbidden City",
      "Heavy Armor",
      zeroCost,
    ),
    characterActions.weaponBuy(
      "Flexible simple weapon",
       "Flexible snake sword",
       ["Massive"],
       zeroCost
    ),
    characterActions.weaponBuy(
       "Horse splitter",
       "A sword so big it could chop horses in one cleave",
      ["Massive", "Sword"],
      zeroCost
    )

  ];
  let state = initialStateFactory();
  actions.forEach(a => (state = globalReducer(state, a)));

  return state;
};
