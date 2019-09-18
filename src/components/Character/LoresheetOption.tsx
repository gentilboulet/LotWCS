import * as React from "react";
import { Icon } from "react-fa";

import { getLoresheetOptionData, gotName } from "../../data/loresheets";
import { ICost } from "../../state/costs";
import LoresheetOptionPopup from "./LoresheetOptionPopup";

export interface ILoresheetOptionProps {
  lsUid: string;
  uid: string;
  known: boolean;
  cost: ICost[];
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
  payloads?: any[];
}

interface ILoresheetOptionState {
  isModalOpen: boolean;
}

class LoresheetOption extends React.PureComponent<
  ILoresheetOptionProps,
  ILoresheetOptionState
> {
  constructor(props: ILoresheetOptionProps) {
    super(props);

    this.state = { isModalOpen: false };

    this.renderButton = this.renderButton.bind(this);

    this.renderKnown = this.renderKnown.bind(this);
    this.renderNotKnown = this.renderNotKnown.bind(this);
    this.onRowClickBuy = this.onRowClickBuy.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  public render() {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    if (data === undefined) {
      return;
    }

    if (!this.props.known) {
      return this.renderNotKnown();
    } else {
      return this.renderKnown();
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

  private renderDescription(value: string): JSX.Element {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    if (gotName(this.props.lsUid)) {
      return (
        <span>
          <b>{data.name + "."}</b>
          {" " + value}
        </span>
      );
    } else {
      return <span>{value}</span>;
    }
  }

  private renderKnown(): JSX.Element | JSX.Element[] {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    if (this.props.payloads) {
      return this.props.payloads.map((value, index) => {
        return (
          <tr key={"known_" + data.uid + "_" + index}>
            <td>{data.type}</td>
            <td>{this.fromCostToString(data.cost)}</td>
            <td>{this.renderDescription(value)}</td>
            <td />
          </tr>
        );
      });
    } else {
      return (
        <tr key={"known_" + data.uid}>
          <td>{data.type}</td>
          <td>{this.fromCostToString(data.cost)}</td>
          <td>{this.renderDescription(data.description)}</td>
          <td />
        </tr>
      );
    }
  }

  private renderNotKnown(): JSX.Element {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    const canBuyOneOrMore =
      this.props.canBuy &&
      this.props.cost
        .map(cost => cost.canPay)
        .reduce(
          (previousValue, currentValue) => previousValue || currentValue,
          false
        );
    return (
      <tr
        key={"unknown_" + data.uid}
        role="button"
        onClick={this.onRowClickBuy}
      >
        <LoresheetOptionPopup
          lsUid={this.props.lsUid}
          uid={this.props.uid}
          cost={this.props.cost}
          onBuy={this.props.onBuy}
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        />
        <td>{data.type}</td>
        <td>{this.fromCostToString(data.cost)}</td>
        <td>{this.renderDescription(data.description)}</td>
        <td>{this.renderButton(canBuyOneOrMore)}</td>
      </tr>
    );
  }

  private onRowClickBuy(): void {
    const canBuyOneOrMore =
      this.props.canBuy &&
      this.props.cost
        .map(cost => cost.canPay)
        .reduce(
          (previousValue, currentValue) => previousValue || currentValue,
          false
        );
    if (canBuyOneOrMore && !this.state.isModalOpen) {
      this.toggleModal();
    }
  }

  private toggleModal(): void {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
}

export default LoresheetOption;
