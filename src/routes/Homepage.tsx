import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AppHeader from 'components/AppHeader';
import CardDeck from 'components/CardDeck';
import ModalCard from 'components/ModalCard';

import { Col, Container, Row } from 'reactstrap';

class Homepage extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppHeader />
          <Container>
            <Row>
              <Col><CardDeck title="My first card deck">
	      {
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v: number) => {
	          return (<ModalCard key={v}
        	    card={
                    {
		      footer: 'Footing',
		      header: 'Heading',
		      subtitle: 'Subtitling !',
                      text: 'Ooooooh, I\'m text',
		      title: 'This is a really nice placeholder '+v
                    }
                  }
                  ><Container>Modal Childs</Container></ModalCard>);
		})
	      }
	      <ModalCard 
		card={{title: 'Parent card', text: 'Oh stuff'}}
		>
		<ModalCard
		  card={{title: 'Child card', text: 'Oh stuff'}}
		  ><Container>Modal subchilds</Container></ModalCard>
		</ModalCard>
              </CardDeck></Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default Homepage;
