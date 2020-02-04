import * as React from "react";

import { ICost } from "../../state/models/character/costs";

import { TSkillName } from "../../data/skills";

import EditNumeric from "../../components/EditNumeric";

export interface ISkillProps {
  name: TSkillName;
  value: number;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class Skill extends React.PureComponent<ISkillProps, {}> {
  constructor(props: ISkillProps) {
    super(props);
    this.onBuy = this.onBuy.bind(this);
  }
  public render() {
    return (
      <EditNumeric
        name={this.props.name}
        value={this.props.value}
        canBuy={this.props.canBuy && this.props.cost.canPay}
        onBuy={this.onBuy}
      />
    );
  }

  private onBuy(): void {
    this.props.onBuy(this.props.cost);
  }
}

export default Skill;
