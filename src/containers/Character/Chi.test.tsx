import * as React from "react";
import * as ReactDOM from "react-dom";
import Chi from "./Chi";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer, testingStateFactory } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory()
);

describe("Testing the Chi container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Chi name="wood" />
      </Provider>,
      div
    );
  });
});
