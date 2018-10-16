import * as React from 'react';
import { Button, Collapse, ListGroupItem } from 'reactstrap';

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
        <Collapse isOpen={this.state.collapse}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }

  private toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  private renderTitle(): JSX.Element {
    return (
    <ListGroupItem
      className="justify-content-between"
      color={(!this.props.color ? '' : this.props.color)}
    >
    {this.props.title} <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
    </ListGroupItem>);
  }

  private renderTitleOpen(): JSX.Element {
    return (
    <ListGroupItem
      className="justify-content-between"
      color={(!this.props.color ? '' : this.props.color)}
    >
    {this.props.title} : {(!this.props.description ? '' : this.props.description)}
    <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
    </ListGroupItem>);
  }
}

export default Collapsible;
