import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import KungFuList from 'components/Character/KungFuList';


class RouteKungFu extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><KungFuList /></Character>;
  }
}

export default RouteKungFu;
