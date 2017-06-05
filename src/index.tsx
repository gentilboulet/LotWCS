/* Redux and state management */
import { createStore } from 'redux';
import { initialState } from './reducers/initial';
import { headerReducer } from './reducers/header';
import { IStoreState } from './types/index';
import { Provider } from 'react-redux';
import { devToolsEnhancer  } from 'redux-devtools-extension';

const store = createStore<IStoreState>(
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
