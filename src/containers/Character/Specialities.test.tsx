import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as renderer from 'react-test-renderer';
import Specialities from "./Specialities";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer, testingStateFactory } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory()
);

describe("Testing the Specialitiess container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Specialities skill={"Awareness"} />
      </Provider>,
      div
    );
  });
});
