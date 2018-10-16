import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import PlaceHodler from 'components/PlaceHolder';


class RouteEquipment extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><PlaceHodler>Soon to be Equipment</PlaceHodler></Character>;
  }
}

export default RouteEquipment;
