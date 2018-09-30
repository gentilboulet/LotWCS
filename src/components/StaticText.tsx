import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import FieldHeader from './FieldHeader';

export interface IStaticTextProps {
  header: string;
  value: string;
}

class StaticText extends React.PureComponent<IStaticTextProps, {}> {
  public render = (): JSX.Element => {
    return (
      <Container >
        <Row>
          <Col xs="6">{this.renderHeader()}</Col>
          <Col>{this.props.value}</Col>
        </Row>
      </Container>
    );
  }

  private renderHeader = (): JSX.Element => {
    return <FieldHeader label={this.props.header} />;
  }
}

export default StaticText;
