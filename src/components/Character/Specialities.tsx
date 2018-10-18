import * as React from "react";

import { ICost } from "state/costs";

import EditSpecialities from "./EditSpecialities";

export interface ISpecialitiesProps {
  available: Array<{
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
      <div className="Specialities">
        <div>
          <div>
            <EditSpecialities
              bought={this.props.bought}
              available={this.props.available}
              onBuy={this.props.onBuy}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Specialities;
