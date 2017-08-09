import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as renderer from 'react-test-renderer';
import CharacterLoresheets from './CharacterLoresheets';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialStateFactory } from 'state/initial';
import { globalReducer } from 'state/reducers/global';
import { IStoreState } from 'state/types';

const store = createStore<IStoreState>(
  globalReducer,
  initialStateFactory()
);

describe('Testing the CharacterLoresheets container', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <CharacterLoresheets />
      </Provider>,
    div);
  });
});
