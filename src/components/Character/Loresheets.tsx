import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Loresheet from 'containers/Character/Loresheet';
import { IDataLoresheet, loresheets, loresheetsCategories } from 'data/loresheets';

import CardDeck from 'components/CardDeck';
const styles = {
  row: {
    alignItems: 'center',
    height: 56,
  }
}

/* tslint:disable no-console */

class Loresheets extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <Container style={styles}>
      {this.renderCategories()} 
      </Container>
    );
  }

  private renderCategories() {
    return loresheetsCategories.map((cat: string) => {
      return (<Row key={cat}><Col>
        <CardDeck title={cat}>{this.renderLoresheets(cat)}</CardDeck>
        </Col></Row>
      ); });
  }

  private renderLoresheets(cat: string) {
	return loresheets.filter((ls: IDataLoresheet) => ls.category === cat)
			 .map((ls: IDataLoresheet) => <Loresheet key={ls.uid} uid={ls.uid} />)
  }
}

export default Loresheets;
