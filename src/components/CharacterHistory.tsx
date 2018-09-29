import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { IAction }  from 'state/actions/types';

export interface ICharacterHistoryProps {
  history: IAction[];
  onDelete: (id: number) => void;
}

class CharacterHistory extends React.Component<ICharacterHistoryProps, {}> {
  public render() {
    let idx: number = 0;
    return(
      <Container className="CharacterHistory">
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

export default CharacterHistory;
