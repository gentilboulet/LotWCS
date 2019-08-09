import * as React from "react";

import DDLText from "../../components/DDLText";
import { ranks } from "../../data/ranks";

export interface IRankProps {
  rank: { name: string; value: number } | undefined;
  onChange: (s: string) => void;
  locked: boolean;
}

class Rank extends React.PureComponent<IRankProps, {}> {
  public render() {
    return (
      <DDLText
        header="Character Rank"
        default={this.props.rank ? this.props.rank.name : ""}
        values={ranks.map(({ name: n, key: k }) => ({ label: n, key: k }))}
        onSubmit={this.props.onChange}
        locked={this.props.locked}
      />
    );
  }
}

export default Rank;
