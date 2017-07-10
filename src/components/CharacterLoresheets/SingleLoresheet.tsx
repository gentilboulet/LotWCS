import * as React from 'react';
import { ListGroupItem } from 'reactstrap';
import Collapsible from '../Collapsible';
import { ILoresheet } from '../../types/loresheets';

export interface ILoresheetCategoryProps {
  loresheet: ILoresheet;
}

export default class SingleLoresheet extends
  React.Component<ILoresheetCategoryProps, object> {
    render() {
      return (
        <Collapsible
          title={this.props.loresheet.name}
          description={this.props.loresheet.description}
        >
          {this.props.loresheet.options.map( o => {
            return <ListGroupItem>{o.description}</ListGroupItem>;
          })}
        </Collapsible>
      );
    }
  }
