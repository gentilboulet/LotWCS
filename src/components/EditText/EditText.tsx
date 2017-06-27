import * as React from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Col, Row, Container } from 'reactstrap';
import Icon from 'react-fa';

export interface IEditTextProps {
  header: string;
  default?: string;
  height: number;
  locked?: boolean;
  validate: (v: string) => boolean ;
  onSubmit: (v: string) => void;
}

interface IEditTextState {
  value: string;
  edit: boolean;
}

export interface IEditTextEvent {
  target: { value: string };
}

const renderHeader = (s: string): JSX.Element => {
  return (
    <Col>
      <h4>
        <span className="align-text-middle">{s} :</span>
      </h4>
    </Col>
  );
};

class EditText extends React.Component<IEditTextProps, IEditTextState> {
  constructor(props: IEditTextProps) {
    super(props);

    this.state = {
      edit: false,
      value: (this.props.default ? this.props.default : '')
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.textChange = this.textChange.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  textChange(IEditTextEvent: IEditTextEvent) {
    this.setState({ value: IEditTextEvent.target.value });
  }

  startEdit() {
    if (this.props.locked ? false : true) {
      this.setState({edit: true});
    }
  }

  endEdit() {
    if ( this.props.validate(this.state.value) ) {
      this.setState({
        edit: false,
      });
      if (this.state.value !== this.props.default) {
        this.props.onSubmit(this.state.value);
      }
    }
  }

  renderButton(isValueValid: boolean): JSX.Element {
    const btnOk = (<Button onClick={this.endEdit} color="success"><Icon name="check" /></Button>);
    const btnKo = (<Button color="danger"><Icon name="times" /></Button>);
    return (isValueValid) ? btnOk : btnKo;
  }

  renderInput(): JSX.Element {
    const isValueValid = this.props.validate(this.state.value);
    const validationInputState = (isValueValid ? 'success' : 'error');
    return (
      <Container>
        <Row style={{height: this.props.height}} >
          {renderHeader(this.props.header)}
          <Col>
            <InputGroup>
              <Input
                state={validationInputState}
                onChange={this.textChange}
                value={this.state.value}
              />
              <InputGroupAddon>
                  {this.renderButton(isValueValid)}
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  renderValue(): JSX.Element {
    return (
      <Container >
        <Row
          onClick={this.startEdit}
          role="button"
          disabled={true}
          style={{height: this.props.height}}
        >
          {renderHeader(this.props.header)}
          <Col>{this.state.value}</Col>
        </Row>
      </Container>
    );
  }

  render(): JSX.Element {
    return (this.state.edit) ? this.renderInput() : this.renderValue();
  }
}

export default EditText;
