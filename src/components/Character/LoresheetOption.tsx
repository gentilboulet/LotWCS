import * as React from 'react';
import { Icon } from 'react-fa';
import { Button, Col, Container, Row  } from 'reactstrap';

import { optionLoresheetData } from 'data/loresheets';
import { ICost } from 'state/costs';

import CollectionCard from 'components/CollectionCard';

export interface ILoresheetOptionProps {
  lsUid: string;
  uid: string;
  cost?: ICost;
  costs?: Array<{value: number, cost: ICost}>;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class LoresheetOption extends React.Component<ILoresheetOptionProps, {}> {
  constructor(props: ILoresheetOptionProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public render() {
    const dataOption = optionLoresheetData(this.props.lsUid, this.props.uid);
    if(dataOption === undefined) { return; }
    return <CollectionCard
      footer="Buy Me !!"
      header={this.renderHeader(dataOption.type)}
      text={dataOption.description}
    />;
  }

  private renderHeader(type: string): JSX.Element {
    return <Container>
             <Row>
               <Col>{type}</Col>
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

export default LoresheetOption;
