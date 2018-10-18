import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "components/AppIntro";
import AppPage from "components/AppPage";
import LoresheetsList from "components/Character/LoresheetsList";

class RouteLoresheets extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <LoresheetsList />
        </AppPage>
      </div>
    );
  }
}

export default RouteLoresheets;
