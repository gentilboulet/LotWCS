import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';

import Body from 'components/Character/Body';

class Homepage extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><Body /></Character>;
  }
}

export default Homepage;
