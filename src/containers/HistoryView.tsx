import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from 'components/Header';
import History from 'containers/Character/History';

class HistoryView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Header />
        <History />
      </div>
    );
  }
}

export default HistoryView;
