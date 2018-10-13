import * as React from 'react';

import { Container, Modal, ModalBody, ModalHeader } from 'reactstrap';

import CollectionCard from 'components/CollectionCard';

export interface IModalCardProps {
  card: {
    title: string | JSX.Element;
    subtitle?: string;
    text: string;
    footer?: string  | JSX.Element;
    header?: string | JSX.Element;
  };
}

interface IModalCardState {
  modal: boolean;
}

export default class ModalCard extends React.PureComponent<IModalCardProps, IModalCardState> {
  constructor(props: IModalCardProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.state = { modal: false };
  }

  public render() {
    return (
    <Container>
      <Container>{this.renderCard()}</Container>
      <Container>{this.renderModal()}</Container>
    </Container>);
  }

  private renderCard(): JSX.Element {
    return (
      <CollectionCard
        header={this.props.card.header}
        onClick={this.toggle}
        title={this.props.card.title}
        subtitle={this.props.card.subtitle}
        text={this.props.card.text}
        footer={this.props.card.footer}
      />
    );
  }

  private renderModal(): JSX.Element {
    return (
    <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
      <ModalHeader toggle={this.toggle}>{this.props.card.title}</ModalHeader>
      <ModalBody>{this.props.children}</ModalBody>
    </Modal>
    );
    // <ModalFooter>{this.props.footer}</ModalFooter>
  }

  private toggle() {
    this.setState({ modal: !this.state.modal });
  }
}
