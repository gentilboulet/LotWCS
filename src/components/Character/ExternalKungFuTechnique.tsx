import * as React from 'react';
import { Icon } from 'react-fa';
import { Button, Col, Container, Row  } from 'reactstrap';

import { KUNGFU_EXTERNAL, kungfuTechniqueData } from 'data/kungfu';
import { ICost } from 'state/costs';

import CollectionCard from 'components/CollectionCard';

export interface IExternalKungFuTechniqueProps {
  styleUid: string;
  uid: string;
  cost?: ICost;
  costs?: Array<{value: number, cost: ICost}>;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class ExternalKungFuTechnique extends React.Component<IExternalKungFuTechniqueProps, {}> {
  constructor(props: IExternalKungFuTechniqueProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const dataOption = kungfuTechniqueData(KUNGFU_EXTERNAL, this.props.styleUid, this.props.uid);
    if(dataOption === undefined) { return; }
    return <CollectionCard
      footer="Buy Me !!"
      header={this.renderHeader()}
      text={dataOption.description}
    />;
  }

  private renderHeader(): JSX.Element {
    const dataOption = kungfuTechniqueData(KUNGFU_EXTERNAL, this.props.styleUid, this.props.uid);
    return <Container>
             <Row>
               <Col>{dataOption.name}</Col>
               <Col xs={1} sm={1} md={1} lg={1} xl={1} >{this.renderButton()}</Col>
               <Col xs={1} sm={1} md={1} lg={1} xl={1} />
             </Row>
          </Container>;
  }

  private renderButton(): JSX.Element {
    if(this.props.canBuy) { return (<Button  onClick={this.onBuy} color="success"><Icon name="unlock-alt" /></Button>); }
    else { return (<Button color="danger"><Icon name="times" /></Button>); }
  }

  private onBuy(): void {
    if(this.props.cost !== undefined)
    { this.props.onBuy(this.props.cost); }
  }
}

export default ExternalKungFuTechnique;
