import * as React from "react";
import * as ReactDOM from "react-dom";
// import * as renderer from 'react-test-renderer';
import Skill from "./Skill";

import { createStore } from "redux";
import { IAction, IStoreState } from "../../state";
import { globalReducer } from "../../state/";

import { Provider } from "react-redux";

const store = createStore<IStoreState, IAction, any, any>(globalReducer);

describe("Testing the Skills container", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <Skill name={"Awareness"} />
      </Provider>,
      div,
    );
  });
});
