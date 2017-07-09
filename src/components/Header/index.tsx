import * as React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './header.css';

class Header extends React.Component<{}> {
  render() {
    return (
      <div className="header">
        <h1>Legends of the Wulin Character Sheet</h1>
        <nav className="link-list">
          <Link to="/">Homepage</Link>
          <Link to="/test">Test</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
