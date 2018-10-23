import * as React from "react";

import DDLText from "components/DDLText";
import { archetypes, IDataArchetype } from "data/archetypes";

export interface IArchetypeProps {
  value: string | undefined;
  onChange: (s: string) => void;
  locked: boolean;
}

class Archetype extends React.PureComponent<IArchetypeProps, {}> {
  public render() {
    return (
      <DDLText
        header="Character Archetype"
        default={this.props.value}
        values={archetypes
          .sort((a: IDataArchetype, b: IDataArchetype) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .map((a: IDataArchetype) => ({
            key: a.key,
            label: a.name
          }))}
        onSubmit={this.props.onChange}
        locked={this.props.locked}
      />
    );
  }
}

export default Archetype;
