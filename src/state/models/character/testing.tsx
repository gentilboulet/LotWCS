import { actions as characterActions } from "../../actions/character";
import { initialStateFactory } from "./index";
import { zeroCost } from "./costs";
import { globalReducer } from "../../reducers/character";

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
  ];
  let state = initialStateFactory();
  actions.forEach(a => (state = globalReducer(state, a)));
  return state;
};
