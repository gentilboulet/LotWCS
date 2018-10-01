import * as React from 'react';

import { ICost } from 'state/costs';

import { TSkillName } from 'data/skills';

import EditNumeric from 'components/EditNumeric';

export interface ISkillProps {
  name: TSkillName;
  value: number;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class Skill extends React.Component<ISkillProps, {}> {
  constructor(props: ISkillProps) {
    super(props);
    this.onBuy = this.onBuy.bind(this);
  }
  public render() {
    return(
      <EditNumeric
        name={this.props.name}
        value={this.props.value}
        canBuy={this.props.canBuy}
        onBuy={this.onBuy}
      />
    );
  }

  private onBuy(): void { this.props.onBuy(this.props.cost); };
}

export default Skill;
