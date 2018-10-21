import * as React from "react";
import Icon from "react-fa";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

export interface IEditTextProps {
  header: string;
  default?: string;
  locked?: boolean;
  validate: (v: string) => boolean;
  onSubmit: (v: string) => void;
}

interface IEditTextState {
  value: string;
  edit: boolean;
}

export interface IEditTextEvent {
  target: { value: string };
}

class EditText extends React.PureComponent<IEditTextProps, IEditTextState> {
  constructor(props: IEditTextProps) {
    super(props);

    this.state = {
      edit: false,
      value: this.props.default ? this.props.default : ""
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.textChange = this.textChange.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderNoEdit = this.renderNoEdit.bind(this);
  }

  public render(): JSX.Element {
    return this.state.edit ? this.renderEdit() : this.renderNoEdit();
  }

  public componentWillReceiveProps(nextProps: IEditTextProps) {
    this.setState({
      value: nextProps.default ? nextProps.default : ""
    });
  }

  private startEdit() {
    if (this.props.locked ? false : true) {
      this.setState({ edit: true });
    }
  }

  private endEdit() {
    this.setState({
      edit: false,
      value: this.state.value.trim()
    });
    if (this.props.validate(this.state.value)) {
      if (this.state.value !== this.props.default) {
        this.props.onSubmit(this.state.value);
      }
    }
  }

  private textChange(e: IEditTextEvent) {
    this.setState({ value: e.target.value });
  }

  private renderButton(isValueValid: boolean): JSX.Element {
    const btnOk = (
      <Button onClick={this.endEdit} color="success">
        <Icon name="check" />
      </Button>
    );
    const btnKo = (
      <Button onClick={this.endEdit} color="danger">
        <Icon name="times" />
      </Button>
    );
    return isValueValid ? btnOk : btnKo;
  }

  private renderNoEdit(): JSX.Element {
    return (
      <div className="Grid-cell" onClick={this.startEdit} role="button">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            {this.props.header}
          </InputGroupAddon>
          <div className="form-control">{this.state.value}</div>
        </InputGroup>
      </div>
    );
  }

  private renderEdit(): JSX.Element {
    const isValueValid = this.props.validate(this.state.value);
    return (
      <div className="Grid-cell">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            {this.props.header}
          </InputGroupAddon>
          <Input
            onChange={this.textChange}
            value={this.state.value}
            placeholder={this.state.value}
            valid={isValueValid}
          />
          <InputGroupAddon addonType="append">
            {this.renderButton(isValueValid)}
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default EditText;
