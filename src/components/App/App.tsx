import * as React from 'react';
import { Container, Row, } from 'reactstrap';
import CharacterHeader from '../../containers/CharacterHeader';
import CharacterBody from '../../containers/CharacterBody';

import './App.css';

export interface Props {}

class App extends React.Component<Props, object> {
  render() {
    return (
      <Container className="App">
        <Row>
          <h1>Legends of the Wulin Character Sheet</h1>
        </Row>
        <Row>
          <CharacterHeader />
        </Row>
        <Row>
          <CharacterBody />
        </Row>
      </Container>
    );
  }
}

export default App;
