import * as React from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import { getLoresheetOptionData, IPerk } from "../../data/loresheets";
import { IBonus } from "../../state/bonuses";
import * as bonuses from "../../state/constants/perks/bonuses";
import { ICost } from "../../state/costs";

import EditText from "../../components/EditText";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export interface ILoresheetOptionPopupProps {
  lsUid: string;
  uid: string;
  cost: ICost[];
  onBuy: (cost: ICost, payload?: string) => void;
  isOpen: boolean;
  toggle: () => void;
}

interface ILoresheetOptionPopupState {
  cost?: ICost;
  payload?: string;
}

function fromBonusToString(bonus: IBonus): string {
  switch (bonus.type) {
    case bonuses.BONUS_DESTINY:
      return "destiny +" + bonus.value;
    case bonuses.BONUS_ENTANGLEMENT:
      return "entanglement +" + bonus.value;
    case bonuses.BONUS_CHI:
      return bonus.chi + " chi +" + bonus.value;
    case bonuses.BONUS_CULTIVATION:
      return bonus.chi + " chi cultivation +" + bonus.value;
    case bonuses.BONUS_ONE_AMONG_N:
      throw new Error(
        "bonus too complicated to render : " + JSON.stringify(bonus)
      );
    case bonuses.BONUS_SKILL_RANK:
      return "skill " + bonus.skill + " +5";
    case bonuses.BONUS_SPECIALITY:
      return "skill " + bonus.skill + " : free speciality " + bonus.speciality;
    default:
      return "no";
  }
}

class LoresheetOptionPopup extends React.PureComponent<
  ILoresheetOptionPopupProps,
  ILoresheetOptionPopupState
> {
  constructor(props: ILoresheetOptionPopupProps) {
    super(props);

    const initState: ILoresheetOptionPopupState = {};
    if (this.props.cost.length === 1) {
      initState.cost = this.props.cost[0];
    }
    this.state = initState;

    this.renderComplexCost = this.renderComplexCost.bind(this);
    this.renderPayload = this.renderPayload.bind(this);
    this.buyButtonClick = this.buyButtonClick.bind(this);
  }

  public render() {
    const data = getLoresheetOptionData(this.props.lsUid, this.props.uid);
    const payload: React.ReactNode = data.payload
      ? this.renderPayload(data.payload)
      : undefined;
    const choices: React.ReactNode = data.perks.map((p: IPerk, id: number) =>
      this.renderBonusChoices(p, id)
    );
    const complexCost: React.ReactNode =
      typeof data.cost === "number" ? undefined : this.renderComplexCost();
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggle}>{data.type}</ModalHeader>
        <ModalBody>
          {data.description}
          <hr />
          {[payload, choices, complexCost]}
        </ModalBody>
        <ModalFooter>{this.renderBuyButton()}</ModalFooter>
      </Modal>
    );
  }

  private renderBonusChoices(perk: IPerk, key: any): React.ReactNode {
    if (perk.type !== bonuses.BONUS_ONE_AMONG_N) {
      return;
    }
    return (
      <FormGroup key={"bonus_" + key}>
        <FormGroup check={true}>
          {Object.keys(perk.bonuses).map((bonusKey: string) => (
            <Label check={true} key={bonusKey}>
              <Input type="radio" name="radio1" />
              {fromBonusToString(perk.bonuses[bonusKey])}
            </Label>
          ))}
        </FormGroup>
      </FormGroup>
    );
  }

  private renderPayload(payload: string): React.ReactNode {
    const onChange = (p: string) => {
      this.setState({
        payload: p
      });
    };
    const notNull = (s: string) => s.length > 0;
    return (
      <FormGroup key="payload">
        <EditText
          header={payload}
          default={this.state.payload}
          validate={notNull}
          onSubmit={onChange}
        />
      </FormGroup>
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
      <FormGroup key="cost">
        <Label for="cost">Pay</Label>
        <Slider
          min={0}
          max={this.props.cost.length - 1} // 0-indexed
          marks={marks}
          included={false}
          onChange={onChange}
          step={null}
        />
      </FormGroup>
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
      this.props.onBuy(this.state.cost, this.state.payload);
      this.props.toggle();
    }
  }
}

export default LoresheetOptionPopup;
