/*import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ICost } from 'state/costs';

import EditSpeciality from './EditSpeciality';

export interface ISpecialityProps {
  name: string;
  bought: boolean;
  cost: ICost;
  canBuySpeciality: boolean;
}

export interface ISpecialityProps {
  name: string;
  value: number;
  cost: ICost;
  canBuySpeciality: boolean;
  specialities: [ISpecialityProps];
}

export interface ISpecialityProps {
  skills: ISpecialityProps[];
  onSpecialityBuy: (skill: string, cost: ICost) => void;
  onSpecialityBuy: (skill: string, speciality: string, cost: ICost) => void;
}

class Speciality extends React.Component<ISpecialityProps, {}> {
  public render() {
    return(
      <Container className="Speciality">
        <Col>
          {
            this.props.skills.map(
              (s: ISpecialityProps) => { return (
                <Row key={'rowSpeciality' + s.name}>
                  <EditSpeciality
                    name={s.name}
                    value={s.value}
                    cost={s.cost}
                    specialities={s.specialities}
                    canBuySpeciality={s.canBuySpeciality}
                    onSpecialityBuy={this.props.onSpecialityBuy}
                    onSpecialityBuy={this.props.onSpecialityBuy}
                  />
                </Row> ); }
          )}
        </Col>
      </Container>
    );
  }
}

export default Speciality;
*/
