import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from 'components/Header';

class TestView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Header />
        <span> Testing something </span>
      </div>
    );
  }
}

export default TestView;
