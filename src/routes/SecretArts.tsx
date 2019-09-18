import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import LoresheetsList from "../components/Character/LoresheetsList";
import { isSecretArts } from "../data/loresheets";

class RouteLoresheets extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <LoresheetsList loresheetFilter={isSecretArts} />
        </AppPage>
      </div>
    );
  }
}

export default RouteLoresheets;
