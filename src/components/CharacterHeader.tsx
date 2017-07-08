import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import EditText from '../components/EditText';
import DDLText from '../components/DDLText';
import { archetypes } from '../data/archetypes';
import { ranks } from '../data/ranks';

export interface ICharacterHeaderProps {
  name: string;
  concept: string;
  rank: string;
  archetype: string;

  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
  onSetArchetype: (s: string) => void;
  onSetRank: (s: string) => void;

  lockArchetype: boolean;
  lockRank: boolean;
}

const editHeight = 56;

class CharacterHeader extends React.Component<ICharacterHeaderProps, object> {
  render() {
    return (
      <Container className="CharacterHeader">
        <Row>
          <EditText
            header="Character Name"
            default={this.props.name}
            height={editHeight}
            validate={(s: string) => { return s.length > 0; }}
            onSubmit={(s: string) => { this.props.onSetName(s); }}
          />
        </Row>
        <Row>
          <EditText
            header="Character Concept"
            default={this.props.concept}
            height={editHeight}
            validate={(s: string) => { return s.length >= 0; }}
            onSubmit={(s: string) => { this.props.onSetConcept(s); }}
          />
        </Row>
        <Row>
          <Col>
            <DDLText
              header="Character Archetype"
              default={this.props.archetype}
              height={editHeight}
              values={archetypes.map(
                ({name: n, key: k}) => { return {label: n, key: k}; }
              )}
              onSubmit={(s: string) => { this.props.onSetArchetype(s); }}
              locked={this.props.lockArchetype}
            />
          </Col>
          <Col>
            <DDLText
              header="Character Rank"
              default={this.props.rank}
              height={editHeight}
              values={ranks.map(
                ({name: n, key: k}) => { return {label: n, key: k}; }
              )}
              onSubmit={(s: string) => { this.props.onSetRank(s); }}
              locked={this.props.lockRank}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharacterHeader;
