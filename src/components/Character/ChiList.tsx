import * as React from 'react';

import Chi from 'containers/Character/Chi';
import { chiNames, TChiName } from 'data/chi';

class ChiList extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <div>{
        chiNames.map((name: TChiName) => {
          return <div key={name}>
                  <div><Chi name={name} /></div>
                </div>;
        })
      }</div>
    );
  }
}

export default ChiList;
