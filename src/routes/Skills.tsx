import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "components/AppIntro";
import AppPage from "components/AppPage";
import Skills from "components/Character/Skills";

class RouteSkills extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>Empty Intro</AppIntro>
        <AppPage>
          <Skills />
        </AppPage>
      </div>
    );
  }
}

export default RouteSkills;
