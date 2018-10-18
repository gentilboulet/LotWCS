import * as React from "react";

import StaticText from "components/StaticText";

export interface IDestinyProps {
  value: number;
}

class Destiny extends React.PureComponent<IDestinyProps, {}> {
  public render() {
    return <StaticText header="Destiny" value={this.props.value.toString()} />;
  }
}

export default Destiny;
