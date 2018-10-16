import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import ChiList from 'components/Character/ChiList';


class RouteChi extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><ChiList /></Character>;
  }
}

export default RouteChi;
