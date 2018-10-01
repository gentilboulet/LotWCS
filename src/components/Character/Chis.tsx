import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Chi from 'containers/Character/Chi';
import { chiNames, TChiName } from 'data/chi';

const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
}

class Chis extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Container style={styles}>{
        chiNames.map((name: TChiName) => {
          return <Row key={name} style={styles.row}>
                  <Col><Chi name={name} /></Col>
                </Row>;
        })
      }</Container>
    );
  }
}

export default Chis;
