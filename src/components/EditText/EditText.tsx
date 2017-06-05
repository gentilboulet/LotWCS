import * as React from 'react';
import { Button, Input, InputGroup, InputGroupAddon, FormGroup } from 'reactstrap';
import Icon from 'react-fa';

export interface Props {
  header: string;
  default?: string;
  validate: (v: string) => boolean ;
  onSubmit: (v: string) => void;
}

export interface State {
  value: string;
  edit: boolean;
}

export interface Event {
  target: { value: string };
}

class EditText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      edit: false,
      value: (this.props.default ? this.props.default : '')
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  textChange(event: Event) {
    this.setState({ value: event.target.value });
  }

  startEdit() {
    this.setState({edit: true});
  }

  endEdit() {
    if ( this.props.validate(this.state.value) ) {
      this.setState({
        edit: false,
      });
      this.props.onSubmit(this.state.value);
    }
  }

  render() {
    if (!this.state.edit) {
      return (
        <div onClick={this.startEdit} role="button">
          <span className="lead">{this.props.header} : </span>
          <span>{this.state.value}</span>
        </div>
      );
    } else {
      const validationState = (this.props.validate(this.state.value) ? 'success' : 'error');
      const btn = (this.props.validate(this.state.value) ?
        (
          <Button onClick={this.endEdit} color="success">
            <Icon name="check" />
          </Button>)
      :
        (
          <Button color="danger">
            <Icon name="times" />
          </Button>)
        );
      return (
        <div>
          <span className="lead">{this.props.header} : </span>
          <span>
            <FormGroup color={validationState}>
              <InputGroup>
                <Input
                  state={validationState}
                  onChange={this.textChange}
                  value={this.state.value}
                />
                <InputGroupAddon>
                    {btn}
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </span>
        </div>
      );
    }
  }
}

export default EditText;
