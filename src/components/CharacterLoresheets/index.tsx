import * as React from 'react';
import { Container } from 'reactstrap';

import * as dataLoresheets from '../../data/loresheets';
import { ICost } from '../../types/costs';
import LoresheetCategory from './LoresheetCategory';

export interface ILoresheetsOptionsCostCharacterLoresheetsProps {
  originalCost: number;
  canBuy: boolean;
  cost: ICost;
}

export interface ILoresheetsOptionsCharacterLoresheetsProps {
  uid: string;
  type: string;
  description: string;

  known: boolean;
  costs: ILoresheetsOptionsCostCharacterLoresheetsProps[];
  costsStr: string;
}

export interface ILoresheetsCharacterLoresheetsProps {
  uid: string;
  name: string;
  category: string;
  description: string;
  ruleset: string;
  options: ILoresheetsOptionsCharacterLoresheetsProps[];

  known: boolean;
  canOpen: boolean;
  cost: ICost;
  costStr: string;
}

export interface ICharacterLoresheetsProps {
  loresheets: ILoresheetsCharacterLoresheetsProps[];

  onOpenLS: (uid: string, cost: ICost) => void;
  onBuyOptionLS: (lsUid: string, uid: string, cost: ICost) => void;
}

class CharacterLoresheets extends
  React.Component<ICharacterLoresheetsProps, {}> {
  public render() {
    let idxCategory = 0;
    return(
      <Container className="CharacterHistory">
        {
          dataLoresheets.loresheetsCategories.map((category: string) => {
              return (
                <LoresheetCategory
                  category={category}
                  loresheets={this.props.loresheets.filter(ls => (ls.category === category) )}
                  onOpenLS={this.props.onOpenLS}
                  onBuyOptionLS={this.props.onBuyOptionLS}
                  key={'LoresheetCategory_' + idxCategory++}
                />
              );
          })
        }
      </Container>
    );
  }
}

export default CharacterLoresheets;
