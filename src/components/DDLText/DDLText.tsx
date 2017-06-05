import * as React from 'react';
import { Button, InputGroup, InputGroupAddon, Col, Row,
  ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import Icon from 'react-fa';

export interface IDDLItem {
    key: string;
    label: string;
}

export interface IDDLTextProps {
  header: string;
  default?: string;
  height: number;
  locked?: boolean;
  values: IDDLItem[];
  onSubmit: (v: string) => void;
}

interface IDDLTextState {
  value: string;
  edit: boolean;
  dropdownOpen: boolean;
}

export interface IDDLTextEvent {
  target: { value: string };
}

const renderHeader = (s: string) => { return (
  <Col>
  <h4>{s} : </h4>
  </Col>); };

class DDLText extends React.Component<IDDLTextProps, IDDLTextState> {
  constructor(props: IDDLTextProps) {
    super(props);

    this.state = {
      edit: false,
      dropdownOpen: false,
      value: (this.props.default ? this.props.default : '')
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.toggleDDL = this.toggleDDL.bind(this);
    this.select = this.select.bind(this);
  }

  startEdit() {
    if (this.props.locked ? false : true)  {
      this.setState({edit: true, dropdownOpen: false});
    }
  }

  endEdit() {
    this.setState({
      edit: false,
      dropdownOpen: false,
    });
    if (this.state.value !== this.props.default) {
      this.props.onSubmit(this.state.value);
    }
  }

  toggleDDL() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(key: string) {
    this.setState(
      {value: key}
    );
  }

  render() {
    const labelForSelectedKey = this.props.values.map(({key, label}: IDDLItem) => {
          return ( key === this.state.value ? label : '');
        });

    // First, the easy mode with nothing to do if locked
    if (this.props.locked) {
      return (
        <Row style={{height: this.props.height}}>
          {renderHeader(this.props.header)}
          <Col>
            {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
          </Col>
        </Row>
      );
    }

    if (!this.state.edit) {
      return (
        <Row onClick={this.startEdit} role="button" style={{height: this.props.height}}>
          {renderHeader(this.props.header)}
          <Col>
            {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
          </Col>
        </Row>
      );
    } else {

    const ddl = this.props.values.map( ({key, label}: IDDLItem) => {
      return (
        <DropdownItem key={key} onClick={() => {this.select(key); }}>
          {label}
        </DropdownItem>
      );
    });

    const btnOk = (
        <Button onClick={this.endEdit} color="success">
          <Icon name="check" />
        </Button>);
    const btnKo = (
        <Button color="danger">
          <Icon name="times" />
        </Button>);

    const btn = ( labelForSelectedKey.length > 0 ) ? btnOk : btnKo;

    return (
      <Row style={{height: this.props.height}} >
        {renderHeader(this.props.header)}
        <Col>
          <InputGroup>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDDL}>
              <DropdownToggle caret={true}>
                {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
              </DropdownToggle>
              <DropdownMenu>
                {ddl}
              </DropdownMenu>
            </ButtonDropdown>
            <InputGroupAddon>
                {btn}
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );
    }
  }
}

export default DDLText;
