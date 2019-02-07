import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { getLoresheetOptionData } from "../../data/loresheets";
import { ICost } from "../../state/costs";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export interface ILoresheetOptionPopupProps {
  lsUid: string;
  uid: string;
  cost: ICost[];
  onBuy: (cost: ICost) => void;
  isOpen: boolean;
  toggle: () => void;
}

interface ILoresheetOptionPopupState {
  cost?: ICost;
  payload: {
    [key: string]: string;
  };
}

class LoresheetOptionPopup extends React.PureComponent<
  ILoresheetOptionPopupProps,
  ILoresheetOptionPopupState
> {
  constructor(props: ILoresheetOptionPopupProps) {
    super(props);

    const initState: ILoresheetOptionPopupState = { payload: {} };
    if (this.props.cost.length === 1) {
      initState.cost = this.props.cost[0];
    }
    this.state = initState;

    this.renderComplexCost = this.renderComplexCost.bind(this);

    this.buyButtonClick = this.buyButtonClick.bind(this);
  }

  public render() {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>{data.type}</ModalHeader>
        <ModalBody>
          {data.description}
          <hr />
          {typeof data.cost === "number" ? "" : this.renderComplexCost()}
        </ModalBody>
        <ModalFooter>{this.renderBuyButton()}</ModalFooter>
      </Modal>
    );
  }

  private renderComplexCost(): React.ReactNode {
    const onChange = (idx: number) => {
      this.setState({
        cost: this.props.cost[idx]
      });
    };

    let marks = {};
    this.props.cost.forEach((cost: ICost, idx: number) => {
      const newMarks = {
        [idx]: {
          label: cost.original.toString(),
          style: { color: cost.canPay ? "black" : "light-grey" }
        }
      };
      marks = { ...marks, ...newMarks };
    });
    return (
      <Slider
        min={0}
        max={this.props.cost.length - 1} // 0-indexed
        marks={marks}
        included={false}
        onChange={onChange}
        step={null}
      />
    );
  }

  private renderBuyButton(): React.ReactNode {
    const active = this.state.cost ? this.state.cost.canPay : false;
    return (
      <Button disabled={!active} color="info" onClick={this.buyButtonClick}>
        Pay
      </Button>
    );
  }

  private buyButtonClick(): void {
    if (this.state.cost && this.state.cost.canPay) {
      /* tslint:disable:no-console */
      console.log("buyClick");
      this.props.onBuy(this.state.cost);
      this.props.toggle();
    }
  }
}

export default LoresheetOptionPopup;
