import * as React from "react";

export interface IFieldHeader {
  label: string | JSX.Element;
}

const style: React.CSSProperties = {
  display: "block",
  textAlign: "center",
};

class FieldHeader extends React.PureComponent<IFieldHeader, {}> {
  public render(): JSX.Element {
    return (
      <h4 style={style}>
        <span className="align-text-middle">{this.props.label}</span>
      </h4>
    );
  }
}

export default FieldHeader;
