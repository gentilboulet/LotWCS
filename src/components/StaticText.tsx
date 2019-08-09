import * as React from "react";
import { InputGroup, InputGroupAddon } from "reactstrap";

export interface IStaticTextProps {
  header: string;
  value: string;
}

class StaticText extends React.PureComponent<IStaticTextProps, {}> {
  public render = (): JSX.Element => {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          {this.props.header}
        </InputGroupAddon>
        <div className="form-control">{this.props.value}</div>
      </InputGroup>
    );
  };
}

export default StaticText;
