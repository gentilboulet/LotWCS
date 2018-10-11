import * as React from 'react';
import Icon from 'react-fa';
import { Button, Col, Container, Row } from 'reactstrap';

import { externalKungfu, IDataExternalKungfu, } from 'data/kungfu';
import { ICost } from 'state/costs';

import ExternalKungFuTechniques from 'components/Character/ExternalKungFuTechniques';
import ModalCard from 'components/ModalCard';

export interface IExternalKungFuProps {
  uid: string;
  isOpen: boolean;
  cost: ICost;
  canOpen: boolean;
  knownTechniques: string[];
  onOpen: (cost: ICost) => void;
}

class ExternalKungFu extends React.Component<IExternalKungFuProps, {}> {
  constructor(props: IExternalKungFuProps) {
    super(props);

    this.onOpen = this.onOpen.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  public render() {
    const found = externalKungfu.find((k: IDataExternalKungfu) => k.uid === this.props.uid);
    if( found === undefined) { return; }
    const card = {
      header: this.renderHeader(),
      text: this.renderCard(found),
      title: found.name,
    };
    return <ModalCard card={card} >
            <ExternalKungFuTechniques styleUid={this.props.uid} knownTechniques={this.props.knownTechniques}  />
          </ModalCard>
  }

  private onOpen(): void { this.props.onOpen(this.props.cost); }

  private renderHeader(): JSX.Element {
    return (<Container><Row><Col/>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} >{this.renderButton()}</Col>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} />
    </Row></Container>);
  }

  private renderButton(): JSX.Element {
    if(this.props.isOpen) { return <Button color="primary"><Icon name="leanpub" /></Button>; }
    if(this.props.canOpen) { return (<Button  onClick={this.onOpen} color="success"><Icon name="unlock-alt" /></Button>); }
    else { return (<Button color="danger"><Icon name="times" /></Button>); }
  }

  private renderCard(kungfu: IDataExternalKungfu): string {
    return "Weapons : " + kungfu.weapons.map(w=>' ' + w);
  }
}

export default ExternalKungFu;
