import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { kungfuTechniqueData } from "../../data/kungfu";
import {
  IDataInternalKungfuTechnique,
  KUNGFU_INTERNAL,
} from "../../data/kungfu/types";
import { effectToString } from "../../perks/effects";
import { ICost } from "../../state/models/character/costs";

export interface IInternalKungFuTechniqueProps {
  styleUid: string;
  uid: string;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class InternalKungFuTechnique extends React.PureComponent<
  IInternalKungFuTechniqueProps,
  {}
> {
  constructor(props: IInternalKungFuTechniqueProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const technique = kungfuTechniqueData(
      KUNGFU_INTERNAL,
      this.props.styleUid,
      this.props.uid,
    ) as IDataInternalKungfuTechnique;
    if (technique === undefined) {
      return;
    }

    const effect = effectToString(technique.effect);

    return (
      <tr key={technique.uid} role="button" onClick={this.onBuy}>
        <td>{technique.name}</td>
        <td>{technique.level}</td>
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
          <FontAwesomeIcon icon="graduation-cap" />
        </button>
      );
    } else {
      return (
        <button color="danger">
          <FontAwesomeIcon icon="times" />
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

export default InternalKungFuTechnique;
