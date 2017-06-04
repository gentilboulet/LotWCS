import * as React from 'react';

import { Tabs, Tab } from '../components/Tabs/Tabs';
import PlaceHolder from '../components/PlaceHolder/PlaceHolder';

export interface Props {}

class CharacterBody extends React.Component<Props, object> {
  render() {
    return(
      <Tabs defaultTab="kungfu">
        <Tab title="Character Sheet" tabId="csheet">
          <PlaceHolder>Character sheet contents. Will soon provide more stuff than this.
          </PlaceHolder>
        </Tab>
        <Tab title="Kung Fu" tabId="kungfu">
          <PlaceHolder>Kung fu learnt by the character.
          </PlaceHolder>
        </Tab>
      </Tabs>
    );
  }
}

export default CharacterBody;
