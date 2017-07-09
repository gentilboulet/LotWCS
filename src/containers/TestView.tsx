import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Header from '../components/Header';
import App from '../components/App';

class TestView extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <Header />
        <App />
      </div>
    );
  }
}

export default TestView;
