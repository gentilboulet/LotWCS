import * as React from "react";

import "./page.css";

class AppPage extends React.PureComponent<{}, {}> {
  public render() {
    return <section className="app-page">{this.props.children}</section>;
  }
}

export default AppPage;
