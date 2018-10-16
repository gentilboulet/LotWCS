import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import PlaceHodler from 'components/PlaceHolder';


class RouteConditions extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><PlaceHodler>Soon to be Conditions</PlaceHodler></Character>;
  }
}

export default RouteConditions;
