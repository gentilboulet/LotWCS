import * as React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

class AppHeader extends React.Component<{}> {
  public render() {
    return (
      <div className="header">
        <h1>Legends of the Wulin Character Sheet</h1>
        <nav className="link-list">
          <Link to="/">Homepage</Link>
          <Link to="/app">Character</Link>
          <Link to="/test">Test</Link>
          <Link to="/history">History</Link>
        </nav>
      </div>
    );
  }
}

export default AppHeader;
