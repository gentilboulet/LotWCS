import * as React from 'react';
import Collapsible from '../Collapsible';
import { ILoresheetsCharacterLoresheetsProps } from '../CharacterLoresheets';
import { ICost } from '../../types/costs';
import SingleLoresheet from './SingleLoresheet';

export interface ILoresheetCategoryProps {
  category: string;
  loresheets:  ILoresheetsCharacterLoresheetsProps[];

  onOpenLS: (uid: string, cost: ICost) => void;
  onBuyOptionLS: (lsUid: string, uid: string, cost: ICost) => void;
}

export default class LoresheetCategory extends
  React.Component<ILoresheetCategoryProps, object> {
    render() {
      return (
        <Collapsible title={this.props.category} color="info">
          {this.props.loresheets
            .map((ls: ILoresheetsCharacterLoresheetsProps) => {
              return (
                <SingleLoresheet
                  loresheet={ls}
                  key={'lsCategory_' + ls.uid}
                  onOpenLS={this.props.onOpenLS}
                  onBuyOptionLS={this.props.onBuyOptionLS}
                />);
            })
          }
        </Collapsible>
      );
    }
  }
