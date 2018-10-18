import * as React from 'react';

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
      return <div onClick={this.toggle}>{this.state.selected ? <b>{this.props.label}</b> : this.props.label }</div>;
    } else {
      const style = {
        textAlign: "center" as "center"
      }
      return <div style={style}><em>{this.props.label}</em></div>;
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
