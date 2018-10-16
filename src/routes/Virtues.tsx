import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import Virtues from 'containers/Character/Virtues';

class RouteVirtues extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><Virtues /></Character>;
  }
}

export default RouteVirtues;
