import * as React from "react";
import { Icon } from "react-fa";

import { kungfuTechniqueData } from "../../data/kungfu";
import {
  IDataExternalKungfuTechnique,
  KUNGFU_EXTERNAL,
} from "../../data/kungfu/types";
import { effectToString } from "../../perks/effects";
import { ICost } from "../../state/models/character/costs";

export interface IExternalKungFuTechniqueProps {
  styleUid: string;
  uid: string;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class ExternalKungFuTechnique extends React.PureComponent<
  IExternalKungFuTechniqueProps,
  {}
> {
  constructor(props: IExternalKungFuTechniqueProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const technique = kungfuTechniqueData(
      KUNGFU_EXTERNAL,
      this.props.styleUid,
      this.props.uid,
    ) as IDataExternalKungfuTechnique;
    if (technique === undefined) {
      return;
    }

    const effect = effectToString(technique.effect);

    return (
      <tr key={technique.uid} role="button" onClick={this.onBuy}>
        <td>{technique.name}</td>
        <td>{technique.cost}</td>
        <td>
          {technique.description}
          {effect.length > 0 ? " " + effect : null}
        </td>
        <td>{this.renderButton()}</td>
      </tr>
    );
  }

  private renderButton(): JSX.Element {
    if (this.props.canBuy && this.props.cost.canPay) {
      return (
        <button color="success">
          <Icon name="graduation-cap" />
        </button>
      );
    } else {
      return (
        <button color="danger">
          <Icon name="times" />
        </button>
      );
    }
  }

  private onBuy(): void {
    if (this.props.canBuy && this.props.cost.canPay) {
      this.props.onBuy(this.props.cost);
    }
  }
}

export default ExternalKungFuTechnique;
