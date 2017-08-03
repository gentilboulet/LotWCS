import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import FieldHeader from './FieldHeader';

describe('Testing the FieldHeader component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = <FieldHeader label="something" />;
    ReactDOM.render(element, div);
    expect( renderer.create(element).toJSON() ).toMatchSnapshot();
  });
});
