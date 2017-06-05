import * as React from 'react';
import { Button, Input, InputGroup, InputGroupAddon,
 Col, Row, Container } from 'reactstrap';
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

const renderHeader = (s: string) => { return (
  <Col>
  <h4><span
    className="align-text-middle"
  >
    {s} :
  </span></h4>
  </Col>); };

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

  render() {
    // First, the easy mode with nothing to do if locked
    if (this.props.locked) {
      return(
      <Container >
        <Row style={{height: this.props.height}} >
          {renderHeader(this.props.header)}
          <Col>{this.state.value}</Col>
          </Row>
      </Container>
      );
    }

    if (!this.state.edit) {
      return (
        <Container >
        <Row
          onClick={this.startEdit}
          role="button"
          disabled={true}
          style={{height: this.props.height}}
        >
          {renderHeader(this.props.header)}
          <Col>
            <span>{this.state.value}</span>
          </Col>
        </Row>
        </Container>
      );
    } else {
      const validationInputState = (this.props.validate(this.state.value) ? 'success' : 'error');
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
                    {btn}
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default EditText;
