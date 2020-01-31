/* eslint-disable import/first */
/* Redux and state management */
import { applyMiddleware, compose, createStore } from "redux";

import {
  globalReducer,
  IAction,
  IStoreState,
  initialStateFactory,
} from "./index";
import { middleware as checkAutomatics } from "./middleware/automatics";
import { middleware as pushToHistory } from "./middleware/pushToHistory";
import { middleware as applyPerks } from "./character/middleware/applyPerks";
import { middleware as payCosts } from "./character/middleware/payCosts";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  initialStateFactory(),
  compose(),
  // applyMiddleware(payCosts),
  // applyMiddleware(checkAutomatics),
  // applyMiddleware(pushToHistory),
  // applyMiddleware(applyPerks),
);

import { setName, setArchetype, setRank } from "./character/actions/header";
import { skillsBuy, skillSpecialityBuy } from "./character/actions/skills";
import { zeroCost } from "./character/models/costs";

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
