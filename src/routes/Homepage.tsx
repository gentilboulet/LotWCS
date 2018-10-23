import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "components/AppIntro";
import AppPage from "components/AppPage";

import Archetype from "containers/Character/Archetype";
import Concept from "containers/Character/Concept";
import Destiny from "containers/Character/Destiny";
import Entanglement from "containers/Character/Entanglement";
import Name from "containers/Character/Name";
import Rank from "containers/Character/Rank";

class Homepage extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <Name />
          <Concept />
          <Archetype />
          <Rank />
          <Destiny />
          <Entanglement />
        </AppPage>
      </div>
    );
  }
}

export default Homepage;
