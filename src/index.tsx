/* Redux and state management */
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer  } from 'redux-devtools-extension';

/* React and DOM management */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { globalReducer } from './state/reducers/global';
import { initialStateFactory } from './state/initial';
import { IStoreState } from './state/types';

const store = createStore<IStoreState>(
  globalReducer,
  initialStateFactory(),
  devToolsEnhancer({})
);

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

/* Pages */
import Homepage from './containers/Homepage';
import TestView from './containers/TestView';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/test" component={TestView} />
        </div>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
