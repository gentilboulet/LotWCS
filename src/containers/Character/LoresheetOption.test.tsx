import * as React from "react";
import * as ReactDOM from "react-dom";
import LoresheetOption from "./LoresheetOption";

import { IAction } from "../../state/actions/types";
import { IStoreState } from "../../state/type";

import { createStore } from "redux";
import { testingStateFactory } from "../../state/initial";
import { globalReducer } from "../../state/reducers/global";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory()
);

describe("Testing the LoresheetOption container", () => {
  it("should render without crashing", () => {
    const tbody = document.createElement("tbody");
    ReactDOM.render(
      <Provider store={store}>
        <LoresheetOption lsUid="wulin" uid="tieswithanother" />
      </Provider>,
      tbody
    );
  });
});