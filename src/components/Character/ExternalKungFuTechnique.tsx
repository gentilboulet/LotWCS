import * as React from 'react';
import { Icon } from 'react-fa';

import { IDataExternalKungfuTechnique, KUNGFU_EXTERNAL, kungfuTechniqueData } from 'data/kungfu';
import { ICost } from 'state/costs';
import { effectToString } from 'state/effects';

export interface IExternalKungFuTechniqueProps {
  styleUid: string;
  uid: string;
  cost?: ICost;
  costs?: Array<{value: number, cost: ICost}>;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class ExternalKungFuTechnique extends React.Component<IExternalKungFuTechniqueProps, {}> {
  constructor(props: IExternalKungFuTechniqueProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const technique = kungfuTechniqueData(KUNGFU_EXTERNAL, this.props.styleUid, this.props.uid) as IDataExternalKungfuTechnique;
    if(technique === undefined) { return; }

    const effect = effectToString(technique.effect);

    return <tr key={technique.uid} role="button" onClick={this.onBuy} >
     <td>{technique.name}</td>
     <td>{technique.cost}</td>
     <td>{technique.description}{(effect.length>0?' '+effect : null)}</td>
     <td>{this.renderButton()}</td>
    </tr>
  }

  private renderButton(): JSX.Element {
    if(this.props.canBuy) { return (<button color="success"><Icon name="unlock-alt" /></button>); }
    else { return (<button color="danger"><Icon name="times" /></button>); }
  }

  private onBuy(): void {
    if(this.props.cost !== undefined && this.props.canBuy)
    { this.props.onBuy(this.props.cost); }
  }
}

export default ExternalKungFuTechnique;
