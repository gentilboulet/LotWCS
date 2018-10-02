import * as React from 'react';
import Icon from 'react-fa';
import { Button, Card, CardBody, CardColumns, CardTitle,
	 Col, Collapse, Container, Row } from 'reactstrap';

export interface IDeckProps {
  title: string;
}

interface IDeckState {
  toggle: boolean;
}

class Deck extends React.Component<IDeckProps, IDeckState> {
  constructor(props: IDeckProps) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.renderButton = this.renderButton.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.state = { toggle: true };
  }

  public render(): JSX.Element {
    return (
      <Container>
        <Card>
          {this.renderHeader()}
          <Collapse isOpen={this.state.toggle} color="info">
            <CardBody>
              <CardColumns>
                {this.props.children}
              </CardColumns>
            </CardBody>
          </Collapse>
        </Card>
      </Container>
    );
  }

  private renderHeader(): JSX.Element {
    return (
      <CardBody>
        <CardTitle>
	  <Container>
          <Row>
            <Col>{this.props.title}</Col>
            <Col xs={1} sm={1} md={1} lg={1} xl={1} >{this.renderButton()}</Col>
          </Row>
	</Container>
        </CardTitle>
      </CardBody>
    );
  }

  private renderButton(): JSX.Element {
    if (this.state.toggle) {
      return <Button onClick={this.toggle}  color="danger"><Icon name="arrow-up" /></Button>;
    } else {
      return <Button onClick={this.toggle}  color="info"><Icon name="arrow-down" /></Button>;
    }
  }

  private toggle(): void {
    this.setState({ toggle: !this.state.toggle });
  }
}

export default Deck;
