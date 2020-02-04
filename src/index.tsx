/* eslint-disable import/first */
/* Redux and state management */
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

/* React and DOM management */
import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  globalReducer,
  IAction,
  initialStateFactory,
  IStoreState,
} from "./state";
import { middleware as applyPerks } from "./state/character/middleware/applyPerks";
import { middleware as payCosts } from "./state/character/middleware/payCosts";
import { middleware as checkAutomatics } from "./state/middleware/automatics";
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
