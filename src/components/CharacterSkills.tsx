import * as React from 'react';
import EditSkill from '../components/EditSkill';
import { Container, Row, Col } from 'reactstrap';

interface ISpecialityProps {
  name: string;
  bought: boolean;
}

interface ISkillProps {
  name: string;
  value: number;
  specialities: [ISpecialityProps];
}

export interface ICharacterSkillsProps {
  skills: ISkillProps[];
  onSkillBuy: (skill: string) => void;
  onSpecialityBuy: (skill: string, speciality: string) => void;
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
                    specialities={[]}
                    height={56}
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
