import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import EditText from '../../components/EditText';

export interface Props {
  name: string;
  concept: string;
  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
}
/* tslint:disable:no-console */
class CharacterHeader extends React.Component<Props, object> {
  render() {
    return (
      <Container className="CharacterHeader">
        <Row>
          <EditText
            header="Character Name"
            default={this.props.name}
            validate={(s: string) => { return s.length > 0; }}
            onSubmit={(s: string) => { this.props.onSetName(s); }}
          />
        </Row>
        <Row>
          <EditText
            header="Character Concept"
            default={this.props.concept}
            validate={(s: string) => { return s.length >= 0; }}
            onSubmit={(s: string) => { this.props.onSetConcept(s); }}
          />
        </Row>
        <Row>
          <Col>
            <div>Character Archetype : </div><div>ArchetypeValue</div>
          </Col>
          <Col>
            <div>Character Rank : </div><div>RankValue</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharacterHeader;
