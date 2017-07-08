import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ILoresheet } from '../types/loresheets';

export interface IKnownLoresheetsProps {
  name: string;
  bonuses: number[];
}

export interface ICharacterLoresheetsProps {
  categories: string[];
  knownLoresheets: IKnownLoresheetsProps[];
  loresheets: ILoresheet[];
}

class CharacterLoresheets extends React.Component<ICharacterLoresheetsProps, object> {
  render() {
    let idxCat: number = 0;
    return(
      <Container className="CharacterHistory">
        {
          this.props.categories.map(
            (category: string) => {
              return (
              <Container key={'rowLoresheetsCategory_' + idxCat++}>
                <Row>
                  <Col>{category}</Col>
                </Row>
                {this.props.loresheets
                  .filter((ls: ILoresheet) => { return (ls.category === category); })
                  .map((ls: ILoresheet) => {
                    return (
                      <Row key={'rowLoresheets_' + ls.uid}>
                        <Col>{ls.name}</Col>
                        <Col>{ls.description}</Col>
                        <Col>{ls.cost}</Col>
                      </Row>
                    );
                  })
                }
              </Container>);
            })
        }
      </Container>
    );
  }
}

export default CharacterLoresheets;
