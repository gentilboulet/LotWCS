import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import { ICost } from 'state/costs';

import EditSpecialities from './EditSpecialities';

export interface ISpecialitiesProps {
  available: Array<{
    name: string,
    canBuy: boolean
    cost: ICost,
  }>
  bought: string[];

  onBuy: (speciality: string, cost: ICost) => void;
}

class Specialities extends React.Component<ISpecialitiesProps, {}> {
  public render() {
    return(
      <Container className="Specialities">
	       <Row><Col>
          <EditSpecialities
            bought={this.props.bought}
            available={this.props.available}
            onBuy={this.props.onBuy}
          />
        </Col></Row>
      </Container>
    );
  }
}

export default Specialities;
