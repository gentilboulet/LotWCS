import * as React from "react";

class Header extends React.PureComponent<{}, {}> {
  public render() {
    return <section className="header">{this.props.children}</section>;
  }
}

export default Header;
