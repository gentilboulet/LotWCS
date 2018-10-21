import * as React from "react";

import "./InputGroup.css";

export class InputGroupField extends React.PureComponent<{}, {}> {
  public render = (): JSX.Element => {
    return <div className="InputGroupField">{this.props.children}</div>;
  };
}
