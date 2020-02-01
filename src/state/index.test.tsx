/* eslint-disable import/first */
/* Redux and state management */
import { applyMiddleware, compose, createStore } from "redux";

import {
  globalReducer,
  IAction,
  IStoreState,
  initialStateFactory,
} from "./index";
import { middleware as pushToHistory } from "./middleware/pushToHistory";
import { middleware as checkAutomatics } from "./middleware/character/automatics";
import { middleware as applyPerks } from "./middleware/character/applyPerks";
import { middleware as payCosts } from "./middleware/character/payCosts";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  initialStateFactory(),
  compose(),
  // applyMiddleware(payCosts),
  // applyMiddleware(checkAutomatics),
  // applyMiddleware(pushToHistory),
  // applyMiddleware(applyPerks),
);

import { setName } from "./actions/character/header";
import { skillsBuy } from "./actions/character/skills";
import { zeroCost } from "./models/character/costs";

describe("Placeholder", () => {
  it("should play actions", () => {
    const actions = [
      setName("Bob"),
      // setRank(2),
      // setArchetype("warrior"),
      skillsBuy("Awareness", zeroCost),
      // skillsBuy(0, zeroCost),
      // skillSpecialityBuy("Awareness", "Hear", zeroCost),
      // skillSpecialityBuy("Awareness", "Sight", zeroCost),
    ];
    actions.forEach(a => {
      store.dispatch(a);
    });
    expect(store.getState()).toMatchSnapshot();
  });
});
