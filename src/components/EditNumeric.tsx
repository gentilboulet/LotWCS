import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";

import FieldHeader from "./FieldHeader";

export interface IEditNumericProps {
  name: string | JSX.Element;
  value: number;
  canBuy: boolean;
  onBuy: () => void;
}

interface IEditNumericState {
  edit: boolean;
}

class EditNumeric extends React.PureComponent<
  IEditNumericProps,
  IEditNumericState
> {
  constructor(props: IEditNumericProps) {
    super(props);

    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.doBuy = this.doBuy.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    if (!this.state.edit) {
      return (
        <InputGroup onClick={this.startEdit} role="button">
          <InputGroupAddon addonType="prepend">
            {this.props.name}
          </InputGroupAddon>
          <div className="form-control">{this.props.value}</div>
        </InputGroup>
      );
    } else {
      return (
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            {this.props.name}
          </InputGroupAddon>
          <div className="form-control">{this.props.value}</div>
          <InputGroupAddon addonType="append">
            {this.props.canBuy ? this.renderButton("plus", this.doBuy) : null}
            {this.renderButton("times", this.endEdit)}
          </InputGroupAddon>
        </InputGroup>
      );
    }
  }

  public componentDidUpdate() {
    if (this.state.edit && !this.props.canBuy) {
      this.endEdit();
    }
  }

  private startEdit() {
    if (this.props.canBuy) {
      this.setState({ edit: true });
    }
  }

  private endEdit() {
    this.setState({
      edit: false,
    });
  }

  private doBuy() {
    this.props.onBuy();
  }

  private renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.name} />;
  }

  private renderButton(icon: IconProp, f: () => void) {
    return (
      <Button onClick={f}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    );
  }
}

export default EditNumeric;
