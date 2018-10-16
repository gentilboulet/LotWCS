import * as React from 'react';
import { Col, Row } from 'reactstrap';

import FieldHeader from './FieldHeader';

export interface IStaticTextProps {
  header: string;
  value: string;
}

const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
};

class StaticText extends React.PureComponent<IStaticTextProps, {}> {
  public render = (): JSX.Element => {
    return (
      <Row style={styles.row}>
        <Col xs="6">{this.renderHeader()}</Col>
        <Col>{this.props.value}</Col>
      </Row>
    );
  }

  private renderHeader = (): JSX.Element => {
    return <FieldHeader label={this.props.header} />;
  }
}

export default StaticText;
