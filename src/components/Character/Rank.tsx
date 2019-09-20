import * as React from "react";

import DDLText from "../../components/DDLText";
import * as ranks from "../../data/ranks";

export interface IRankProps {
  rank: ranks.TRank | undefined;
  onChange: (s: ranks.TRank) => void;
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
          label: rank.name,
          key: rank.value.toString()
        }))}
        onSubmit={(s: string) => this.props.onChange(Number(s) as ranks.TRank)}
        locked={this.props.locked}
      />
    );
  }
}

export default Rank;
