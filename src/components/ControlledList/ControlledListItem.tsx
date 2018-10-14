import * as React from 'react';

import { ListGroupItem } from 'reactstrap';

export interface IControlledListItemProps {
  label: string;
  selected?: boolean;
  onSelectedToggle: () => void;
}

export interface IControlledListItemState {
  selected: boolean;
}

class ControlledListItem extends React.Component<IControlledListItemProps, IControlledListItemState> {
  constructor(props: IControlledListItemProps) {
    super(props);

    this.state = { selected: this.props.selected ? this.props.selected : false };

    this.toggle = this.toggle.bind(this);
  }

  public render() {
    return <ListGroupItem tag="button" action={true} onClick={this.toggle}>{this.state.selected ? <b>{this.props.label}</b> : this.props.label }</ListGroupItem>
  }

  private toggle() {
    this.setState({
      selected: !this.state.selected
    });
    this.props.onSelectedToggle();
  }
}

export default ControlledListItem;
