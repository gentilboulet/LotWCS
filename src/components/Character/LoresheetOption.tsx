import * as React from "react";
import { Icon } from "react-fa";

import { getLoresheetOptionData } from "data/loresheets";
import { ICost } from "state/costs";

export interface ILoresheetOptionProps {
  lsUid: string;
  uid: string;
  cost: ICost[];
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
  payloads: any[];
}

class LoresheetOption extends React.PureComponent<ILoresheetOptionProps, {}> {
  constructor(props: ILoresheetOptionProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderButton = this.renderButton.bind(this);

    this.renderKnown = this.renderKnown.bind(this);
    this.renderNotKnown = this.renderNotKnown.bind(this);
  }

  public render() {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    if (data === undefined) {
      return;
    }
    const known = this.props.payloads.map((payload, index) =>
      this.renderKnown(payload, index)
    );
    if (known.length > 0 && data.repeatable) {
      return known.concat(this.renderNotKnown());
    } else if (known.length > 0) {
      return known;
    } else {
      return this.renderNotKnown();
    }
  }

  private renderButton(canBuy: boolean): JSX.Element {
    if (canBuy) {
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

  private fromCostToString(cost: number | { min: number; max: number }) {
    if (typeof cost === "number") {
      return cost;
    } else {
      return cost.min + "-" + cost.max;
    }
  }

  private renderKnown(payload: any, index: number): JSX.Element {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    return (
      <tr key={"known_" + data.uid + "_" + index}>
        <td>{data.type}</td>
        <td>{this.fromCostToString(data.cost)}</td>
        <td>{data.description}</td>
        <td>{this.renderButton(false)}</td>
      </tr>
    );
  }

  private renderNotKnown(): JSX.Element {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    return (
      <tr key={"unknown_" + data.uid} role="button" onClick={this.onBuy}>
        <td>{data.type}</td>
        <td>{this.fromCostToString(data.cost)}</td>
        <td>{data.description}</td>
        <td>{this.renderButton(this.props.canBuy)}</td>
      </tr>
    );
  }

  private onBuy(): void {
    if (this.props.cost !== undefined && this.props.canBuy) {
      // this.props.onBuy(this.props.cost); TODO
    }
  }
}

export default LoresheetOption;
