import * as React from 'react';
import { Container, Row } from 'reactstrap';

import Body from 'components/Character/Body';
import Header from 'containers/Character/Header';

import './App.css';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Container className="App">
        <Row>
          <Header />
        </Row>
        <Row>
          <Body />
        </Row>
      </Container>
    );
  }
}

export default App;
