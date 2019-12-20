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
  state.gear.armors.push(
    {
      type: "Medium Armor",
      name: "medium armor name",
      description: "shiny medium armor",
    },
    {
      type: "Heavy Armor",
      name: "heavy han armor",
      description: "Heavy armor worn by soldiers of the Forbidden City",
    },
  );
  state.gear.weapons.push({
    type: ["Massive"],
    name: "Flexible simple weapon",
    description: "Flexible snake sword",
  });
  state.gear.weapons.push({
    type: ["Massive", "Sword"],
    name: "Horse splitter",
    description: "A sword so big it could chop horses in one cleave",
  });
  return state;
};
