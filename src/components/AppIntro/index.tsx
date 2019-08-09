import * as React from "react";

import "./intro.css";

class AppIntro extends React.PureComponent<{}, {}> {
  public render() {
    return <section className="app-intro">{this.props.children}</section>;
  }
}

export default AppIntro;
