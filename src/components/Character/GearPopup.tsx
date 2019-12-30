import * as React from "react";
// import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import EditText from "../../components/EditText";

export interface IGearPopupProps {
  lsUid: string;
  uid: string;
  isOpen: boolean;
  toggle: () => void;
}

interface IGearPopupState {
  name?: string;
  descriptiom?: string;
  properties?: string | [string, string];
}

class GearPopup extends React.PureComponent<IGearPopupProps, IGearPopupState> {
  constructor(props: IGearPopupProps) {
    super(props);

    const initState: IGearPopupState = {};
    this.state = initState;

    // this.renderComplexCost = this.renderComplexCost.bind(this);
    // this.renderPayload = this.renderPayload.bind(this);
    // this.buyButtonClick = this.buyButtonClick.bind(this);
  }

  public render() {
    // const data = getGearData(this.props.lsUid, this.props.uid);
    // const payload: React.ReactNode = this.renderPayload(
    //   (data as IDataGear).payload
    // );
    // const choices: React.ReactNode = data.perks.map((p: IPerk, id: number) =>
    //   this.renderBonusChoices(p, id)
    // );
    // const complexCost: React.ReactNode =
    //   typeof data.cost === "number" ? undefined : this.renderComplexCost();
    // return (
    //   <Modal isOpen={this.props.isOpen}>
    //     <ModalHeader toggle={this.props.toggle}>{data.type}</ModalHeader>
    //     <ModalBody>
    //       {data.description}
    //       <hr />
    //       {[payload, choices, complexCost]}
    //     </ModalBody>
    //     <ModalFooter>{this.renderBuyButton()}</ModalFooter>
    //   </Modal>
    // );
    return <div>Empty div</div>;
  }

  // private renderBonusChoices(perk: IPerk, key: any): React.ReactNode {
  //   if (perk.type !== bonuses.BONUS_ONE_AMONG_N) {
  //     return;
  //   }
  //   const onChange = (all: any) => {
  //     /* tslint:disable:no-console */
  //     console.log(all.target.value);
  //   };
  //   return (
  //     <div key={"bonus_" + key}>
  //       {Object.keys(perk.bonuses).map((bonusKey: string) => (
  //         <div key={bonusKey}>
  //           <input
  //             type="radio"
  //             key={"radio_bonus_" + key}
  //             name={"bonus_" + key}
  //             onChange={onChange}
  //           />
  //           {fromBonusToString(perk.bonuses[bonusKey])}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  // private renderPayload(payload?: string): React.ReactNode {
  //   if (!payload) {
  //     return;
  //   }
  //   const onChange = (p: string) => {
  //     this.setState({
  //       cost: this.state.cost,
  //       payload: p
  //     });
  //   };
  //   const notNull = (s: string) => s.length > 0;
  //   return (
  //     <EditText
  //       key={"payload"}
  //       header={payload}
  //       default={this.state.payload}
  //       validate={notNull}
  //       onSubmit={onChange}
  //     />
  //   );
  // }

  // private renderComplexCost(): React.ReactNode {
  //   const onChange = (idx: number) => {
  //     this.setState({
  //       cost: this.props.cost[idx],
  //       payload: this.state.payload
  //     });
  //   };
  //
  //   let marks = {};
  //   this.props.cost.forEach((cost: ICost, idx: number) => {
  //     const newMarks = {
  //       [idx]: {
  //         label: cost.original.toString(),
  //         style: { color: cost.canPay ? "black" : "light-grey" }
  //       }
  //     };
  //     marks = { ...marks, ...newMarks };
  //   });
  //   return (
  //     <div key="cost">
  //       <Slider
  //         min={0}
  //         max={this.props.cost.length - 1} // 0-indexed
  //         marks={marks}
  //         included={false}
  //         onChange={onChange}
  //         step={null}
  //       />
  //       <br />
  //     </div>
  //   );
  // }

  // private renderBuyButton(): React.ReactNode {
  //   const data = getGearData(this.props.lsUid, this.props.uid);
  //   const requirePayload: React.ReactNode = (data as IDataGear).payload
  //     ? true
  //     : false;
  //   const activePayload =
  //     !requirePayload || (this.state.payload && this.state.payload.length > 0);
  //   const activeCost = this.state.cost ? this.state.cost.canPay : false;
  //   const active = activePayload && activeCost;
  //
  //   return (
  //     <Button disabled={!active} color="info" onClick={this.buyButtonClick}>
  //       Pay
  //     </Button>
  //   );
  // }

  // private buyButtonClick(): void {
  //   if (this.state.cost && this.state.cost.canPay) {
  //     this.props.onBuy(this.state.cost, this.state.payload);
  //     this.props.toggle();
  //     this.setState({});
  //   }
  // }
}

export default GearPopup;
