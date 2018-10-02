import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppHeader from 'components/AppHeader';

class TestView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppHeader />
        <span> Testing something </span>
      </div>
    );
  }
}

export default TestView;
