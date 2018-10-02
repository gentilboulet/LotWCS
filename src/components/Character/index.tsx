import * as React from 'react';
import { Container, Row } from 'reactstrap';

import Body from 'components/Character/Body';
import Header from 'containers/Character/Header';

import './Character.css';

class Character extends React.Component<{}, {}> {
  public render() {
    return (
      <Container className="Character">
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

export default Character;
