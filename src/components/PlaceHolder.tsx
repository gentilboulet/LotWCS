import * as React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

class PlaceHolder extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Card>
        <CardTitle>This is a placeholder </CardTitle>
        <CardSubtitle>The content will soon be added</CardSubtitle>
        <CardBody>
          <CardText>{this.props.children}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default PlaceHolder;
