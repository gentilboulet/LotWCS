import * as React from "react";

import StaticText from "../../components/StaticText";

export interface IEntanglementProps {
  value: number;
}

class Entanglement extends React.PureComponent<IEntanglementProps, {}> {
  public render() {
    return (
      <StaticText header="Entanglement" value={this.props.value.toString()} />
    );
  }
}

export default Entanglement;
