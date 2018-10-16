import * as React from 'react';

import { ListGroupItem } from 'reactstrap';

export interface IControlledListItemProps {
  label: string;
  selected?: boolean;
  onSelectedToggle?: () => void;
}

export interface IControlledListItemState {
  selected: boolean;
}

class ControlledListItem extends React.Component<IControlledListItemProps, IControlledListItemState> {
  constructor(props: IControlledListItemProps) {
    super(props);

    this.state = { selected: this.props.selected ? this.props.selected && this.canToggle(): false };

    this.toggle = this.toggle.bind(this);
    this.canToggle = this.canToggle.bind(this);
  }

  public render() {
    if(this.canToggle()) {
      return <ListGroupItem tag="button" action={true} onClick={this.toggle}>{this.state.selected ? <b>{this.props.label}</b> : this.props.label }</ListGroupItem>;
    } else {
      const style = {
        textAlign: "center" as "center"
      }
      return <ListGroupItem style={style}><em>{this.props.label}</em></ListGroupItem>;
    }
  }

  private canToggle(): boolean {
    return this.props.onSelectedToggle !== undefined;
  }

  private toggle() {
    if(this.canToggle()) {
      this.setState({
        selected: !this.state.selected
      });
      if(this.props.onSelectedToggle !== undefined) { this.props.onSelectedToggle(); } // To disable some warning
    }
  }
}

export default ControlledListItem;
