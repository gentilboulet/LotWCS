/* Redux and state management */
import * as Immutable from 'immutable';
import { createStore } from 'redux';
import { headerReducer } from './reducers/header';
import { StoreState } from './types/index';
import { Provider } from 'react-redux';
import { devToolsEnhancer  } from 'redux-devtools-extension';

const initialState = Immutable.fromJS({
  name: 'No Name',
  concept: 'No Concept'
});

const store = createStore<StoreState>(
  headerReducer,
  initialState,
  devToolsEnhancer({})
);

/* React and DOM management */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';

ReactDOM.render(
  <div>
  <Provider store={store}>
  <App />
  </Provider>
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
