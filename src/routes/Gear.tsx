import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "../components/AppIntro";
import AppPage from "../components/AppPage";
import PlaceHodler from "../components/PlaceHolder";

class RouteGear extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <PlaceHodler>Soon to be Gear</PlaceHodler>
        </AppPage>
      </div>
    );
  }
}

export default RouteGear;
