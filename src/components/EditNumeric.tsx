import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Row } from 'reactstrap';

import FieldHeader from 'components/FieldHeader';

export interface IEditNumericProps {
  name: string | JSX.Element;
  value: number;
  canBuy: boolean;
  onBuy: () => void;
}

interface IEditNumericState {
  edit: boolean;
}

class EditNumeric extends React.PureComponent<IEditNumericProps, IEditNumericState> {
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
      return(
        <Container>
          <Row
            onClick={this.startEdit}
            role="button"
          >
          <Col>{this.renderHeader()}</Col>
          <Col>{this.props.value}</Col>
          </Row>
        </Container>
      );
    } else {
      return(
        <Container>
          <Row>
            <Col >{this.renderHeader()}</Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>{this.props.value}</Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>{this.props.canBuy ? this.renderButton('plus', this.doBuy) : ''}</Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1}>{this.renderButton('times', this.endEdit)}</Col>
          </Row>
        </Container>
      );
    }
  }

  public componentDidUpdate() {
    if(this.state.edit && !this.props.canBuy )
    {
      this.endEdit();
    }
  }

  private startEdit() {
    if(this.props.canBuy) {
      this.setState({edit: true});
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

  private renderButton(icon: string, f: () => void) {
    return <Button onClick={f}><Icon name={icon}/></Button>;
  }
}

export default EditNumeric;
