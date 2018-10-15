import * as React from 'react';
import { Icon } from 'react-fa';
import { Button  } from 'reactstrap';

import { IDataInternalKungfuTechnique, KUNGFU_INTERNAL, kungfuTechniqueData } from 'data/kungfu';
import { ICost } from 'state/costs';
import { effectToString } from 'state/effects';

export interface IInternalKungFuTechniqueProps {
  styleUid: string;
  uid: string;
  cost?: ICost;
  costs?: Array<{value: number, cost: ICost}>;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class InternalKungFuTechnique extends React.Component<IInternalKungFuTechniqueProps, {}> {
  constructor(props: IInternalKungFuTechniqueProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const technique = kungfuTechniqueData(KUNGFU_INTERNAL, this.props.styleUid, this.props.uid) as IDataInternalKungfuTechnique;
    if(technique === undefined) { return; }

    const effect = effectToString(technique.effect);

    return <tr key={technique.uid} role="button" onClick={this.onBuy} >
     <td>{technique.name}</td>
     <td>{technique.level}</td>
     <td>{technique.description}{(effect.length>0?' '+effect : null)}</td>
     <td>{this.renderButton()}</td>
    </tr>
  }

  private renderButton(): JSX.Element {
    if(this.props.canBuy) { return (<Button color="success"><Icon name="unlock-alt" /></Button>); }
    else { return (<Button color="danger"><Icon name="times" /></Button>); }
  }

  private onBuy(): void {
    if(this.props.cost !== undefined && this.props.canBuy)
    { this.props.onBuy(this.props.cost); }
  }
}

export default InternalKungFuTechnique;
