import * as React from 'react';
import { Button,
  Col, Row, Container } from 'reactstrap';
import Icon from 'react-fa';
import { ICost } from '../types/costs';

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

  startEdit() {
      this.setState({edit: true});
  }

  endEdit() {
    this.setState({
      edit: false,
    });
  }

  buySkill() {
    this.props.onSkillBuy(this.props.name, this.props.cost);
  }

  renderHeader(): JSX.Element {
    return <FieldHeader label={this.props.name} />;
  }

  specialitiesList(): JSX.Element {
    return(
      <div>
      {this.props.specialities.map(
        (s: IEditSkillSpecialityProps) => { return (s.bought ? s.name : ''); }
      )}
      </div>
    );
  }

  renderButton(icon: string, f: () => void) {
    return <Button onClick={f}><Icon name={icon}/></Button>;
  }

  render() {
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
}

export default EditSkill;
