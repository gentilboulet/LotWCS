import * as React from 'react';
import Icon from 'react-fa';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle,
  InputGroup, InputGroupAddon, Row } from 'reactstrap';

import FieldHeader from './FieldHeader';

export interface IDDLItem {
    key: string;
    label: string;
}

export interface IDDLTextProps {
  header: string;
  default?: string;
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

class DDLText extends React.Component<IDDLTextProps, IDDLTextState> {
  constructor(props: IDDLTextProps) {
    super(props);

    this.state = {
      dropdownOpen: false,
      edit: false,
      value: (this.props.default ? this.props.default : '')
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.toggleDDL = this.toggleDDL.bind(this);
    this.select = this.select.bind(this);
    this.getLabelForSelectedKey = this.getLabelForSelectedKey.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDropdownList = this.renderDropdownList.bind(this);
    this.renderDropdownItems = this.renderDropdownItems.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }
  public render(): JSX.Element {
    return (this.state.edit) ? this.renderDropdownList() : this.renderValue();
  }

  private startEdit() {
    if (this.props.locked ? false : true)  {
      this.setState({edit: true, dropdownOpen: false});
    }
  }

  private endEdit() {
    this.setState({edit: false, dropdownOpen: false});
    const labelForSelectedKey = this.getLabelForSelectedKey();
    if (this.state.value !== this.props.default && labelForSelectedKey.length > 0 ) {
      this.props.onSubmit(this.state.value);
    }
  }

  private toggleDDL() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }

  private select(key: string) {
    this.setState({value: key});
  }

  private getLabelForSelectedKey(): string {
    return this.props.values
      .map( ({key, label}: IDDLItem) => ( key === this.state.value ? label : '') )
      .filter( (e: string) => (e !== ''))
      .join(', ');
  }

  private renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.header} />;
  }

  private renderButton(labelForSelectedKey: string): JSX.Element {
    const btnOk = (<Button onClick={this.endEdit} color="success"><Icon name="check" /></Button>);
    const btnKo = (<Button onClick={this.endEdit} color="danger"><Icon name="times" /></Button>);
    return (labelForSelectedKey.length > 0) ? btnOk : btnKo;
  }

  private renderDropdownItems(): JSX.Element[] {
    return this.props.values.map( ({key, label}: IDDLItem) => {
      return (
// tslint:disable-next-line jsx-no-lambda
        <DropdownItem key={key} onClick={() => {this.select(key); }}>
          {label}
        </DropdownItem>
      );
    });
  }

  private renderDropdownList(): JSX.Element {
    const labelForSelectedKey = this.getLabelForSelectedKey();
    return (
      <Row>
        <Col>{this.renderHeader()}</Col>
        <Col>
          <InputGroup>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDDL}>
              <DropdownToggle caret={true}>
                {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
              </DropdownToggle>
              <DropdownMenu>
                {this.renderDropdownItems()}
              </DropdownMenu>
            </ButtonDropdown>
            <InputGroupAddon addonType="append">
                {this.renderButton(labelForSelectedKey)}
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );
  }

  private renderValue(): JSX.Element {
    const labelForSelectedKey = this.getLabelForSelectedKey();
    return (
      <Row onClick={this.startEdit} role="button">
        {this.renderHeader()}
        <Col>
          {labelForSelectedKey.length > 0 ? labelForSelectedKey : this.state.value}
        </Col>
      </Row>
    );
  }
}

export default DDLText;
