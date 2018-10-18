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
     <ul>
       <li><Link to="/">LotWCS</Link></li>
       <li><Link to="/skills">Skills</Link></li>
       <li><Link to="/chi">Chi</Link></li>
       <li><Link to="/virtues">Virtues</Link></li>
       <li><Link to="/equipment">Equipment</Link></li>
       <li><Link to="/conditions">Conditions</Link></li>
       <li><Link to="/kungfu" >{"Kung\u00A0Fu"}</Link></li>
       <li><Link to="/loresheets">Loresheets</Link></li>
       <li><Link to="/history">History</Link></li>
       <li><Link to="/print">Full sheet</Link></li>
       <li><Link to="/config"><button className="seconday"><Icon name="cog" /></button></Link></li>
      </ul>
    );
  }
}

export default AppHeader;
