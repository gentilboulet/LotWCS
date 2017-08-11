import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Row } from 'reactstrap';

import { ICost } from 'costs/types';

import FieldHeader from './FieldHeader';

export interface IEditSkillSpecialityProps {
  name: string;
  bought: boolean;
  canBuySpeciality: boolean;
}

export interface IEditSkillProps {
  name: string;
  value: number;
  cost: ICost;
  canBuySkill: boolean;
  specialities: IEditSkillSpecialityProps[];

  onSkillBuy: (skill: string, cost: ICost) => void;
  onSpecialityBuy: (skill: string, speciality: string, cost: ICost) => void;
}

interface IEditSkillState {
  edit: boolean;
}

class EditSkill extends React.Component<IEditSkillProps, IEditSkillState> {
  constructor(props: IEditSkillProps) {
    super(props);

    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.buySkill = this.buySkill.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.specialitiesList = this.specialitiesList.bind(this);
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
          <Col>{this.specialitiesList()}</Col>
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
              {this.props.canBuySkill ? this.renderButton('plus', this.buySkill) : ''}
              {this.renderButton('times', this.endEdit)}
            </Col>
          </Row>
        </Container>
      );
    }
  }

  private startEdit() {
      this.setState({edit: true});
  }

  private endEdit() {
    this.setState({
      edit: false,
    });
  }

  private buySkill() {
    this.props.onSkillBuy(this.props.name, this.props.cost);
  }

  private renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.name} />;
  }

  private specialitiesList(): JSX.Element {
    return(
      <div>
      {this.props.specialities.map(
        (s: IEditSkillSpecialityProps) => (s.bought ? s.name : '')
      )}
      </div>
    );
  }

  private renderButton(icon: string, f: () => void) {
    return <Button onClick={f}><Icon name={icon}/></Button>;
  }
}

export default EditSkill;
