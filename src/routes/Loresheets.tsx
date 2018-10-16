import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import LoresheetsList from 'components/Character/LoresheetsList';


class RouteLoresheets extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><LoresheetsList /></Character>;
  }
}

export default RouteLoresheets;
