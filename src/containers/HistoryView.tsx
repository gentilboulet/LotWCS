import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from 'components/Header';
import CharacterHistory from 'containers/CharacterHistory';

class HistoryView extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Header />
        <CharacterHistory />
      </div>
    );
  }
}

export default HistoryView;
