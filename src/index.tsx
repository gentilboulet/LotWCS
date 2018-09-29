/* Redux and state management */
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer  } from 'redux-devtools-extension';

/* React and DOM management */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { IAction } from 'state/actions/types';
import { testingStateFactory } from 'state/initial';
import { globalReducer } from 'state/reducers/global';
import { IStoreState } from 'state/type';

const store = createStore<IStoreState, IAction, any, any>(
  globalReducer,
  testingStateFactory(),
  devToolsEnhancer({})
);

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

/* Pages */
/* tslint:disable:ordered-imports */
import Homepage from 'containers/Homepage';
import TestView from 'containers/TestView';
import HistoryView from 'containers/HistoryView';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/test" component={TestView} />
          <Route exact={true} path="/history" component={HistoryView} />
        </div>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
