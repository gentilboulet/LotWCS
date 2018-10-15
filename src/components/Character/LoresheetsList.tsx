import * as React from 'react';

import ControlledList from 'components/ControlledList';

import Loresheet from 'containers/Character/Loresheet';
import { IDataLoresheet, loresheets, loresheetsCategories } from 'data/loresheets';

type TOptionArray = Array<{id: string, label: string, disabled?: boolean}>;

class LoresheetsList extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  public render() {
    const nestedOptions = loresheetsCategories.map((category) => {
        const cat: TOptionArray = [{id: category, label: category, disabled: true}];
        const catLS: TOptionArray = loresheets
          .filter((ls: IDataLoresheet) => ls.category === category)
          .map((ls: IDataLoresheet) => ({id: ls.uid, label: ls.name}));
        return cat.concat(catLS);
    });

    const options = ([] as TOptionArray).concat(...nestedOptions);

    return  <ControlledList
              options={options}
              preSelected={['wulin']}
              renderItem={this.renderItem}
            />
  }

  private renderItem(uid: string): JSX.Element {
    return <Loresheet uid={uid} />
  }
}

export default LoresheetsList;
