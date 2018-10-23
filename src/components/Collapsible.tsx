import * as React from 'react';

export interface ICollapsibleProps {
  title: string;
  description?: string | JSX.Element;
  color?: string;
}

export interface ICollapsibleState {
  collapse: boolean;
}

class Collapsible extends React.PureComponent<ICollapsibleProps, ICollapsibleState> {
  constructor(props: ICollapsibleProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };

    this.renderTitle = this.renderTitle.bind(this);
    this.renderTitleOpen = this.renderTitleOpen.bind(this);
  }

  public render() {
    return (
      <div>
        {this.state.collapse ? this.renderTitleOpen() : this.renderTitle()}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

  private toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  private renderTitle(): JSX.Element {
    return (
    <div
      className="justify-content-between"
      color={(!this.props.color ? '' : this.props.color)}
    >
    {this.props.title} <button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</button>
    </div>);
  }

  private renderTitleOpen(): JSX.Element {
    return (
    <div
      className="justify-content-between"
      color={(!this.props.color ? '' : this.props.color)}
    >
    {this.props.title} : {(!this.props.description ? '' : this.props.description)}
    <button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</button>
    </div>);
  }
}

export default Collapsible;
