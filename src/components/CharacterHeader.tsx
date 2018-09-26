import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import DDLText from 'components/DDLText';
import EditText from 'components/EditText';

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
// tslint:disable-next-line jsx-no-lambda
            validate={(s: string) => (s.trim().length > 0)}
// tslint:disable-next-line jsx-no-lambda
            onSubmit={(s: string) => { this.props.onSetName(s); }}
          />
        </Row>
        <Row>
          <EditText
            header="Character Concept"
            default={this.props.concept}
// tslint:disable-next-line jsx-no-lambda
            validate={(s: string) => (s.trim().length > 0)}
// tslint:disable-next-line jsx-no-lambda
            onSubmit={(s: string) => { this.props.onSetConcept(s); }}
          />
        </Row>
        <Row>
          <Col>
            <DDLText
              header="Character Archetype"
              default={this.props.archetype}
              values={dataArchetypes.archetypes.map( ({name: n, key: k}) => ({ label: n, key: k}) )}
// tslint:disable-next-line jsx-no-lambda
              onSubmit={(s: string) => { this.props.onSetArchetype(s); }}
              locked={this.props.lockArchetype}
            />
          </Col>
          <Col>
            <DDLText
              header="Character Rank"
              default={this.props.rank ? this.props.rank.name : '' }
              values={dataRanks.ranks.map( ({name: n, key: k}) => ({ label: n, key: k}) )}
// tslint:disable-next-line jsx-no-lambda
              onSubmit={(s: string) => { this.props.onSetRank(s); }}
              locked={this.props.lockRank}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditText
              header="Destiny"
              default={(this.props.destiny).toString()}
// tslint:disable-next-line jsx-no-lambda
              validate={(s: string) => false}
// tslint:disable-next-line jsx-no-lambda
              onSubmit={(s: string) => { return; }}
              locked={true}
            />
          </Col>
          <Col>
            <EditText
              header="Entanglement"
              default={(this.props.entanglement).toString()}
// tslint:disable-next-line jsx-no-lambda
              validate={(s: string) => false }
// tslint:disable-next-line jsx-no-lambda
              onSubmit={(s: string) => { return ; }}
              locked={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharacterHeader;
