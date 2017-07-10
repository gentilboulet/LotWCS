import * as React from 'react';
import { Container } from 'reactstrap';
import { ILoresheet } from '../../types/loresheets';
import LoresheetCategory from './LoresheetCategory';

export interface IKnownLoresheetsProps {
  name: string;
  bonuses: number[];
}

export interface ICharacterLoresheetsProps {
  categories: string[];
  knownLoresheets: IKnownLoresheetsProps[];
  loresheets: ILoresheet[];
}

/* tslint:disable:no-console */

class CharacterLoresheets extends
  React.Component<ICharacterLoresheetsProps, object> {
  render() {
    let idxCat: number = 0;
    return(
      <Container className="CharacterHistory">
        {
          this.props.categories.map(
            (category: string) => {
              console.log(category);
              return (<LoresheetCategory
                category={category}
                knownLoresheets={this.props.knownLoresheets}
                loresheets={this.props.loresheets}
                key={'loresheetsCategory_' + idxCat++}
              />);
            })
        }
      </Container>
    );
  }
}

export default CharacterLoresheets;
