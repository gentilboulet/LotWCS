import * as React from 'react';

import { ICost } from 'state/costs';

import { TChiName } from 'data/chi';

import EditNumeric from 'components/EditNumeric';

export interface IChiProps {
  name: TChiName;
  value: number;
  cultivation: number;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class Chi extends React.Component<IChiProps, {}> {
  constructor(props: IChiProps) {
    super(props);
    this.onBuy = this.onBuy.bind(this);
  }
  public render() {
    const name = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    return(
      <div>
        <div>
          <div>
            <EditNumeric
              name={name}
              value={this.props.value}
              canBuy={this.props.canBuy}
              onBuy={this.onBuy}
            />
          </div>
          <div>{"cultivation "+this.props.cultivation}
          </div>
        </div>
      </div>
    );
  }

  private onBuy(): void { this.props.onBuy(this.props.cost); };
}

export default Chi;
