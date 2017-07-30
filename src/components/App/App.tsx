import * as React from 'react';
import { Container, Row } from 'reactstrap';

import CharacterBody from '../../components/CharacterBody';
import CharacterHeader from '../../containers/CharacterHeader';

import './App.css';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Container className="App">
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
