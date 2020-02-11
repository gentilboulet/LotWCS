/* eslint-disable import/first */
/* Redux and state management */
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

/* React and DOM management */
import * as React from "react";
import * as ReactDOM from "react-dom";

/* FontAwesome icons */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCog,
  faGraduationCap,
  faPen,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faCog, faCheck, faPen, faPlus, faGraduationCap);

import {
  globalReducer,
  IAction,
  IStoreState,
  testingStateFactory as initialStateFactory,
} from "./state";

import { middleware as applyPerks } from "./state/middleware/character/applyPerks";
import { middleware as checkAutomatics } from "./state/middleware/character/automatics";
import { middleware as payCosts } from "./state/middleware/character/payCosts";
import { middleware as pushToHistory } from "./state/middleware/pushToHistory";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  initialStateFactory(),
  compose(
    applyMiddleware(payCosts),
    applyMiddleware(checkAutomatics),
    applyMiddleware(pushToHistory),
    applyMiddleware(applyPerks),
    devToolsEnhancer({}),
  ),
);

import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "./Grid.css";
import "./index.css";

import App from "./App";

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById("root") as HTMLElement,
);

serviceWorker.register();
