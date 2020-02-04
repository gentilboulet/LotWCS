import * as React from "react";
import * as ReactDOM from "react-dom";
import Loresheet from "./Loresheet";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(globalReducer);

describe("Testing the Loresheet container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Loresheet uid="wulin" />
      </Provider>,
      div,
    );
  });
});
