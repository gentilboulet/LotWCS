import * as React from 'react';

export interface IFieldHeader { label: string; }

class FieldHeader extends React.Component<IFieldHeader, {}> {
  render(): JSX.Element {
    return (
      <h4>
        <span className="align-text-middle" >{this.props.label}
        </span>
      </h4>
    );
  }
}

export default FieldHeader;
