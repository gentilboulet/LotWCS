import * as React from "react";

import { ICharacterAction } from "../../state/character";

export interface IHistoryProps {
  history: ICharacterAction[];
  onReplay: (action: ICharacterAction[]) => void;
}

export interface IHistoryState {
  hoverIndex: number;
}

class History extends React.PureComponent<IHistoryProps, IHistoryState> {
  constructor(props: IHistoryProps) {
    super(props);

    this.state = {
      hoverIndex: this.props.history.length,
    };

    this.renderHistoryAction.bind(this);
    this.rollbackHistory.bind(this);
  }

  public render() {
    return (
      <div className="History">
        <div>
          {this.props.history.map((action: ICharacterAction, index: number) =>
            this.renderHistoryAction(action, index),
          )}
        </div>
      </div>
    );
  }

  private renderHistoryAction(
    action: ICharacterAction,
    index: number,
  ): JSX.Element {
    const onClick = () => this.rollbackHistory(index);
    return (
      <div key={"rowHistory_" + index} onClick={onClick}>
        <div>{index + 1 + " " + action.type}</div>
        <div>{JSON.stringify(action)}</div>
      </div>
    );
  }

  private rollbackHistory(index: number): void {
    this.props.onReplay(this.props.history.slice(0, index));
  }
}

export default History;
