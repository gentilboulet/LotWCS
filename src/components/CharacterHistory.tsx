import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IAction }  from '../types/actions';

export interface ICharacterHistoryProps {
  history: IAction[];
  onDelete: (id: number) => void;
}

class CharacterHistory extends React.Component<ICharacterHistoryProps, object> {
  render() {
    let idx: number = 0;
    return(
      <Container className="CharacterHistory">
        <Col>
          {this.props.history.map(
            (s: IAction) => { return (
              <Row key={'rowHistory_' + idx++}>
                <Col>{s.type}</Col>
              </Row> ); }
          )}
        </Col>
      </Container>
    );
  }
}

export default CharacterHistory;
