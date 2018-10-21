import * as React from "react";

import "./InputGroup.css";

export class InputGroup extends React.PureComponent<{}, {}> {
  public render = (): JSX.Element => {
    return <div className="InputGroup">{this.props.children}</div>;
  };
}
