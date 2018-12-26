import * as React from "react";

import SelectorList, { IOption } from "components/SelectorList";

import Loresheet from "containers/Character/Loresheet";
import {
  IDataLoresheet,
  loresheets,
  loresheetsCategories
} from "data/loresheets";

class LoresheetsList extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  public render() {
    const nestedOptions = loresheetsCategories.map(category => {
      const categories: IOption[] = [
        { id: category, label: category, disabled: true }
      ];
      const lsInCategory: IOption[] = loresheets
        .filter((ls: IDataLoresheet) => ls.category === category)
        .map((ls: IDataLoresheet) => ({
          disabled: false,
          id: ls.uid,
          label: ls.name,
          meta: ls.name + "," + category
        }));
      return categories.concat(lsInCategory);
    });

    const options = ([] as IOption[]).concat(...nestedOptions); // Flattening

    return (
      <SelectorList
        options={options}
        preSelected={[]}
        renderItem={this.renderItem}
      />
    );
  }

  private renderItem(uid: string): JSX.Element {
    return <Loresheet uid={uid} />;
  }
}

export default LoresheetsList;
