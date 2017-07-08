import * as React from 'react';
import { Button,
  Col, Row, Container } from 'reactstrap';
import Icon from 'react-fa';
import { ICost } from '../types/costs';

export interface IEditSkillSpecialityProps {
  name: string;
  bought: boolean;
}

export interface IEditSkillProps {
  name: string;
  value: number;
  cost: ICost;
  reductionId?: number;
  specialities: IEditSkillSpecialityProps[];

  height: number;
  onSkillBuy: (skill: string, cost: ICost) => void;
  onSpecialityBuy: (skill: string, speciality: string) => void;
}

interface IEditSkillState {
  edit: boolean;
}

const renderHeader = (s: string) => { return (
  <Col>
  <h5><span
    className="align-text-middle"
  >
    {s} :
  </span></h5>
  </Col>); };

class EditSkill extends React.Component<IEditSkillProps, IEditSkillState> {
  constructor(props: IEditSkillProps) {
    super(props);

    this.state = {
      edit: false,
    };

    this.startEdit = this.startEdit.bind(this);
    this.endEdit = this.endEdit.bind(this);
    this.buySkill = this.buySkill.bind(this);
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

  render() {
    const specialitiesList = this.props.specialities.map(
      (s: IEditSkillSpecialityProps) => { return (s.bought ? s.name : ''); }
    );

    if (!this.state.edit) {
      return(
        <Container>
          <Row
            onClick={this.startEdit}
            role="button"
            style={{height: this.props.height}}
          >
          {renderHeader(this.props.name)}
          <Col>{this.props.value}</Col>
          {(specialitiesList.length > 0 ? <Col> '(' + specialitiesList + ')' </Col> : '' )}
          </Row>
        </Container>
      );
    } else {
      return(
        <Container>
          <Row>
            {renderHeader(this.props.name)}
            <Col>{this.props.value}</Col>
            <Col>
              <Button onClick={this.buySkill} >
                <Icon name="plus" />
              </Button>
              <Button onClick={this.endEdit} >
                <Icon name="times" />
              </Button>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default EditSkill;
