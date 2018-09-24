import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { Tab } from './Tab';

describe('Testing the Tab component', () => {  
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tab title="title" tabId="id">This is a Tab</Tab>, div);
  });
   
  it('should render the inner Tab', () => {
    const tree = renderer.create(
	<Tab title="title" tabId="id"> This is a rendered Tab</Tab>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
