import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Row } from 'reactstrap';

import FieldHeader from 'components/FieldHeader';

export interface IEditNumericProps {
  name: string;
  value: number;
  canBuy: boolean;
  onBuy: () => void;
}

interface IEditNumericState {
  edit: boolean;
}

class EditNumeric extends React.Component<IEditNumericProps, IEditNumericState> {
  constructor(props: IEditNumericProps) {
    super(props);

    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.buySkill = this.buySkill.bind(this);
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
            <Col>{this.renderHeader()}</Col>
            <Col>{this.props.value}</Col>
            <Col>
              {this.props.canBuy ? this.renderButton('plus', this.buySkill) : ''}
              {this.renderButton('times', this.endEdit)}
            </Col>
          </Row>
        </Container>
      );
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

  private buySkill() {
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
