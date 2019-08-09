import * as React from "react";

import EditText from "../../components/EditText";

export interface INameProps {
  value: string | undefined;
  onChange: (s: string) => void;
}

class Name extends React.PureComponent<INameProps, {}> {
  public render() {
    return (
      <EditText
        header="Character Name"
        default={this.props.value}
        validate={this.isStringNotNull}
        onSubmit={this.props.onChange}
      />
    );
  }

  private isStringNotNull(s: string): boolean {
    return s.trim().length > 0;
  }
}

export default Name;
