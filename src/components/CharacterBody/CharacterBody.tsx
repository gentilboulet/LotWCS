import * as React from 'react';

import { Tabs, Tab } from '../../components/Tabs';
import PlaceHolder from '../../components/PlaceHolder';
import CharacterSkills from '../../containers/CharacterSkills';

export interface ICharacterBodyProps {}

class CharacterBody extends React.Component<ICharacterBodyProps, object> {
  render() {
    return(
      <Tabs defaultTab="skills">
        <Tab title="Character Skills" tabId="skills">
          <CharacterSkills />
        </Tab>
        <Tab title="Character Sheet" tabId="cssheet">
          <PlaceHolder>Character sheet contents. Will soon provide more stuff than this.
          </PlaceHolder>
        </Tab>
        <Tab title="Kung Fu" tabId="kungfu">
          <PlaceHolder>Kung fu learnt by the character.
          </PlaceHolder>
        </Tab>
        <Tab title="History" tabId="history">
          <PlaceHolder>History of purchases
          </PlaceHolder>
        </Tab>
      </Tabs>
    );
  }
}

export default CharacterBody;
