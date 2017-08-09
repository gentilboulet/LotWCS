import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import App from 'components/App';
import Header from 'components/Header';

class TestView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Header />
        <App />
      </div>
    );
  }
}

export default TestView;
