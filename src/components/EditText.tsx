import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';

import FieldHeader from 'components/FieldHeader';

const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
}

export interface IEditTextProps {
  header: string;
  default?: string;
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
      value: this.props.default ? this.props.default : '',
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  public render(): JSX.Element {
    return (this.state.edit) ? this.renderInput() : this.renderValue();
  }

  public componentWillReceiveProps(nextProps: IEditTextProps) {
    this.setState({
      value: nextProps.default ? nextProps.default : '',
    });
  }

  private startEdit = () => {
    if (this.props.locked ? false : true) {
      this.setState({edit: true});
    }
  }

  private endEdit = () => {
    this.setState({
      value: this.state.value.trim()
    });
    if ( this.props.validate(this.state.value) ) {
      this.setState({
        edit: false,
      });
      if (this.state.value !== this.props.default) {
        this.props.onSubmit(this.state.value);
      }
    }
  }

  private textChange = (e: IEditTextEvent) => {
    this.setState({ value: e.target.value });
  }

  private renderHeader = (): JSX.Element => {
    return <FieldHeader label={this.props.header} />;
  }

  private renderButton = (isValueValid: boolean): JSX.Element => {
    const btnOk = (<Button onClick={this.endEdit} color="success"><Icon name="check" /></Button>);
    const btnKo = (<Button color="success" disabled={true}><Icon name="check" /></Button>);
    return (isValueValid) ? btnOk : btnKo;
  }

  private renderValue = (): JSX.Element => {
    return (
      <Container >
        <Row
          onClick={this.startEdit}
          role="button"
          disabled={true}
          style={styles.row}
        >
          <Col>{this.renderHeader()}</Col>
          <Col>{this.state.value}</Col>
        </Row>
      </Container>
    );
  }

  private renderInput = (): JSX.Element => {
    const isValueValid = this.props.validate(this.state.value);
    const validationInputState = (isValueValid ? 'success' : 'error');
    return (
      <Container>
        <Row style={styles.row}>
          <Col xs="6">{this.renderHeader()}</Col>
          <Col>
            <InputGroup>
              <Input
                state={validationInputState}
                onChange={this.textChange}
                value={this.state.value}
              />
              <InputGroupAddon addonType="append">
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
