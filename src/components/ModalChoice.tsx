import * as React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export interface IModalChoiceProps {
  title: string | JSX.Element;
}

interface IModalChoiceState {
  modal: boolean;
}

export default class ModalChoice extends React.Component<IModalChoiceProps, IModalChoiceState> {
  constructor(props: IModalChoiceProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { modal: false };
  }

  public render(): JSX.Element {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
      <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
      <ModalBody>
        {this.props.children}
      </ModalBody>
      <ModalFooter />
    </Modal>
    );
  }

  private toggle() {
    this.setState({ modal: !this.state.modal });
  }
}
