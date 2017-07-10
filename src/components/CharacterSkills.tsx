import * as React from 'react';
import { ICost } from '../types/costs';
import EditSkill from '../components/EditSkill';
import { Container, Row, Col } from 'reactstrap';

export interface ISpecialityProps {
  name: string;
  bought: boolean;
  canBuySpeciality: boolean;
}

export interface ISkillProps {
  name: string;
  value: number;
  cost: ICost;
  canBuySkill: boolean;
  specialities: [ISpecialityProps];
}

export interface ICharacterSkillsProps {
  skills: ISkillProps[];
  onSkillBuy: (skill: string, cost: ICost) => void;
  onSpecialityBuy: (skill: string, speciality: string, cost: ICost) => void;
}

class CharacterSkills extends React.Component<ICharacterSkillsProps, object> {
  render() {
    return(
      <Container className="CharacterSkills">
        <Col>
          {
            this.props.skills.map(
              (s: ISkillProps) => { return (
                <Row key={'rowSkill' + s.name}>
                  <EditSkill
                    name={s.name}
                    value={s.value}
                    cost={s.cost}
                    specialities={s.specialities}
                    canBuySkill={s.canBuySkill}
                    onSkillBuy={this.props.onSkillBuy}
                    onSpecialityBuy={this.props.onSpecialityBuy}
                  />
                </Row> ); }
          )}
        </Col>
      </Container>
    );
  }
}

export default CharacterSkills;
