import * as React from "react";

import EditText from "components/EditText";

export interface IConceptProps {
  value: string | undefined;
  onChange: (s: string) => void;
}

class Concept extends React.PureComponent<IConceptProps, {}> {
  public render() {
    return (
      <EditText
        header="Character Concept"
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

export default Concept;
