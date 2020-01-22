import * as React from "react";
import Icon from "react-fa";

import { getLoresheetData, IDataLoresheet } from "../../data/loresheets";
import { ICost } from "../../state/character/models/costs";

import LoresheetOption from "../../containers/Character/LoresheetOption";

export interface ILoresheetProps {
  uid: string;
  known: boolean;
  cost: ICost;
  canOpen: boolean;
  onOpen: (cost: ICost) => void;
}

class Loresheet extends React.PureComponent<ILoresheetProps, {}> {
  constructor(props: ILoresheetProps) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = getLoresheetData(this.props.uid) as IDataLoresheet;
    return (
      <div>
        <div className="Grid" style={{ justifyContent: "space-between" }}>
          <h4>{data.name}</h4>
          <span style={{ justifyContent: "flex-end" }}>
            {this.renderButton()}
          </span>
        </div>
        <div>
          <p>{data.description}</p>
        </div>
        <div>{this.renderOptions(data)}</div>
      </div>
    );
  }

  private renderOptions(data: IDataLoresheet): JSX.Element {
    if (data.options.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Cost</th>
              <th>Effect</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.options.map(o => (
              <LoresheetOption key={o.uid} lsUid={data.uid} uid={o.uid} />
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div />;
    }
  }

  private renderButton(): JSX.Element {
    const onClick = () => this.props.onOpen(this.props.cost);
    if (this.props.canOpen && this.props.cost.canPay) {
      return (
        <button color="success" onClick={onClick}>
          <Icon name="graduation-cap" />
        </button>
      );
    } else if (this.props.known) {
      return (
        <button color="primary" disabled={true}>
          <Icon name="leanpub" />
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
}

export default Loresheet;
