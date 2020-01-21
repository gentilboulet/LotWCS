import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as renderer from 'react-test-renderer';
import History from "./History";

import { IAction } from "../../state/actions/types";
import { ICharacterState } from "../../state/type";

import { createStore } from "redux";
import { testingStateFactory } from "../../state/initial";
import { globalReducer } from "../../state/reducers/global";

import { Provider } from "react-redux";

const store = createStore<ICharacterState, IAction, any, any>(
  globalReducer,
  testingStateFactory()
);

describe("Testing the History container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <History />
      </Provider>,
      div
    );
  });
});
