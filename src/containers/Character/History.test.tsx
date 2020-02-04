import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as renderer from 'react-test-renderer';
import History from "./History";

import { IAction, IStoreState } from "../../state/type";

import { createStore } from "redux";
import { globalReducer } from "../../state";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(globalReducer);

describe("Testing the History container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <History />
      </Provider>,
      div,
    );
  });
});
