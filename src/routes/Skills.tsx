import * as React from "react";
import { RouteComponentProps } from "react-router";

import AppIntro from "components/AppIntro";
import AppPage from "components/AppPage";
import Skills from "components/Character/Skills";

import { Input } from "reactstrap";

class RouteSkills extends React.PureComponent<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <AppIntro>
          <Input placeholder="blabla" />
        </AppIntro>
        <AppPage>
          <Skills />
        </AppPage>
      </div>
    );
  }
}

export default RouteSkills;
