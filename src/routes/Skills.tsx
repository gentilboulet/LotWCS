import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Character from 'components/Character';
import Skills from 'components/Character/Skills';


class RouteSkills extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return <Character><Skills /></Character>;
  }
}

export default RouteSkills;
