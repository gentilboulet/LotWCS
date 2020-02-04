import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as renderer from 'react-test-renderer';
import Virtues from "./Virtues";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(globalReducer);

describe("Testing the Virtuess container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Virtues />
      </Provider>,
      div,
    );
  });
});
