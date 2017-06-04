import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { Tab, Tabs } from './Tabs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tabs />, div);
});

it('rendering interors Tabs', () => {
  const tree = renderer.create(
    <Tabs defaultTab="first">
      <Tab title="2nd" tabId="second"> The second content </Tab>
      <Tab title="1st" tabId="first"> The first content </Tab>
    </Tabs>).toJSON();
  expect(tree).toMatchSnapshot();
});
