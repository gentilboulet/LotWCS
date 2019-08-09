import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import Virtues from "../containers/Character/Virtues";

class RouteVirtues extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <Virtues />
        </AppPage>
      </div>
    );
  }
}

export default RouteVirtues;
