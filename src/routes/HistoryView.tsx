import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppHeader from 'components/AppHeader';
import History from 'containers/Character/History';

class HistoryView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppHeader />
        <History />
      </div>
    );
  }
}

export default HistoryView;
