import * as React from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

import ControlledList from 'components/ControlledList';

import ExternalKungFu from 'containers/Character/ExternalKungFu';
import { externalKungfu, getKungFuType, internalKungfu, KUNGFU_EXTERNAL, kungfuData } from 'data/kungfu';

class KungFuList extends React.PureComponent<{}, {}> {
  constructor(props: {}) {
    super(props);

    this.renderListItemLabel = this.renderListItemLabel.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  public render() {
    const externals = externalKungfu.map(kf => ({id: kf.uid, label: kf.name}));
    const internals = internalKungfu.map(kf => ({id: kf.uid, label: kf.name}));

    return (
      <ControlledList
        options={externals.concat(internals)}
        preSelected={['Blossom Harvest']}
        renderItem={this.renderItem}
      />
    );
  }

  private renderListItemLabel(uid: string): string {
    const type = getKungFuType(uid);
    const data = kungfuData(type, uid);
    return data.name;
  }

  private renderItem(uid: string): JSX.Element {
    const type = getKungFuType(uid);
    if(type === KUNGFU_EXTERNAL) {
      return <ExternalKungFu uid={uid} />
    } else {
      return <Card><CardBody top="true"><CardText>{uid}</CardText></CardBody></Card>
    }
  }
}

export default KungFuList;
