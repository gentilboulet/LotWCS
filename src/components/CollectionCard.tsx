import * as React from 'react';

import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'reactstrap';

export interface ICollectionCardProps {
  title?: string  | JSX.Element;
  subtitle?: string;
  text: string ;
  footer?: string  | JSX.Element;
  header?: string  | JSX.Element;
  onClick?: () => void;
}

export default class CollectionCard extends React.Component<ICollectionCardProps, {} > {
  constructor(props: ICollectionCardProps) {
    super(props);
    this.renderCardBody = this.renderCardBody.bind(this);
    this.renderCardHeader = this.renderCardHeader.bind(this);
    this.renderCardTitle = this.renderCardTitle.bind(this);
    this.renderCardSubtitle = this.renderCardSubtitle.bind(this);
    this.renderCardText = this.renderCardText.bind(this);
    this.renderCardFooter = this.renderCardFooter.bind(this);
  }

  public render() {
    return (
      <Card>
        {this.renderCardBody()}
      </Card>
    );
  }

  private renderCardBody(): JSX.Element {
    return (
      <div>
      {this.renderCardHeader()}
      <CardBody role="button" onClick={this.props.onClick}>
        {this.renderCardTitle()}
        {this.renderCardSubtitle()}
        {this.renderCardText()}
      </CardBody>
      {this.renderCardFooter()}
      </div>
    );
  }

  private renderCardHeader(): JSX.Element | void {
    if (this.props.header) { return <CardHeader>{this.props.header}</CardHeader>;}
  }

  private renderCardTitle(): JSX.Element | void {
    if(this.props.title) { return <CardTitle>{this.props.title}</CardTitle>; }
  }

  private renderCardSubtitle(): JSX.Element | void{
    if (this.props.subtitle) { return <CardSubtitle>{this.props.subtitle}</CardSubtitle>; }
  }

  private renderCardText(): JSX.Element {
    return <CardText>{this.props.text}</CardText>;
  }

  private renderCardFooter(): JSX.Element {
    if (this.props.footer) {
      return <CardFooter>{this.props.footer}</CardFooter>;
    }
    return <div />;
  }
}
