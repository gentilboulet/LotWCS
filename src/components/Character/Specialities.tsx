import * as React from "react";

import { ICost } from "../../state/costs";

import EditSpecialities from "./EditSpecialities";

export interface ISpecialitiesProps {
  specialities: Array<{
    name: string;
    canBuy: boolean;
    cost: ICost;
  }>;
  bought: string[];

  onBuy: (speciality: string, cost: ICost) => void;
}

class Specialities extends React.PureComponent<ISpecialitiesProps, {}> {
  public render() {
    return (
      <EditSpecialities
        bought={this.props.bought}
        specialities={this.props.specialities}
        onBuy={this.props.onBuy}
      />
    );
  }
}

export default Specialities;
