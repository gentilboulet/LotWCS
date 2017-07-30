import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import FieldHeader from './FieldHeader';

export interface IEditTextProps {
  header: string;
  default: string;
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

class EditText extends React.Component<IEditTextProps, IEditTextState> {
  constructor(props: IEditTextProps) {
    super(props);

    this.state = {
      edit: false,
      value: this.props.default,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.textChange = this.textChange.bind(this);

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }
  public render(): JSX.Element {
    return (this.state.edit) ? this.renderInput() : this.renderValue();
  }

  public componentWillReceiveProps(nextProps: IEditTextProps) {
    this.setState({
      value: nextProps.default,
    });
  }

  private startEdit() {
    if (this.props.locked ? false : true) {
      this.setState({edit: true});
    }
  }

  private endEdit() {
    if ( this.props.validate(this.state.value) ) {
      this.setState({
        edit: false,
      });
      if (this.state.value !== this.props.default) {
        this.props.onSubmit(this.state.value);
      }
    }
  }

  private textChange(e: IEditTextEvent) {
    this.setState({ value: e.target.value });
  }

  private renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.header} />;
  }

  private renderButton(isValueValid: boolean): JSX.Element {
    const btnOk = (<Button onClick={this.endEdit} color="success"><Icon name="check" /></Button>);
    const btnKo = (<Button color="danger"><Icon name="times" /></Button>);
    return (isValueValid) ? btnOk : btnKo;
  }

  private renderValue(): JSX.Element {
    return (
      <Container >
        <Row
          onClick={this.startEdit}
          role="button"
          disabled={true}
        >
          {this.renderHeader()}
          <Col>{this.state.value}</Col>
        </Row>
      </Container>
    );
  }

  private renderInput(): JSX.Element {
    const isValueValid = this.props.validate(this.state.value);
    const validationInputState = (isValueValid ? 'success' : 'error');
    return (
      <Container>
        <Row>
          <Col>{this.renderHeader()}</Col>
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
}

export default EditText;
