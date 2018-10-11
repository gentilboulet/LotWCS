import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import ExternalKungFu from 'containers/Character/ExternalKungFu';
import { externalKungfu } from 'data/kungfu';

const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
}

class ExternalKungFuList extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Container style={styles}>
      {externalKungfu.sort((a, b) => a.name.localeCompare(b.name) )
        .map(kungfu =>
          <Row key={kungfu.uid}><Col>
                <ExternalKungFu uid={kungfu.uid} />
          </Col></Row>
        )
      }
      </Container>
    );
  }
}

export default ExternalKungFuList;
