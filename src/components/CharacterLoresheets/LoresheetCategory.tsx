import * as React from 'react';
import Collapsible from '../Collapsible';
import { ILoresheet } from '../../types/loresheets';
import { IKnownLoresheetsProps } from './index';
import SingleLoresheet from './SingleLoresheet';

export interface ILoresheetCategoryProps {
  category: string;
  knownLoresheets: IKnownLoresheetsProps[];
  loresheets: ILoresheet[];
}

export default class LoresheetCategory extends
  React.Component<ILoresheetCategoryProps, object> {
    render() {
      return (
        <Collapsible title={this.props.category} color="info">
          {this.props.loresheets
            .filter((ls: ILoresheet) => { return ls.category === this.props.category; })
            .map((ls: ILoresheet) => {
              return (<SingleLoresheet loresheet={ls} />);
            })
          }
        </Collapsible>
      );
    }
  }
