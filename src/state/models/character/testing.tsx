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
  ];
  let state = initialStateFactory();
  actions.forEach(a => (state = globalReducer(state, a)));
  return state;
};
