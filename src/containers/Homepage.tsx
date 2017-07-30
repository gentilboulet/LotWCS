import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';
import CharacterHeader from '../containers/CharacterHeader';

class Homepage extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Header />
        <CharacterHeader />
      </div>
    );
  }
}

export default Homepage;
