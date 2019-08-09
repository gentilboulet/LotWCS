import * as React from "react";

import SelectorList, { IOption } from "../../components/SelectorList";

import ExternalKungFu from "../../containers/Character/ExternalKungFu";
import InternalKungFu from "../../containers/Character/InternalKungFu";

import {
  externalKungfu,
  getKungFuType,
  internalKungfu
} from "../../data/kungfu";
import { KUNGFU_EXTERNAL } from "../../data/kungfu/types";

class KungFuList extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  public render() {
    const externals: IOption[] = externalKungfu.map(kf => ({
      disabled: false,
      id: kf.uid,
      label: kf.name,
      meta: kf.name + "," + "external"
    }));
    const internals: IOption[] = internalKungfu.map(kf => ({
      disabled: false,
      id: kf.uid,
      label: kf.name,
      meta: kf.name + "," + "internal"
    }));

    const externalHeader: IOption[] = [
      {
        disabled: true,
        id: "External Styles",
        label: "External Styles",
        meta: "external"
      }
    ];
    const internalHeader: IOption[] = [
      {
        disabled: true,
        id: "Internal Styles",
        label: "Internal Styles",
        meta: "internal"
      }
    ];

    return (
      <SelectorList
        options={externalHeader
          .concat(externals)
          .concat(internalHeader)
          .concat(internals)}
        preSelected={[]}
        renderItem={this.renderItem}
      />
    );
  }

  private renderItem(uid: string): JSX.Element {
    const type = getKungFuType(uid);
    if (type === KUNGFU_EXTERNAL) {
      return <ExternalKungFu uid={uid} />;
    } else {
      return <InternalKungFu uid={uid} />;
    }
  }
}

export default KungFuList;
