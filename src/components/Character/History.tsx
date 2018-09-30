import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { IAction }  from 'state/actions/types';

export interface IHistoryProps {
  history: IAction[];
  onDelete: (id: number) => void;
}

class History extends React.Component<IHistoryProps, {}> {
  public render() {
    let idx: number = 0;
    return(
      <Container className="History">
        <Col>
          {this.props.history.map(
            (action: IAction) => { return (
              <Row key={'rowHistory_' + idx++}>
                <Col>{action.type}</Col>
                <Col>{JSON.stringify(action)}</Col>
              </Row> ); }
          )}
        </Col>
      </Container>
    );
  }
}

export default History;
