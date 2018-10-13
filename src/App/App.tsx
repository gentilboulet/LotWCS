import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import AppHeader from 'components/AppHeader';

/* Pages */
/* tslint:disable ordered-imports */
import Homepage from 'routes/Homepage';

import Skills from 'routes/Skills';
import Virtues from 'routes/Virtues';
import Chi from 'routes/Chi';
import Equipment from 'routes/Equipment';
import Conditions from 'routes/Conditions';
import KungFu from 'routes/KungFu';
import Loresheets from 'routes/Loresheets';

import History from 'routes/History';

class App extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <BrowserRouter>
          <Container fluid={true}>
          <AppHeader />
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/skills" component={Skills} />
          <Route exact={true} path="/chi" component={Chi} />
          <Route exact={true} path="/virtues" component={Virtues} />
          <Route exact={true} path="/equipment" component={Equipment} />
          <Route exact={true} path="/conditions" component={Conditions} />
          <Route exact={true} path="/kungfu" component={KungFu} />
          <Route exact={true} path="/loresheets" component={Loresheets} />
          <Route exact={true} path="/history" component={History} />
          </Container>
      </BrowserRouter>
    );
  }
}

export default App;
