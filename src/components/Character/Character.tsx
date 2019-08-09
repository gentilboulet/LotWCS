import * as React from "react";

import Header from "../../components/Character/Header";

import "./Character.css";

class Character extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="Character">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Character;
