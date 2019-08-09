import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./index";

import { testingStateFactory } from "../state/initial";
import { IStoreState } from "../state/type";

describe("Testing the App component", () => {
  const store = createStore<IStoreState, any, any, any>(
    (state: any) => state,
    testingStateFactory()
  );

  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });
});
