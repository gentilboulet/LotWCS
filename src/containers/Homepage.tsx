import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Header from '../components/Header';
import Radio from '../components/Radio';

import { archetypes } from '../data/archetypes';
import { ranks } from '../data/ranks';

class Homepage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <Header />
        <Radio title="Archetype" choices={archetypes} />
        <Radio title="Rank" choices={ranks} />
      </div>
    );
  }
}

export default Homepage;
