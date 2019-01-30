import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import ChiList from "../components/Character/ChiList";

class RouteChi extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Please select your Chi values</AppIntro>
        <AppPage>
          <ChiList />
        </AppPage>
      </div>
    );
  }
}

export default RouteChi;
