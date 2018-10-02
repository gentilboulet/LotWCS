import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Row } from 'reactstrap';

import { IDataLoresheet, loresheets } from 'data/loresheets';
import { ICost } from 'state/costs';

import LoresheetOptions from 'components/Character/LoresheetOptions';
import ModalCard from 'components/ModalCard';

export interface ILoresheetProps {
  uid: string;
  known: boolean;
  knownOptions: Array<{ uid: string, payload?: any }>;
  cost: ICost;
  canBuy: boolean;
  onBuy: (cost: ICost) => void;
}

class Loresheet extends React.Component<ILoresheetProps, {}> {
  constructor(props: ILoresheetProps) {
    super(props);

    this.onBuy = this.onBuy.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  public render() {
    const found = loresheets.find((ls: IDataLoresheet) => ls.uid === this.props.uid);
    if( found === undefined) { return; }
    const card = {
      header: this.renderHeader(),
      text: found.description,
      title: found.name,
    };
    return <ModalCard card={card}>
      <LoresheetOptions
        knownOptions={this.props.knownOptions}
        lsUid={this.props.uid}
      />
    </ModalCard>;
  }

  private onBuy(): void { this.props.onBuy(this.props.cost); }

  private renderHeader(): JSX.Element {
    return (<Container><Row><Col/>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} >{this.renderButton()}</Col>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} />
    </Row></Container>);
  }
  private renderButton(): JSX.Element {
    if(this.props.known) { return <Button color="primary"><Icon name="leanpub" /></Button>; }
    if(this.props.canBuy) { return (<Button  onClick={this.onBuy} color="success"><Icon name="unlock-alt" /></Button>); }
    else { return (<Button color="danger"><Icon name="times" /></Button>); }
  }
}

export default Loresheet;
