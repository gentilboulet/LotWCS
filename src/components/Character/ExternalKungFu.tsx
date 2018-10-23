import * as React from "react";

import {
  IDataExternalKungfu,
  IDataExternalKungfuStatistics,
  KUNGFU_EXTERNAL,
  kungfuData
} from "data/kungfu";
import { ICost } from "state/costs";

import ExternalKungFuTechnique from "containers/Character/ExternalKungFuTechnique";
import { Icon } from "react-fa";

export interface IExternalKungFuProps {
  uid: string;
  isOpen: boolean;
  cost: ICost;
  canOpen: boolean;
  knownTechniques: string[];
  onOpen: (cost: ICost) => void;
  statistics: IDataExternalKungfuStatistics;
}

class ExternalKungFu extends React.PureComponent<IExternalKungFuProps, {}> {
  constructor(props: IExternalKungFuProps) {
    super(props);

    this.renderCrunch = this.renderCrunch.bind(this);
    this.renderStats = this.renderStats.bind(this);
    this.renderTechniques = this.renderTechniques.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const data = kungfuData(
      KUNGFU_EXTERNAL,
      this.props.uid
    ) as IDataExternalKungfu;
    return (
      <div>
        <div>
          <div>{this.renderCrunch(data)}</div>
          <div>{this.renderStats()}</div>
        </div>
      </div>
    );
  }

  private renderCrunch(data: IDataExternalKungfu): JSX.Element {
    return (
      <div>
        <div>
          <h4>{data.name}</h4>
          <span>{this.renderButton()}</span>
        </div>
        <div>
          <h5>Weapons</h5>:
          <p>
            {data.weapons.map(w => (
              <button key={w} disabled={true}>
                {w}
              </button>
            ))}
          </p>
        </div>
        <div>
          <h5>Qualities</h5>: {data.qualities.map((q, i) => <p key={i}>{q}</p>)}
        </div>
        <div>
          <h5>Laught</h5>: <p>{data.laugths}</p>
        </div>
        <div>
          <h5>Fears</h5>: <p>{data.fears}</p>
        </div>
        <div>
          <h5>Techniques</h5>
        </div>
        {this.renderTechniques(data)}
      </div>
    );
  }

  private renderStats(): JSX.Element {
    return (
      <table>
        <tbody>
          {Object.keys(this.props.statistics).map(s => {
            return (
              <tr key={s}>
                <td>{s}</td>
                <td>{this.props.statistics[s]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  private renderTechniques(data: IDataExternalKungfu): JSX.Element {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Effect</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.techniques.map(t => (
            <ExternalKungFuTechnique
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

export default ExternalKungFu;
