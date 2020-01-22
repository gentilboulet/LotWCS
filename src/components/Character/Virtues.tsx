import * as React from "react";

import { ICost } from "../../state/character/models/costs";

import {
  IDataVirtueType,
  VIRTUE_CHIVALROUS,
  VIRTUE_SELFISH
} from "../../data/virtues";

import EditNumeric from "../../components/EditNumeric";
import FieldHeader from "../../components/FieldHeader";

interface IVirtueProp {
  type: IDataVirtueType;
  name: string;
  value: number;
  cost: ICost;
  canBuy: boolean;
  onBuy: () => void;
}

export interface IVirtuesProps {
  virtues: IVirtueProp[];
}

class Virtues extends React.PureComponent<IVirtuesProps, {}> {
  public render() {
    const chivalrousVirtues = this.props.virtues.filter(
      v => v.type === VIRTUE_CHIVALROUS
    );
    const selfishVirtues = this.props.virtues.filter(
      v => v.type === VIRTUE_SELFISH
    );
    const max = Math.max(chivalrousVirtues.length, selfishVirtues.length);

    const rows = [
      <div key="header">
        <div>
          <FieldHeader label="Chivalrous Virtues" />
        </div>
        <div>
          <FieldHeader label="Selfish Virtues" />
        </div>
      </div>
    ];
    for (let i = 0; i < max; i++) {
      const cvdiv =
        i < chivalrousVirtues.length ? (
          <div>{this.renderVirtue(chivalrousVirtues[i])}</div>
        ) : (
          <div />
        );
      const svdiv =
        i < selfishVirtues.length ? (
          <div>{this.renderVirtue(selfishVirtues[i])}</div>
        ) : (
          <div />
        );

      rows.push(
        <div key={"virtues_" + i}>
          {cvdiv}
          {svdiv}
        </div>
      );
    }
    return <div>{rows.map(r => r)}</div>;
  }

  private renderVirtue(virtue: IVirtueProp): JSX.Element {
    return (
      <EditNumeric
        name={virtue.name}
        value={virtue.value}
        canBuy={virtue.canBuy && virtue.cost.canPay}
        onBuy={virtue.onBuy}
      />
    );
  }
}

export default Virtues;
