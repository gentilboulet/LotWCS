import * as React from "react";

import DDLText from "../../components/DDLText";
import * as ranks from "../../data/ranks";

export interface IRankProps {
  rank: ranks.TRank | undefined;
  onChange: (s: string) => void;
  locked: boolean;
}

class Rank extends React.PureComponent<IRankProps, {}> {
  public render() {
    const dataRank = ranks.getRank(this.props.rank);
    return (
      <DDLText
        header="Character Rank"
        default={dataRank ? (dataRank.name as string) : ""}
        values={ranks.ranks.map(rank => ({
          key: rank.value.toString(),
          label: rank.name
        }))}
        onSubmit={this.props.onChange}
        locked={this.props.locked}
      />
    );
  }
}

export default Rank;
