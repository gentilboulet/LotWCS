import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import History from "../containers/Character/History";

class RouteHistory extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <History />
        </AppPage>
      </div>
    );
  }
}

export default RouteHistory;
