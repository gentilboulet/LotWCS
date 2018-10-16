import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import History from 'containers/Character/History';

class RouteHistory extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><History /></Character>;
  }
}

export default RouteHistory;
