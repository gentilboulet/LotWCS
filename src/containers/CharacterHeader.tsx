import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

export interface Props {}

class CharacterHeader extends React.Component<Props, object> {
  render() {
    return (
      <Container className="CharacterHeader">
        <Row>
            <div>Character Name : </div><div>NameValue</div>
        </Row>
        <Row>
            <div>Character Concept : </div><div>ConceptValue</div>
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
