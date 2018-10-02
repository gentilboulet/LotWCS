import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppHeader from 'components/AppHeader';
import Character from 'components/Character';

class App extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppHeader />
        <Character />
      </div>
    );
  }
}

export default App;
