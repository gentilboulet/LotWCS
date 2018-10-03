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
import App from 'routes/App';
import HistoryView from 'routes/HistoryView';
import Homepage from 'routes/Homepage';
import TestView from 'routes/TestView';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Route exact={true} path="/" component={Homepage} />
	        <Route exact={true} path="/app" component={App} />
          <Route exact={true} path="/history" component={HistoryView} />
          <Route exact={true} path="/test" component={TestView} />
        </div>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
