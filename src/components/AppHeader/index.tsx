import * as React from 'react';
import Icon from 'react-fa';
import { Link } from 'react-router-dom';

import './header.css';

class AppHeader extends React.Component<{}, {isOpen: boolean}> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
     <nav className="navbar">
       <ul className="left">
         <Link to="/"><li><h1>LotWCS</h1></li></Link>
         <Link to="/skills"><li>Skills</li></Link>
         <Link to="/chi"><li>Chi</li></Link>
         <Link to="/virtues"><li>Virtues</li></Link>
         <Link to="/equipment"><li>Equipment</li></Link>
         <Link to="/conditions"><li>Conditions</li></Link>
         <Link to="/kungfu"><li>{"Kung\u00A0Fu"}</li></Link>
         <Link to="/loresheets"><li>Loresheets</li></Link>
         <Link to="/history"><li>History</li></Link>
       </ul>
       <ul className="right">
        <Link to="/print"><li>Full sheet</li></Link>
        <Link to="/config"><li><Icon name="cog" /></li></Link>
      </ul>
     </nav>
    );
  }
}

export default AppHeader;
