import * as React from "react";

import { IAction } from "state/actions/types";

export interface IHistoryProps {
  history: IAction[];
  onDelete: (id: number) => void;
}

export interface IHistoryState {
  hoverIndex: number;
}

class History extends React.PureComponent<IHistoryProps, IHistoryState> {
  constructor(props: IHistoryProps) {
    super(props);

    this.state = {
      hoverIndex: this.props.history.length
    };

    this.renderHistoryAction.bind(this);
    this.rollbackHistory.bind(this);
  }

  public render() {
    return (
      <div className="History">
        <div>
          {this.props.history.map((action: IAction, index: number) =>
            this.renderHistoryAction(action, index)
          )}
        </div>
      </div>
    );
  }

  private renderHistoryAction(action: IAction, index: number): JSX.Element {
    const onClick = () => this.rollbackHistory(index);
    return (
      <div key={"rowHistory_" + index} onClick={onClick}>
        <div>{index + 1 + " " + action.type}</div>
        <div>{JSON.stringify(action)}</div>
      </div>
    );
  }

  private rollbackHistory(index: number): void {
    this.props.onDelete(index);
  }
}

export default History;
