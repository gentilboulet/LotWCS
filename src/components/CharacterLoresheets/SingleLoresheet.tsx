import * as React from 'react';
import { ListGroupItem } from 'reactstrap';
import Collapsible from '../Collapsible';
import { ILoresheetsCharacterLoresheetsProps } from '../CharacterLoresheets';

export interface ILoresheetCategoryProps {
  loresheet: ILoresheetsCharacterLoresheetsProps;
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
            return <ListGroupItem key={'lsOptions_' + o.uid}>{o.description}</ListGroupItem>;
          })}
        </Collapsible>
      );
    }
  }
