import * as React from "react";
import * as ReactDOM from "react-dom";
import LoresheetOption from "./LoresheetOption";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer, testingStateFactory } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory(),
);

describe("Testing the LoresheetOption container", () => {
  it("should render without crashing", () => {
    const tbody = document.createElement("tbody");
    ReactDOM.render(
      <Provider store={store}>
        <LoresheetOption lsUid="wulin" uid="tieswithanother" />
      </Provider>,
      tbody,
    );
  });
});
