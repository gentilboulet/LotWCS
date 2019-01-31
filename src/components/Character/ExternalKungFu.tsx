import * as React from "react";
import { Icon } from "react-fa";

import { kungfuData } from "../../data/kungfu";
import {
  IDataExternalKungfu,
  IDataExternalKungfuStatistics,
  KUNGFU_EXTERNAL
} from "../../data/kungfu/types";
import { ICost } from "../../state/costs";

import ExternalKungFuTechnique from "../../containers/Character/ExternalKungFuTechnique";

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
        </div>
      </div>
    );
  }

  private renderCrunch(data: IDataExternalKungfu): JSX.Element {
    return (
      <div>
        <div className="Grid" style={{ justifyContent: "space-between" }}>
          <h4>{data.name}</h4>
          <span style={{ justifyContent: "flex-end" }}>
            {this.renderButton()}
          </span>
        </div>
        <div className="Grid">
          <h5>Weapons</h5>
          <p>
            {data.weapons.map(w => (
              <button key={w} disabled={true}>
                {w}
              </button>
            ))}
          </p>
        </div>
        <div className="Grid">
          <div className="Grid-cell">
            <div className="Grid">
              <h5>Qualities</h5>
              {data.qualities.map((q, i) => (
                <p key={i}>{q}</p>
              ))}
            </div>
            <div className="Grid">
              <h5>Laught</h5>
              <p>{data.laugths}</p>
            </div>
            <div className="Grid">
              <h5>Fears</h5>
              <p>{data.fears}</p>
            </div>
          </div>
          <div className="Grid-cell" style={{ flexGrow: 0 }}>
            {this.renderStats()}
          </div>
        </div>
        <div>
          <h5>Techniques</h5>
          {this.renderTechniques(data)}
        </div>
      </div>
    );
  }

  private renderStats(): JSX.Element {
    return (
      <table>
        <tbody>
          {Object.keys(this.props.statistics).map(
            (s: string): JSX.Element => {
              return (
                <tr key={s}>
                  <td>{s}</td>
                  <td>{this.props.statistics[s]}</td>
                </tr>
              );
            }
          )}
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
    if (this.props.canOpen && this.props.cost.canPay) {
      return (
        <button color="success" onClick={onClick}>
          <Icon name="graduation-cap" />
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
