import { applyMiddleware, compose, createStore } from "redux";
import { actions as characterActions } from "../../actions/character";

import {
  globalReducer,
  IAction,
  initialStateFactory,
  IStoreState,
} from "../../../state";

import { middleware as applyPerks } from "../../../state/middleware/character/applyPerks";
import { middleware as checkAutomatics } from "../../../state/middleware/character/automatics";
import { middleware as payCosts } from "../../../state/middleware/character/payCosts";
import { middleware as pushToHistory } from "../../../state/middleware/pushToHistory";

import { zeroCost } from "./costs";

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
      zeroCost,
    ),
    characterActions.weaponBuy(
      "Horse splitter",
      "A sword so big it could chop horses in one cleave",
      ["Massive", "Sword"],
      zeroCost,
    ),
  ];

  const store = createStore<IStoreState, IAction, any, any>(
    globalReducer,
    initialStateFactory(),
    compose(
      applyMiddleware(payCosts),
      applyMiddleware(checkAutomatics),
      applyMiddleware(pushToHistory),
      applyMiddleware(applyPerks),
    ),
  );

  actions.forEach(a => {
    store.dispatch(a);
  });

  return store.getState().character;
};
