import * as React from "react";

import "./InputGroup.css";

export class InputGroupAddon extends React.PureComponent<{}, {}> {
  public render = (): JSX.Element => {
    return <div className="InputGroupAddon">{this.props.children}</div>;
  };
}
