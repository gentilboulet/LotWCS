import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import DDLText from 'components/DDLText';
import EditText from 'components/EditText';
import StaticText from 'components/StaticText';

import * as dataArchetypes from 'data/archetypes';
import * as dataRanks from 'data/ranks';

export interface ICharacterHeaderProps {
  name: string | undefined;
  concept: string | undefined;
  archetype: string | undefined;
  rank: {name: string, value: number}| undefined;
  destiny: number;
  entanglement: number;

  onSetName: (s: string) => void;
  onSetConcept: (s: string) => void;
  onSetArchetype: (s: string) => void;
  onSetRank: (s: string) => void;

  lockArchetype: boolean;
  lockRank: boolean;
}

class CharacterHeader extends React.Component<ICharacterHeaderProps, {}> {
  public render() {
    return (
      <Container className="CharacterHeader">
        <Row>
          <EditText
            header="Character Name"
            default={this.props.name}
            validate={this.isStringNotNull}
            onSubmit={this.props.onSetName}
          />
        </Row>
        <Row>
          <EditText
            header="Character Concept"
            default={this.props.concept}
            validate={this.isStringNotNull}
            onSubmit={this.props.onSetConcept}
          />
        </Row>
        <Row>
          <Col>
            <DDLText
              header="Character Archetype"
              default={this.props.archetype}
              values={dataArchetypes.archetypes.map( ({name: n, key: k}) => ({ label: n, key: k}) )}
              onSubmit={this.props.onSetArchetype}
              locked={this.props.lockArchetype}
            />
          </Col>
          <Col>
            <DDLText
              header="Character Rank"
              default={this.props.rank ? this.props.rank.name : '' }
              values={dataRanks.ranks.map( ({name: n, key: k}) => ({ label: n, key: k}) )}
              onSubmit={this.props.onSetRank}
              locked={this.props.lockRank}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <StaticText
              header="Destiny"
              value={this.props.destiny.toString()}
            />
          </Col>
          <Col>
            <StaticText
              header="Entanglement"
              value={this.props.entanglement.toString()}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  private isStringNotNull(s: string): boolean { return s.trim().length > 0; };
}

export default CharacterHeader;
