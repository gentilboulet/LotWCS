import * as React from "react";

import { IDataInternalKungfu, KUNGFU_INTERNAL, kungfuData } from "data/kungfu";
import { ICost } from "state/costs";

import InternalKungFuTechnique from "containers/Character/InternalKungFuTechnique";
import { Icon } from "react-fa";

export interface IInternalKungFuProps {
  uid: string;
  isOpen: boolean;
  cost: ICost;
  canOpen: boolean;
  knownTechniques: string[];
  onOpen: (cost: ICost) => void;
}

class InternalKungFu extends React.PureComponent<IInternalKungFuProps, {}> {
  constructor(props: IInternalKungFuProps) {
    super(props);

    this.renderTechniques = this.renderTechniques.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = kungfuData(
      KUNGFU_INTERNAL,
      this.props.uid
    ) as IDataInternalKungfu;
    return (
      <div>
        <div>
          <h4>{data.name}</h4>
          <span>{this.renderButton()}</span>
        </div>
        <div>
          <h5>description</h5>: <p>{data.description}</p>
        </div>
        <div>
          <h5>Element</h5>:<p>{data.element}</p>
        </div>
        <div>
          <h5>Techniques</h5>
        </div>
        {this.renderTechniques(data)}
      </div>
    );
  }

  private renderTechniques(data: IDataInternalKungfu): JSX.Element {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Effect</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.techniques.sort((a, b) => a.level - b.level).map(t => (
            <InternalKungFuTechnique
              key={t.uid}
              styleUid={data.uid}
              uid={t.uid}
            />
          ))}
        </tbody>
      </table>
    );
  }

  private renderButton(): JSX.Element {
    const onClick = () => this.props.onOpen(this.props.cost);
    if (this.props.canOpen) {
      return (
        <button color="success" onClick={onClick}>
          <Icon name="unlock-alt" />
        </button>
      );
    } else if (this.props.isOpen) {
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

export default InternalKungFu;
