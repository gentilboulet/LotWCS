import * as React from 'react';
import { Card, CardText, CardBlock, CardTitle, CardSubtitle } from 'reactstrap';

export interface Props {}

class PlaceHolder extends React.Component<Props, object> {
  render() {
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
