import * as React from 'react';

import PlaceHolder from 'components/PlaceHolder';
import { Tab, Tabs } from 'components/Tabs';
import History from 'containers/Character/History';
// import CharacterLoresheets from 'containers/CharacterLoresheets';

import Skills from 'components/Character/Skills';

class Body extends React.Component<{}, {}> {
  public render() {
    return(
      <Tabs defaultTab="skills">
        <Tab title="Character Skills" tabId="skills">
          <Skills />
        </Tab>
        <Tab title="Kung Fu" tabId="kungfu">
          <PlaceHolder>Kung fu learnt by the character.
          </PlaceHolder>
        </Tab>
        <Tab title="Loresheets" tabId="loresheets">
          <div />
        </Tab>
        <Tab title="History" tabId="history">
          <History />
        </Tab>
      </Tabs>
    );
  }
}

export default Body;
