import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import { Gear } from "../components/Character/Gear";

class RouteGear extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <Gear />
        </AppPage>
      </div>
    );
  }
}

export default RouteGear;
