import * as React from 'react';
import { Icon } from 'react-fa';
import { Button, ListGroupItem } from 'reactstrap';

import Collapsible from 'components/Collapsible';

import { 
  ILoresheetsCharacterLoresheetsProps,
  ILoresheetsOptionsCharacterLoresheetsProps,
  ILoresheetsOptionsCostCharacterLoresheetsProps,
} from 'components/CharacterLoresheets';
import { ICost } from 'costs/types';

export interface ISingleLoresheetProps {
  loresheet: ILoresheetsCharacterLoresheetsProps;

  onOpenLS: (uid: string, cost: ICost) => void;
  onBuyOptionLS: (lsUid: string, uid: string, cost: ICost) => void;
}

export default class SingleLoresheet extends
  React.Component<ISingleLoresheetProps, object> {
    constructor(props: ISingleLoresheetProps) {
      super(props);

      this.renderButton = this.renderButton.bind(this);
      this.renderCollapsibleDescription = this.renderCollapsibleDescription.bind(this);
      this.openLS = this.openLS.bind(this);
    }

    public render() {
      return (
        <Collapsible
          title={this.props.loresheet.name}
          description={this.renderCollapsibleDescription()}
        >
          {this.props.loresheet.options.map( o => {
            return <ListGroupItem key={'lsOptions_' + o.uid}>
              <h5>{o.type} ({o.costsStr})</h5><br />
              {o.description}
              {this.renderButton(o)}
            </ListGroupItem>;
          })}
        </Collapsible>
      );
    }

    private openLS() {
      return this.props.onOpenLS(this.props.loresheet.uid, this.props.loresheet.cost);
    }

    private renderButton(o: ILoresheetsOptionsCharacterLoresheetsProps): JSX.Element {
      if (
        o.costs
        .filter((c: ILoresheetsOptionsCostCharacterLoresheetsProps) => c.canBuy )
        .length > 0) {
        return <Button><Icon name="check"/></Button>;
      } else {
        return <Button><Icon name="times"/></Button>;
      }
    }

    private renderCollapsibleDescription(): JSX.Element {
      if (!this.props.loresheet.canOpen) { return <div><span>{this.props.loresheet.description}</span></div>; }
      return (
        <div>
          <span>{this.props.loresheet.description}</span>
          <span><Button onClick={this.openLS}>Open ({this.props.loresheet.costStr})</Button></span>
        </div>);
    }
  }
