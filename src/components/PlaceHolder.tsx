import * as React from 'react';
import { Card, CardBlock, CardSubtitle, CardText, CardTitle } from 'reactstrap';

class PlaceHolder extends React.Component<{}, {}> {
  public render() {
    return (
      <Card block={true} >
        <CardTitle>This is a placeholder </CardTitle>
        <CardSubtitle>The content will soon be added</CardSubtitle>
        <CardBlock>
          <CardText>{this.props.children}</CardText>
        </CardBlock>
      </Card>
    );
  }
}

export default PlaceHolder;
