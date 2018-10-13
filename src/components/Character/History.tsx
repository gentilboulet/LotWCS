import * as React from 'react';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import { IAction }  from 'state/actions/types';

export interface IHistoryProps {
  history: IAction[];
  onDelete: (id: number) => void;
}

export interface IHistoryState {
  hoverIndex: number;
}

class History extends React.Component<IHistoryProps, IHistoryState> {
  constructor(props: IHistoryProps) {
    super(props);

    this.state = {
      hoverIndex: this.props.history.length,
    };

    this.renderHistoryAction.bind(this);
    this.rollbackHistory.bind(this);
  }

  public render() {
    return(
      <Container className="History">
        <ListGroup>
          {this.props.history.map((action: IAction, index: number) => this.renderHistoryAction(action, index))}
        </ListGroup>
      </Container>
    );
  }

  private renderHistoryAction(action: IAction, index: number): JSX.Element {
      const onClick = () => this.rollbackHistory(index);
      return <ListGroupItem key={'rowHistory_' + index} tag="button" onClick={onClick} action={true}>
            <ListGroupItemHeading>{(index+1)+" "+action.type}</ListGroupItemHeading>
            <ListGroupItemText>{JSON.stringify(action)}</ListGroupItemText>
          </ListGroupItem>
  }

  private rollbackHistory(index: number): void {
    this.props.onDelete(index);
  }

}

export default History;
