import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { Tab } from './Tab';
import { Tabs } from './Tabs';

describe('Testing the Tabs component', () => {  
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tabs />, div);
  });

  it('should render the inner Tabs', () => {
    const tree = renderer.create(
      <Tabs defaultTab="first">
        <Tab title="2nd" tabId="second"> The second content </Tab>
        <Tab title="1st" tabId="first"> The first content </Tab>
      </Tabs>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
