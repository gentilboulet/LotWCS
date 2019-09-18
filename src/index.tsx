/* eslint-disable import/first */
/* Redux and state management */
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

/* React and DOM management */
import * as React from "react";
import * as ReactDOM from "react-dom";

import { IAction } from "./state/actions/types";
import { testingStateFactory } from "./state/initial";
import { pushToHistory } from "./state/middleware/history";
import { globalReducer } from "./state/reducers/global";
import { IStoreState } from "./state/type";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory(),
  compose(
    applyMiddleware(pushToHistory),
    devToolsEnhancer({})
  )
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
  document.getElementById("root") as HTMLElement
);

serviceWorker.register();
